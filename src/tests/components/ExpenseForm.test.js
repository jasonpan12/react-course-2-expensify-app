import React from 'react';
import {shallow} from 'enzyme';
import moment from "moment";
import ExpenseForm from '../../components/ExpenseForm.js';
import expenses from "../fixtures/expenses";

test('should render ExpenseForm correctly', () => {
	const wrapper = shallow(<ExpenseForm/>);
	expect(wrapper).toMatchSnapshot();
})

test('should render expenseForm with expense data', () => {
	const wrapper = shallow(<ExpenseForm {...expenses[0]}/>);
	expect(wrapper).toMatchSnapshot();
})

test('should render error for invalid form submission', () => {
	// Render Component
	const wrapper = shallow(<ExpenseForm/>);
	expect(wrapper).toMatchSnapshot(); // Take a snapshot before
	// Simulate a click
	wrapper.find('form').simulate('submit', {
		preventDefault: () => {} // must provide preventDefault on error object, otherwise event e is undefined
	});

	// Assert that an error was added to the state
	expect(wrapper.state('error').length).toBeGreaterThan(0);
	expect(wrapper).toMatchSnapshot(); // Take a snapshot after
})

test('should set description on input change', () => {
	const value = 'New Description';
	const wrapper = shallow(<ExpenseForm/>);
	wrapper.find('input').at(0).simulate('change', {
		target: { value }
	});

	expect(wrapper.state('description')).toBe(value);
});

// should set note on textarea change

test('should set note on textarea change', () => {
	const value = 'New note value';
	const wrapper = shallow(<ExpenseForm/>);
	wrapper.find('textarea').simulate('change', {
		target: { value }
	});

	expect(wrapper.state('note')).toBe(value);
});

// should set amount if valid input
//23.50

test('should set amount if valid input', () => {
	const value = '23.50';
	const wrapper = shallow(<ExpenseForm/>);
	wrapper.find('input').at(1).simulate('change', {
		target: {value}
	});

	expect(wrapper.state('amount')).toBe(value);
})

//shouldnotsetamount if invalid input
// 12.122

test('should not set amount if invalid input', () => {
	const value = '12.122';
	const wrapper = shallow(<ExpenseForm/>);
	wrapper.find('input').at(1).simulate('change', {
		target: {value}
	});

	expect(wrapper.state('amount')).not.toBe(value);
	expect(wrapper.state('amount')).toBe(''); // expect it to stay as default
})

test('should call onSubmit prop for valid form submission', () => {
	const onSubmitSpy = jest.fn();
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>)
	wrapper.find('form').simulate('submit', {
		preventDefault: () => {} // must provide preventDefault on error object, otherwise event e is undefined
	});

	expect(wrapper.state('error')).toBe('');
	expect(onSubmitSpy).toHaveBeenCalledWith({
		description: expenses[0].description,
		amount: expenses[0].amount,
		note: expenses[0].note,
		createdAt: expenses[0].createdAt
	});
	// onSubmitSpy('Andrew', 'Philadelphia');
	// expect(onSubmitSpy).toHaveBeenCalledWith('Andrew', 'Philadelphia');
});

test('should set new date on date change', () => {
	const now = moment();
	const wrapper = shallow(<ExpenseForm/>);
	wrapper.find('SingleDatePicker').prop('onDateChange')(now);
	expect(wrapper.state('createdAt')).toEqual(now);
})

test('should set should set calendar focus on change', () => {
	const focused = true;
	const wrapper = shallow(<ExpenseForm/>);
	wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});
	expect(wrapper.state('calendarFocused')).toBe(focused);
})
