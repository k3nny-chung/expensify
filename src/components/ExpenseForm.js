import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';

export default class ExpenseForm extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {            
            description: props.expense? props.expense.description : '',
            amount: props.expense? (props.expense.amount/100).toString() : '',
            note: props.expense? props.expense.note : '',
            createdAt: props.expense? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: ''   
        };
    }
    

    descriptionOnChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };

    amountOnChange = (e) => {
        const amount = e.target.value;
        if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(() => ({ amount }));
        }
    };

    noteOnChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };

    onDateChange = (createdAt) => {
        //if (createdAt) {
            this.setState(() => ({ createdAt }));    
        //}
    };

    onFocusChange = ({focused}) => {
        this.setState(() => ({ calendarFocused: focused }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        let error = '';
        if (!this.state.description || !this.state.amount) {
            error = 'Please enter description and amount';
        }
        else if (!this.state.createdAt) {
            error = 'Please select a date';
        }
        this.setState(() => ({ error }));
        
        if (!error) {
            this.props.onSubmit({               
                description: this.state.description,
                amount: parseFloat(this.state.amount) * 100,
                note: this.state.note,
                createdAt: this.state.createdAt.valueOf()
            });
            
        }
    };

    render() {  
        return (              
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input className="text-input" type="text" placeholder="Description" autoFocus
                    value={this.state.description} onChange={this.descriptionOnChange} />
                <input className="text-input" type="text" placeholder="Amount" value={this.state.amount} onChange={this.amountOnChange} />
                <SingleDatePicker date={this.state.createdAt} onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused} onFocusChange={this.onFocusChange}
                    isOutsideRange={() => false} numberOfMonths={1} showClearDate={true} />
                <textarea className="text-area" placeholder="Enter a note for this expense" value={this.state.note} onChange={this.noteOnChange} />
                <div>
                    <button className="button" type="submit">Add Expense</button>
                </div>
            </form>
            
        )
    }
}