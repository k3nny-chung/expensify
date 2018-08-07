import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {startEditExpense, startRemoveExpense} from '../actions/expenses';

export class EditExpensePage extends React.Component {
    
    expenseFormSubmit = (updates) => { 
        this.props.edit(updates);
        this.props.history.push('/');  
    };

    removeOnClick = () => { 
        this.props.remove(this.props.expense)
        this.props.history.push('/'); 
    };
    
    render() {
        return  (
            <div>
                <ExpenseForm expense={this.props.expense}
                             onSubmit={this.expenseFormSubmit} />
                  <button onClick={this.removeOnClick} >Remove</button>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find(expense => expense.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    edit: (updates) => dispatch(startEditExpense(props.match.params.id, updates)),
    remove: (expense) => dispatch(startRemoveExpense({id: expense.id}))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);