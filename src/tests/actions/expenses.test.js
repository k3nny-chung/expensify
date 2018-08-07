import {addExpense, startAddExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense} from '../../actions/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import testExpenses from '../fixtures/expenses';
import { start } from 'repl';
import database from '../../firebase/firebase';
import moment from 'moment';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expenseData = {};
    
    testExpenses.forEach(({ id, description, note, amount, createdAt }) => {
        expenseData[id] = { id, description, note, amount, createdAt };
    });

    database.ref('expenses').set(expenseData).then(() => done());
})    


test('should setup add expense object with provided values', () => {
    const data = {
        description: 'Rent',
        amount: 40500,
        createdAt: 532123,
        note: 'test'
    };

    const action = addExpense(data);
    expect(action).toEqual({        
        type: 'ADD_EXPENSE',
        expense: {
            ...data            
        }        
    });

});

// test('shouold setup add expense object with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             amount: 0,
//             createdAt: 0,
//             note: ''
//         }
//     });
// });


test ('should add expense to database and store with provided values', (done) => {
    const store = createMockStore({});
    const expense = {
        description: 'A test expense',
        amount: 3000,
        note: 'whatever',
        createdAt: 1234567
    }

    store.dispatch(startAddExpense(expense)).then( () => {
        const actions = store.getActions();
        expect(actions[0].expense).toEqual( {
            id: expect.any(String),
            ...expense
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');        
    })
    .then((snapshot) => {
        expect(snapshot.val()).toEqual(expense);
        done();
    });    

});

test ('should add expense to database and store with default values', () => {
    const store = createMockStore({});
    const expenseDefault = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }

    store.dispatch(startAddExpense(expenseDefault)).then( () => {
        const actions = store.getActions();
        expect(actions[0].expense).toEqual( {
            id: expect.any(String),
            ...expenseDefault
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');        
    })
    .then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefault);
        done();
    });    
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then( () => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses: testExpenses
        });

        done();
    });
});

test('should remove expense from firebase', (done) => {
    const store = createMockStore({});
    const expenseToRemove = testExpenses[2];

    store.dispatch(startRemoveExpense(expenseToRemove)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            expense: { id: expenseToRemove.id }
        });

        return database.ref(`expenses/${expenseToRemove.id}`).once('value');
    })
    .then((snapshot) => {
        expect(snapshot.val()).toBe(null);
        done();
    });

});

test('should update expense in firebase', (done) => {
    const store = createMockStore({});
    const updatedID = testExpenses[0].id;
    const updates = {
        description: 'Office equipment',
        note: 'testing update',
        amount: 50000
    }

    store.dispatch(startEditExpense(updatedID, updates)).then(() => {
        return database.ref(`expenses/${updatedID}`).once('value');
    })
    .then(snapshot => {
        expect(snapshot.val().amount).toBe(updates.amount);
        expect(snapshot.val().note).toBe(updates.note);
        done();
    });
});