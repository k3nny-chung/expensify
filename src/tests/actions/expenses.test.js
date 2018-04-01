import {addExpense} from '../../actions/expenses';

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
            ...data,
            id: expect.any(String)
        }        
    });

});

test('shouold setup add expense object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            amount: 0,
            createdAt: 0,
            note: ''
        }
    });
});