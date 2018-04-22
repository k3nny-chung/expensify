import selectExpensesTotal from '../../selectors/expenses-total';
import testExpenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
    const result = selectExpensesTotal([]);
    expect(result).toBe(0);
});

test('should add single expense', () => {
    const result = selectExpensesTotal([testExpenses[0]]);
    expect(result).toBe(testExpenses[0].amount);
});

test('should add up multiple expenses', () => {
    const result = selectExpensesTotal(testExpenses);
    expect(result).toBe(testExpenses[0].amount + testExpenses[1].amount + testExpenses[2].amount);
});