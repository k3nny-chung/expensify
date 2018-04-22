import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeraljs';
import getFilteredExpenses from '../selectors/expenses';
import getExpenseTotal from '../selectors/expenses-total';

const ExpenseSummary = ({expenses}) => { 
    const numExpenses = expenses.length;
    const total = getExpenseTotal(expenses);
    return (
    <div>
        {numExpenses > 0 && 
        (<p>
            You are viewing {numExpenses} expense{numExpenses > 1 ? 's' : ''} totaling {numeral(total/100).format('$0,0.00')}
        </p>)}
    </div>
    );
}

const mapStateToProps = (state) => ({
    expenses: getFilteredExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpenseSummary);


