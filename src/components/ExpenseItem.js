import React from 'react';
import {Link} from 'react-router-dom';

const ExpenseItem = (props) => (
    <div>
        <p>
           Expense: <Link to={`/edit/${props.id}`}>{props.description}</Link><br/>
           Amount: {props.amount}<br/>
           Date: {props.createdAt}<br/>         
        </p>
    </div>
)


export default ExpenseItem;
