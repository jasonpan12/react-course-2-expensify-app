// ADD_EXPENSE
import uuid from "uuid";

export const addExpense = ({
		description = '',
		note = '',
		amount = 0,
		createdAt = 0
} = {}) => ({
	type: 'ADD_EXPENSE',
	expense: {
		id: uuid(),
		description,
		note,
		amount,
		createdAt
	}
});

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
