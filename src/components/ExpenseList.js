import React from 'react';
import {connect} from 'react-redux';
import ExpenseItem from './ExpenseItem';
import filteredExpenses from '../selectors/expenses';

export const ExpenseList = ({expenses}) => (
    <div>
        <h1>Expenses</h1>
        {
            expenses.length == 0 ? 
            ( <p>No expenses</p> ) :
            expenses.map((item, index) => (
                <ExpenseItem key={item.id} 
                             {...item} 
                 />
            ))
        }
    </div>
);

const mapStateToProps = (state) => ({ 
    expenses: filteredExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpenseList);



