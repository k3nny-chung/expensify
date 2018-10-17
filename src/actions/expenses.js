import uuid from 'uuid';
import database from '../firebase/firebase'
// Action generators
// Component calls action generator
// Action generator returns object
// Component dispatches object
// redux store changes
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});


export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const { description = '', note = '', amount = 0, createdAt = 0 } = expenseData;
        const expense = { description, note, amount, createdAt };
        return database.ref(`users/${uid}/expenses`).push(expense)
        .then( (ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    }
}

export const removeExpense = ({ id }) => ({
    type: 'REMOVE_EXPENSE',
    expense: { id }
});

export const startRemoveExpense = (({ id }) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).remove().then( () => {
            dispatch(removeExpense({ id }));
        });
    }
});

export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).set({
            ...updates
        }).then(() => {
            dispatch(editExpense(id, updates));
        });
    }
}

export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses`).once('value').then( (snapshot) => {
            const expenses = [];
            snapshot.forEach(childSnapshot => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            
            dispatch(setExpenses(expenses));
        });
    }   
};

export const fetchExpensesStart = () => ({
    type: 'FETCH_EXPENSES_START'
});

export const fetchExpensesDone = (expenses, count) => ({
    type: 'FETCH_EXPENSES_DONE',
    expenses,
    count
});

export const fetchExpensesError = (error) => ({
    type: 'FETCH_EXPENSES_ERROR',
    error
});


// Fetches the first number of requested items starting at but not including @startExpense
// and ending at but not including @endExpense. If both @startExpense and @end are given, @numItems
// is ignored.
export const fetchExpenses = (numItems, startExpense = null, endExpense = null) => {
    return (dispatch, getState) => {
        
        dispatch(fetchExpensesStart());
        
        const uid = getState().auth.uid;
        let databaseRef =  database.ref(`users/${uid}/expenses`);
        //const { text, sortBy, startDate, endDate } = getState().filters;
        let sortBy = 'date';
        switch (sortBy) {
            case 'date':
                databaseRef = databaseRef.orderByChild('createdAt');
                break;
            case 'amount':
                databaseRef = databaseRef.orderByChild('amount');
                break;
            default:
                databaseRef = databaseRef.orderByKey();
                break;
        } 

        const startKey = startExpense ? startExpense.id : null;
        const endKey = endExpense ? endExpense.id : null;

        if (startKey) {
            if (sortBy === 'date') {
                databaseRef = databaseRef.startAt(startExpense.createdAt, startKey);  
            }else {
                databaseRef = databaseRef.startAt(startKey);            
            }
        }

        if (endKey) {
            if (sortBy === 'date') {
                databaseRef = databaseRef.endAt(endExpense.createdAt, endKey);
            }else {
                databaseRef = databaseRef.endAt(endKey);
            }
        }

        if (!startKey && !endKey) {
            databaseRef = databaseRef.limitToFirst(numItems);
        }else if (startKey && !endKey) {
            databaseRef = databaseRef.limitToFirst(numItems + 1);
        }else if (!startKey && endKey) {
            databaseRef = databaseRef.limitToLast(numItems + 1);
        }           
        
        const expensesPromise = databaseRef.once('value');
        const countPromise = database.ref(`users/${uid}/expensesCount`).once('value');
        
        return Promise.all([expensesPromise, countPromise])
        .then(snapshots => {
            const expensesSnapshot = snapshots[0];
            const countSnapshot = snapshots[1];

            const expenses = [];
            expensesSnapshot.forEach(childSnapshot => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            
            // remove the item with startKey
            if (startKey) {
                expenses.splice(0, 1);
            }

            // remove the item with endKey
            if (endKey) {
                expenses.splice(expenses.length - 1);
            }

            const count = countSnapshot.val() || 0;           
            dispatch(fetchExpensesDone(expenses, count));
        })
        .catch(error => { 
            console.error(error);
            dispatch(fetchExpensesError(error));
        });
    }
}
