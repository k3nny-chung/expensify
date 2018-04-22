export default (expenses) => {
    if (expenses.length === 0){
        return 0;
    }
    else {
        const amounts = expenses.map(expense => expense.amount); 
        return amounts.reduce((agg, curr) => agg + curr, 0);
 
    }
}