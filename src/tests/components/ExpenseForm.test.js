import React from 'react';
import {shallow} from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import testExpenses from '../fixtures/expenses';
import moment from 'moment';

test('should render ExpenseForm', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with data', () => {
    const data = testExpenses[0];
    const wrapper = shallow(<ExpenseForm expense={data} />);
    expect(wrapper).toMatchSnapshot();
});

test('should display error message for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
});

test('should set description on input change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const newDescription = "Internet";
    wrapper.find('input').at(0).simulate('change', { 
        target: {
            value: newDescription
        }
    });
    expect(wrapper.state('description')).toBe(newDescription);
});

test('should set amount on input change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const newAmount = '10.00';
    wrapper.find('input').at(1).simulate('change', { 
        target: {
            value: newAmount
        }
    });
    expect(wrapper.state('amount')).toBe(newAmount);

});

test('should not set amount if invalid input', () => {
    const wrapper = shallow(<ExpenseForm />);
    const newAmount = '10.123';
    wrapper.find('input').at(1).simulate('change', { 
        target: {
            value: newAmount
        }
    });
    expect(wrapper.state('amount').length).toBe(0);
});


test('should call onSubmit prop on form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={testExpenses[0]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    expect(wrapper.state('error').length).toBe(0);
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: testExpenses[0].description,
        amount: testExpenses[0].amount,
        note: testExpenses[0].note,
        createdAt: testExpenses[0].createdAt
    });
});

test('should set new date on date change', () => {
    const wrapper = shallow(<ExpenseForm expense={testExpenses[0]} />);
    const now = moment();
    wrapper.find('SingleDatePicker').prop("onDateChange")(now);
    expect(wrapper.state('createdAt')).toEqual(now);
})