import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
	editExpense = jest.fn();
	removeExpense = jest.fn()
	history = {push: jest.fn() } // an object with field push that has value jest.fn. we call history.push in code

	wrapper = shallow(<EditExpensePage editExpense={editExpense} removeExpense={removeExpense} history={history} expense={expenses[2]}/>)
})

test('should render EditExpensePage', () => {
	expect(wrapper).toMatchSnapshot();
})

test('should handle editExpense', () => {
	wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]); // when editExpense is clicked, expense's form onsubmit
	// should be called with the data

	// should also expect history was run
	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
})

test('should handle removeExpense', () => {
	wrapper.find('button').simulate('click');
	// should be called with the data

	// should also expect history was run
	expect(removeExpense).toHaveBeenLastCalledWith({id: expenses[2].id});
	expect(history.push).toHaveBeenLastCalledWith('/');

})
