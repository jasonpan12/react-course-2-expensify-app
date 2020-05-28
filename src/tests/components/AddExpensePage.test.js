import React from 'react';
import {shallow} from 'enzyme';
import {AddExpensePage} from "../../components/AddExpensePage";
import expenses from "../fixtures/expenses";

let startAddExpense, history, wrapper;

beforeEach(() => {
	// Define Spies
	startAddExpense = jest.fn(); // no const required since initiated above as null
	history = {push: jest.fn() }

	// Set up wrapper
	wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history}/>);

})

test('should render AddExpensePage correctly', () => {

	// Make assertion
	expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
	// set up wrapper
	wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);

	// Make assertions
	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
})
