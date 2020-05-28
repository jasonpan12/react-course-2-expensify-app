import {addExpense, editExpense, removeExpense, startAddExpense} from "../../actions/expenses";
import configureMockStore from 'redux-mock-store';
import database from '../../firebase/firebase';
import thunk from 'redux-thunk';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);

test('should set up remove expense action object', () => {
	const action = removeExpense({ id: '123abc' });
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	})
})

test('should set up edit expense action object', () => {
	const action = editExpense('123abc', {note: 'New Note Value'});
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123abc',
		updates: {
			note: 'New Note Value'
		}
	})
})

test('should set up add expense action object with provided values', () => {
	const action = addExpense(expenses[2]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[2]
	})
});

test('should add expense to database and store', (done) => {
	const store = createMockStore({});
	const expenseData = {
		description: 'mouse',
		amount: 3000,
		note: 'This one is better',
		createdAt: 1000
	}
	store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions(); // returns array of actions that were called

		// Expect the action to contain the expense we created
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData
			}
		})

		// Expect the database to contain an expense, using the id from the action
		// Return a promise here, so that "then" is moved below -- makes it easier to read
		// rather than putting everything in one line
		return database.ref(`expenses/${actions[0].expense.id}`).once('value')
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData);
		done();
	});
})

test('should add expense with defaults to database and store', (done) => {
	const store = createMockStore({});
	const defaultExpense = {
		description:  '',
		note: '',
		amount: 0,
		createdAt: 0
	}

	store.dispatch(startAddExpense({})).then(() => {
		const actions = store.getActions(); // returns array of actions that were called

		// Expect the action to contain the expense we created
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...defaultExpense
			}
		})

		// Expect the database to contain an expense, using the id from the action
		// Return a promise here, so that "then" is moved below -- makes it easier to read
		// rather than putting everything in one line
		return database.ref(`expenses/${actions[0].expense.id}`).once('value')
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(defaultExpense);
		done();
	});
})

// test('should set up add expense action with default values', () => {
// 	const expenseDataDefault = {
// 		description: '',
// 		note: '',
// 		amount: 0,
// 		createdAt: 0
// 	}
// 	const action = addExpense();
// 	expect(action).toEqual({
// 		type: 'ADD_EXPENSE',
// 		expense: {
// 			...expenseDataDefault,
// 			id: expect.any(String)
// 		}
// 	})
// })
