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


export const fetchNextExpenses = (numItems, startExpense = null, sortBy = '', sortDirection = 'asc') => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        let databaseRef = getExpensesDatabaseRef(uid, sortBy);
        const key = startExpense ? startExpense.id : null;

        if (key) {
            if (sortBy === 'date' && sortDirection === 'asc') {
                databaseRef = databaseRef.startAt(startExpense.createdAt, key);  
            }else if (sortBy === 'date' && sortDirection === 'desc') {
                databaseRef = databaseRef.endAt(startExpense.createdAt, key);    
            }else if (sortDirection === 'asc') {
                databaseRef = databaseRef.startAt(key);     
            }else if (sortDirection === 'desc') {
                databaseRef = databaseRef.endAt(key); 
            }
        }

        if (sortDirection === 'asc') {
            databaseRef = databaseRef.limitToFirst(key ? numItems + 1 : numItems);
        }else {
            databaseRef = databaseRef.limitToLast(key ? numItems + 1 : numItems);
        }

        return fetch(dispatch, uid, databaseRef, sortDirection, key);
    }
}

export const fetchPreviousExpenses = (numItems, endExpense, sortBy = '', sortDirection = 'asc') => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        let databaseRef = getExpensesDatabaseRef(uid, sortBy);
        const key = endExpense.id; 

        if (key) {
            if (sortBy === 'date' && sortDirection === 'asc') {
                databaseRef = databaseRef.endAt(endExpense.createdAt, key);  
            }else if (sortBy === 'date' && sortDirection === 'desc') {
                databaseRef = databaseRef.startAt(endExpense.createdAt, key);    
            }else if (sortDirection === 'asc') {
                databaseRef = databaseRef.endAt(key);     
            }else if (sortDirection === 'desc') {
                databaseRef = databaseRef.startAt(key); 
            }
        }

        if (sortDirection === 'asc') {
            databaseRef = databaseRef.limitToLast(numItems + 1);
        }else {
            databaseRef = databaseRef.limitToFirst(numItems + 1);
        }

        return fetch(dispatch, uid, databaseRef, sortDirection, key);
    }
}

const getExpensesDatabaseRef = (uid, sortBy) => {
    
    let databaseRef = database.ref(`users/${uid}/expenses`);

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
    
    return databaseRef;
}

const fetch = (dispatch, uid, databaseRef, sortDirection, excludeExpenseID = '') => {
   
    dispatch(fetchExpensesStart());

    const expensesPromise = databaseRef.once('value');
    const countPromise = database.ref(`users/${uid}/expensesCount`).once('value');
    
    return Promise.all([expensesPromise, countPromise])
    .then(snapshots => {

        const expensesSnapshot = snapshots[0];
        const countSnapshot = snapshots[1];

        let expenses = [];
        expensesSnapshot.forEach(childSnapshot => {
            expenses.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });       
        
        const count = countSnapshot.val() || 0;           
        
        if (sortDirection === 'desc') {
            expenses.reverse();
        }

        const items = !!excludeExpenseID ? expenses.filter(e => e.id !== excludeExpenseID) : expenses;        
        dispatch(fetchExpensesDone(items, count));
    })
    .catch(error => { 
        console.error(error);
        dispatch(fetchExpensesError(error));
    });
}


