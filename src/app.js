import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {addExpense, removeExpense, editExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getFilteredExpenses from './selectors/expenses';
import './firebase/firebase';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();
// store.dispatch(addExpense({
//     description:'Water bill',
//     amount: 190.25,
//     createdAt: 50000
// }));

// store.dispatch(addExpense( {
//     description: 'Gas bill',
//     amount: 601.00,
//     createdAt: 1800
// }));

// store.dispatch(addExpense( {
//     description: 'Rent',
//     amount: 500.00,
//     createdAt: 40000
// }));


const state = store.getState();
const expenses = getFilteredExpenses(state.expenses, state.filters);
console.log(expenses);

store.subscribe( () => {
    console.log(state);
})


const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
