import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import {filters, altFilters} from "../fixtures/filters";
import moment from "moment";

// Initialize vars so that each test case has access to a fresh version of these props
let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
	// Define Spies
	setTextFilter = jest.fn();
	sortByDate = jest.fn();
	sortByAmount = jest.fn();
	setStartDate = jest.fn();
	setEndDate = jest.fn();

	// set up wrapper
	wrapper = shallow(
		<ExpenseListFilters
			filters={filters}
			setTextFilter={setTextFilter}
			sortByDate={sortByDate}
			sortByAmount={sortByAmount}
			setStartDate={setStartDate}
			setEndDate={setEndDate}
		/>
	);
});

test('should render ExpenseListFilters correctly', () => {
	expect(wrapper).toMatchSnapshot();
})

test('should render ExpenseListFilters with alt data correctly', () => {
	// Override the filters with a different set of filters
	// Expect the component to still display
	wrapper.setProps({
		filters: altFilters
	})
	expect(wrapper).toMatchSnapshot();
})

// should handle text change
test('should handle text change', () => {
	// Start with nothing in the input element

	// Edit the input element and fire a simulated change event
	const value = 'bills'
	wrapper.find('input').simulate('change',{
		target: { value }
	});

	// Expect the change to have made setTextFilter get called
	expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

// should sort by date
test('should sort by date', () => {
	// Set amount as the current sortBy value
	wrapper.setProps({
		filters: altFilters // already sorted by amount, we will change it to date
	})

	// Fire a simulated change event on the select
	const value = 'date';
	wrapper.find('select').simulate('change', {
		target: {value}
	})

	// expect the sortByDate function to have been called. It takes no inputs.
	expect(sortByDate).toHaveBeenCalled();
})

// should sort by amount
test('should sort by amount', () => {
	// Start with no sortBy value

	// Change the sortBy to amount
	const value = 'amount';
	wrapper.find('select').simulate('change', {
		target: {value}
	})

	// Expect sortByAmount to have been called
	expect(sortByAmount).toHaveBeenCalled();
})

// should handle date changes
test('should handle date change', () => {
	// Define start and end dates
	const startDate = moment(0).add(4, "years")
	const endDate = moment(0).add(8, "years")

	// Call onDatesChange prop
	wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate});

	// Expect dispatchers to have been called individually
	expect(setStartDate).toHaveBeenLastCalledWith(startDate);
	expect(setEndDate).toHaveBeenLastCalledWith(endDate);
})

// should handle date focus changes
test('should handle date focus change', () => {
	// calendar focus starts as null

	// Change calendarFocused to endDate with onFocusChange prop
	const calendarFocused = 'endDate';
	wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);

	// Expec tthe state to be updated
	expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
})
