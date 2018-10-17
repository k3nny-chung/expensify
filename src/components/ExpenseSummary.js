import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeraljs';
import {Link} from 'react-router-dom';
import getFilteredExpenses from '../selectors/expenses';
import getExpenseTotal from '../selectors/expenses-total';

const ExpenseSummary = ({expenses}) => { 
    const numExpenses = expenses.length;
    const total = getExpenseTotal(expenses);
    return (
    <div className="page-header">
        <div className="content-container">
            {numExpenses > 0 && 
            (<h1 className="page-header__title">
                Viewing <span>{numExpenses}</span> expense{numExpenses > 1 ? 's' : ''} totaling <span>{numeral(total/100).format('$0,0.00')}</span>
            </h1>)}
            <div className="page-header__actions">
                <Link className="button" to="/create">Add Expense</Link>
            </div>
        </div>
    </div>
    );
}

const mapStateToProps = (state) => ({
    expenses: state.expenses.items //getFilteredExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpenseSummary);


