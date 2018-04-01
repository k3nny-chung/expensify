import expenseReducer from '../../reducers/expenses';
import testExpenses from '../fixtures/expenses';

test('should set default set', () => {
    const state = expenseReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});


test('should remove expense by id', () => {
    const state = expenseReducer(testExpenses, {
        type: 'REMOVE_EXPENSE',
        expense: {
            id: testExpenses[0].id
        }
    });

    expect(state).toEqual([testExpenses[1], testExpenses[2]]);
});


test('should not remove if id not found', () => {
    const state = expenseReducer(testExpenses, {
        type: 'REMOVE_EXPENSE',
        expense: {
            id: 100
        }
    });

    expect(state).toEqual(testExpenses);
});


test('should add an expense', () => {
    const newExpense = {
        id: 10,
        description: 'Insurance',
        note: '',
        amount: 40000,
        createdAt: 500000
    };

    const state = expenseReducer(testExpenses, {
        type: 'ADD_EXPENSE',
        expense: newExpense
    });

    expect(state).toEqual([...testExpenses, newExpense]);
});

test('should edit existing expense', () => {
    const updates = {        
        amount: 3500
    };

    const state = expenseReducer(testExpenses, {
        type: 'EDIT_EXPENSE',
        id: testExpenses[0].id,
        updates
    });

    const updatedExpense = state.find(expense => expense.id === testExpenses[0].id);
    expect(updatedExpense.amount).toBe(3500);
});

test('should not edit if id not found', () => {
    const updates = {        
        amount: 3500
    };

    const state = expenseReducer(testExpenses, {
        type: 'EDIT_EXPENSE',
        id: -1,
        updates
    });

    expect(state).toEqual(testExpenses);
});
