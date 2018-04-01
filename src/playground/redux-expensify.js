import { createStore, combineReducers} from 'redux';
import uuid from 'uuid';

// Action generators
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

const removeExpense = ({ id }) => ({
    type: 'REMOVE_EXPENSE',
    expense: { id }
});

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT',
    text
});

const sortByDate = () => ({
    type: "SORT_BY_DATE"
});

const sortByAmount = () => ({
    type: "SORT_BY_AMOUNT"
});

const setStartDate = (date) => ({
    type: 'SET_START_DATE',
    date
});

const setEndDate = (date) => ({
    type: 'SET_END_DATE',
    date
});


// Reducers
const expenseReducerDefault = [];
const filterReducerDefault = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const expenseReducer = (state = expenseReducerDefault, action) => {
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
        default:
            return state;
    }
}

const filterReducer = (state = filterReducerDefault, action) => {
    switch (action.type) {
        case 'SET_TEXT':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date
            } 
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date
            }
        default:
            return state;
    }
} 

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof(startDate) !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof(endDate) !== 'number' || expense.createdAt <= endDate;
        const textMatch = text.length === 0 || expense.description.toUpperCase().includes(text.toUpperCase()) || 
                         expense.note.toUpperCase().includes(text.toUpperCase());

        return startDateMatch && endDateMatch && textMatch;
    })
    .sort( (a, b) => {
        if (sortBy === 'date'){
            return a.createdAt < b.createdAt ? -1 : 1;
        }else if (sortBy === 'amount') {
            return a.amount < b.amount ? -1 : 1;
        }else {
            return 0;
        }
    });
};

// Store creation
const store = createStore( combineReducers( {
    expenses: expenseReducer,
    filters: filterReducer
}));

store.subscribe( () => {
    const state = store.getState();
    const filteredExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(filteredExpenses);
});

const expenseOne = store.dispatch( addExpense( { description: 'Rent', amount: 1000 }));
const expense2 = store.dispatch( addExpense( { description: 'Coffee', amount: 200 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expense2.expense.id, { amount: 500, description: 'Coffee updated' }));
store.dispatch(setTextFilter('Rent'));
// store.dispatch(sortByDate());
//store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

const demoState = {
    expenses: [{
        id: 'djlakwq',
        description: 'Januaray rent',
        note: 'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
};