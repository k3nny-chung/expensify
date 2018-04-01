import React from 'react';
import {shallow} from 'enzyme';
import testExpenses from '../fixtures/expenses';
import {EditExpensePage} from '../../components/EditExpensePage';

let edit, remove, history, wrapper, testExpense;

beforeEach(() => {
    edit = jest.fn();
    remove = jest.fn();
    history = { push: jest.fn() };
    testExpense = testExpenses[0];
    wrapper = shallow(<EditExpensePage expense={testExpense} 
                                       edit={edit} 
                                       remove={remove}
                                       history={history} />);

});

test('should render EditExpensePage', () => { 
    expect(wrapper).toMatchSnapshot();
});

test('should handle edit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(testExpense);
    expect(edit).toHaveBeenLastCalledWith(testExpense);
    expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle remove', () => {
    wrapper.find('button').prop('onClick')();
    expect(remove).toHaveBeenCalled();
    expect(history.push).toHaveBeenLastCalledWith('/');
});

