import getFilteredExpenses from '../../selectors/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';


test('should filter by text', () => {
    const filter = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };

    const result = getFilteredExpenses(expenses, filter);
    expect(result).toEqual([expenses[2], expenses[0]]);
});

test('should filter by start date', () => {
    const filter = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    };

    const result = getFilteredExpenses(expenses, filter);
    expect(result).toEqual([expenses[2], expenses[0]]);
});


test('should filter by end date', () => {
    const filter = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).add(2, 'days')
    };

    const result = getFilteredExpenses(expenses, filter);
    expect(result).toEqual([expenses[0], expenses[1]]);
})