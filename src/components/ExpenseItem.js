import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeraljs';

const ExpenseItem = (props) => (
    <div>
        <p>
           Expense: <Link to={`/edit/${props.id}`}>{props.description}</Link><br/>
           Amount: {numeral(props.amount/100).format('$0,0.00')}<br/>
           Date: {moment(props.createdAt).format('MMMM Do, YYYY')}<br/>         
        </p>
    </div>
)


export default ExpenseItem;
