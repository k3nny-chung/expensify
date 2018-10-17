import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter, {history} from './routers/AppRouter';
import configureStore from './store/configureStore';
import {addExpense, removeExpense, editExpense, startSetExpenses, fetchExpenses} from './actions/expenses';
import {login, logout}  from './actions/auth';
import getFilteredExpenses from './selectors/expenses';
import {firebase} from './firebase/firebase';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/LoadingPage';

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


//const state = store.getState();
//const expenses = getFilteredExpenses(state.expenses, state.filters);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app')); 
        hasRendered = true;
    }
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //logged in
        store.dispatch(login(user.uid));
        renderApp();    
        if (history.location.pathname === '/') {
            history.push('/dashboard');
        }
        // store.dispatch(fetchExpenses(3)).then(() => {
        //     renderApp();    
        //     if (history.location.pathname === '/') {
        //         history.push('/dashboard');
        //     }
        // });

        console.log('logged in');
        
    }else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
        console.log('logged out');
    }
})

