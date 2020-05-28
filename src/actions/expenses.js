// ADD_EXPENSE
import uuid from "uuid";
import database from '../firebase/firebase';

export const addExpense = (expense) => ({
	type: 'ADD_EXPENSE',
	expense
});

export const startAddExpense = (expenseData = {}) => {
	// return a function
	return (dispatch) => {
		const {
			description = '',
			note = '',
			amount = 0,
			createdAt = 0
		} = expenseData;
		const expense = { description, note, amount, createdAt };

		// Use Firebase SDK to push expense object to 'expenses' ref,
		// and once complete, dispatch addExpense action to update redux
		// return the database promise so that we can test with .then
		return database.ref('expenses').push(expense)
			.then((ref) => {
				dispatch(addExpense({
					id: ref.key,
					...expense
				}))
		})
	}
}
// REMOVE_EXPENSE
export const removeExpense = ({id} = {}) => ({ // destructure object passed in, and destructure empty if no
	type: 'REMOVE_EXPENSE', // this is the object that is returned, implicitly return an object (don't have to say return)
	id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
});
