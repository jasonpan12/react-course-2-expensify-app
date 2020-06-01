import {addExpense, editExpense, removeExpense, startAddExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense} from "../../actions/expenses";
import configureMockStore from 'redux-mock-store';
import database from '../../firebase/firebase';
import thunk from 'redux-thunk';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);
const uid = '1234';
const defaultAuthState = {auth: {uid}};

// Set up test data, to be retreived later
beforeEach((done) => {
	const expensesData = {};
	// Must transform expense object to have description, note, amount, and createdAt in an object
	// under id, e.g.
	// { '1': { description: 'Gum', note: '', amount: 195, createdAt: 0 },
   // '2':
   //  { description: 'Rent',
   //    note: '',
   //    amount: 109500,
   //    createdAt: -345600000 },
   // '3':
   //  { description: 'Credit Card',
   //    note: '',
   //    amount: 4500,
   //    createdAt: 345600000 } }

	expenses.forEach(({id, description, note, amount, createdAt}) => {
		expensesData[id] = {description, note, amount, createdAt}
	})

	// Since we use "set", the entire expenses ref will be reset before each test
	database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should set up remove expense action object', () => {
	const action = removeExpense({ id: '123abc' });
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	})
})

test('should remove expenses from firebase', (done) => {
	// Must set initial state. Auth is called by startRemoveExpense
	const store = createMockStore(defaultAuthState);
	const id = expenses[0].id
	store.dispatch(startRemoveExpense({
		id
	})).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'REMOVE_EXPENSE',
			id
		});
		return database.ref(`users/${uid}/expenses/${id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toBeFalsy(); // null is considered falsy. anything else will throw error
		done();
	});

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

test('should edit expense on database and store', (done) => {
	const store = createMockStore(defaultAuthState);
	const id = expenses[2].id;
	const updates = {note: 'New Note Value'};
	store.dispatch(startEditExpense(id, updates)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'EDIT_EXPENSE',
			id,
			updates
		})
		return database.ref(`users/${uid}/expenses/${id}`).once('value')
	}).then((snapshot) => {
		expect(snapshot.val().note).toBe(updates.note);
		done();
	});
})

test('should set up add expense action object with provided values', () => {
	const action = addExpense(expenses[2]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[2]
	})
});

test('should add expense to database and store', (done) => {
	const store = createMockStore(defaultAuthState);
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
		return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData);
		done();
	});
})

test('should add expense with defaults to database and store', (done) => {
	const store = createMockStore(defaultAuthState);
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
		return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(defaultExpense);
		done();
	});
})

test('should set up set expense action object with data', () => {
	const action = setExpenses(expenses);
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	})
})

test('should fetch the expenses from firebase', (done) => {
	const store = createMockStore(defaultAuthState);
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		});
		done();
	});
})

