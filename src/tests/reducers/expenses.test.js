import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import uuid from "uuid";

test('should set default state', () => {
	const state = expensesReducer(undefined, {type: '@@INIT'});
	expect(state).toEqual([]);
});

test('should remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[1].id
	}
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[0], expenses[2]])
});

test('should not remove any expenses if id not found', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: '-1'
	}
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
})

// add expense x1
test('should add expense', () => {
	const expense = {
		id: '109',
		description: 'Laptop',
		note: '',
		createdAt: 2000,
		amount: 29500
	}
	const action = {
		type: 'ADD_EXPENSE',
		expense
	}
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses, expense]);
})

// edit expense x2
test('should edit expense', () => {
	const action = {
		type: 'EDIT_EXPENSE',
		id: expenses[0].id,
		updates: {
			description: 'edited'
		}
	}
	const state = expensesReducer(expenses, action);
	expect(state[0].description).toBe('edited');
})

test('should not edit expense when id cannot be found', () => {
	const action = {
		type: 'EDIT_EXPENSE',
		id: '800',
		updates: {
			description: 'edited'
		}
	}
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
})

test('should set expenses', () => {
	const action = {
		type: 'SET_EXPENSES',
		expenses
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual(expenses);
})
