import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilter from './ExpenseListFilter';
import ExpenseSummary from './ExpenseSummary';

const ExpenseDashboardPage = () => (
    <div>
        <h1>Dashboard</h1>
        <ExpenseListFilter />
        <ExpenseSummary />
        <ExpenseList />
    </div>
);

export default ExpenseDashboardPage;
