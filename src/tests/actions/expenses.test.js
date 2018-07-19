import {addExpense, startAddExpense} from '../../actions/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import testExpenses from '../fixtures/expenses';
import { start } from 'repl';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

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