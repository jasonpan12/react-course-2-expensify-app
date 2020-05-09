import moment from 'moment';
// Filters Reducer
// text => '', sortBy => 'date', startDate => undefined, endDate => undefined

// this is the default filter
const filtersReducerDefaultState = {
	text: '',
	sortBy: 'date',
	startDate: moment().startOf('month'),
	endDate: moment().endOf('month')
};
export default (state = filtersReducerDefaultState, action) => {
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
