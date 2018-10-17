const initialState = {
    loading: false,
    items: [],
    count: 0,
    error: null
};

const expenseReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE': 
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter( expense => expense.id !== action.expense.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if (expense.id == action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                }
                else {
                    return expense;
                }
            });
        case 'SET_EXPENSES':
            return action.expenses;
        case 'FETCH_EXPENSES_START':
            return {
                loading: true,
                items: [],
                error: null
            };
        case 'FETCH_EXPENSES_DONE':
            return {
                loading: false,
                items: action.expenses,
                count: action.count,
                error: null
            };
        case 'FETCH_EXPENSES_ERROR':
            return {
                loading: false,
                items: [],
                error: action.error
            };
        default:
            return state;
    }
};

export default expenseReducer;