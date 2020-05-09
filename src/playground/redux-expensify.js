import {createStore, combineReducers} from "redux";
import uuid from 'uuid';

// ADD_EXPENSE
const addExpense = ({
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
const removeExpense = ({id} = {}) => ({ // destructure object passed in, and destructure empty if no
	type: 'REMOVE_EXPENSE', // this is the object that is returned, implicitly return an object (don't have to say return)
	id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
});

// SET_TEXT_FILTER

const setTextFilter = (text = '') => ({
	type: 'SET_TEXT_FILTER',
	text
});

// SORT_BY_DATE

const sortByDate = () => ({
	type: 'SORT_BY_DATE'
});
// SORT_BY_AMOUNT

const sortByAmount = () => ({
	type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE

const setStartDate = (startDate) => ({ // will be undefined if not provided
	type: 'SET_START_DATE',
	startDate
});
// SET_END_DATE
const setEndDate = (endDate) => ({
	type: 'SET_END_DATE',
	endDate
});


// expenses reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return [
				...state,
				action.expense
			];
		case 'REMOVE_EXPENSE':
			return state.filter(({id}) => id !== action.id); // remove item  if statement resolves to false (when id == action.id)
		case 'EDIT_EXPENSE':
			return state.map((expense) => {
				if (expense.id === action.id) {
					return {
						...expense,
						...action.updates
					};
				} else {
					return expense;
				}
			});
		default:
			return state;
	}
};

// Filters Reducer
// text => '', sortBy => 'date', startDate => undefined, endDate => undefined
const filtersReducerDefaultState = {
	text: '',
	sortBy: 'date',
	startDate: undefined,
	endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_TEXT_FILTER':
			return {...state, text: action.text}
		case 'SORT_BY_AMOUNT':
			return {...state, sortBy: 'amount'} // grab all the values from the old filter object
		case 'SORT_BY_DATE':
			return {...state, sortBy: 'date'} // grab all the values from the old filter object
		case 'SET_START_DATE':
			return {...state, startDate: action.startDate}
		case 'SET_END_DATE':
			return {...state, endDate: action.endDate}
		default:
			return state;
	}
};

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate}) => { // destructured filter object
	return expenses.filter((expense) => {
		const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate; // default to true if startDate is not a number... fail "open"
		const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
		const textMatch = typeof text !== 'string' || expense.description.toLowerCase().includes(text);

		// figure out if expenses.description has the text variable string inside of it
		// includes sees if one string includes another
		// convert both strings to lower case

		return startDateMatch && endDateMatch && textMatch // if all are true, filter function return true, item kept in array
		// if false, item removed from array
	}).sort((a, b) => {
		if (sortBy === 'date') {
			return a.createdAt < b.createdAt ? 1 : -1 // smaller value gets lower index in the array
		} else if (sortBy === 'amount') {
			return a.amount < b.amount ? 1 : -1
		}

		// sortBy -> amount
		// put the ones with a greater amount first
	});
}

// store creation

const store = createStore(
	combineReducers({
		expenses: expensesReducer,
		filters: filtersReducer
	})
);

store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	console.log(visibleExpenses);
})

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 , createdAt: -21000}));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300 , createdAt: -1000}));
//
// store.dispatch(removeExpense({id: expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));
//
// store.dispatch(setTextFilter('coffee'));
// store.dispatch(setTextFilter());
//
store.dispatch(sortByAmount()); // amount
// store.dispatch(sortByDate()); // date

// console.log(expenseOne);
// console.log(expenseTwo);
//
// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
//
// store.dispatch(setEndDate(999));

const demoState = {
	expenses: [{
		id: 'bvbrdkdbjnhfnjcbgubbfndlfnvlbckcrbnftjjfhtkg',
		description: 'January Rent',
		note: 'This was the final payment for that address',
		amount: 54500,
		createdAt: 0
	}],
	filters: {
		text: 'rent',
		sortBy: 'amount', // date or amount
		startDate: undefined,
		endDate: undefined
	}
};

const user = {
	name: 'Jen',
	age: 24
}

// console.log({
// 	...user,
// 	location: 'Philadelphia',
// 	age: 27
// });
