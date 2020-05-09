import filtersReducer from '../../reducers/filters';
import moment from "moment";

test('should set up default filter values', () => {
	const state = filtersReducer(undefined, {type: '@@INIT'}); // init action fired after initial set up
	expect(state).toEqual({
		text: '',
		sortBy: 'date',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	})
});

test('should set sortBy to amount', () => {
	const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'})
	expect(state.sortBy).toBe('amount');
})

test('should set sortBy to date', () => {
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'amount' // sortBy is defaulted to date, so set it to something else first
	}
	const action = {type: 'SORT_BY_DATE'}
	const state = filtersReducer(currentState, action);
	expect(state.sortBy).toBe('date');
})

// should set text filter
test('should set text filter', () => {
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: undefined
	}
	const action = {type: 'SET_TEXT_FILTER', text: 'abc123'}
	const state = filtersReducer(currentState, action);
	expect(state.text).toBe('abc123');
})

// should set startDate filter
test('should set startDate filter', () => {
	const startDate = moment();
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: undefined
	}
	const action = {type: 'SET_START_DATE', startDate}
	const state = filtersReducer(currentState, action);
	expect(state.startDate).toEqual(startDate);
})

// should set endDate filter

test('should set endDate filter', () => {
	const endDate = moment();
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: undefined
	}
	const action = {type: 'SET_END_DATE', endDate}
	const state = filtersReducer(currentState, action);
	expect(state.endDate).toBe(endDate);
})
