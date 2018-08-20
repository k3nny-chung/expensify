import React from 'react';
import {connect} from 'react-redux';
import ExpenseItem from './ExpenseItem';
import filteredExpenses from '../selectors/expenses';

export const ExpenseList = ({expenses}) => (
    <div className="content-container">
       <div className="list-header">
           <div className="show-for-mobile"><h3>Expenses</h3></div>
           <div className="show-for-desktop"><h3>Expense</h3></div>
           <div className="show-for-desktop"><h3>Amount</h3></div>
       </div>
       <div className="list-body">
        {
            expenses.length == 0 ? 
            ( <div className="list-item list_item--message">
                <span>No expenses</span>
              </div> ) :
            expenses.map((item, index) => (
                <ExpenseItem key={item.id} 
                             {...item} 
                 />
            ))
        }
        </div>
    </div>
);

const mapStateToProps = (state) => ({ 
    expenses: filteredExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpenseList);



