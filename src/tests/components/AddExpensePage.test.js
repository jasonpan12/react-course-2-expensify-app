import React from 'react';
import {shallow} from 'enzyme';
import {AddExpensePage} from "../../components/AddExpensePage";
import expenses from "../fixtures/expenses";

let addExpense, history, wrapper;

beforeEach(() => {
	// Define Spies
	addExpense = jest.fn(); // no const required since initiated above as null
	history = {push: jest.fn() }

	// Set up wrapper
	wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history}/>);

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
	expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
})
