import React from 'react';
import {connect} from 'react-redux';
import {DateRangePicker} from 'react-dates';
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from "../actions/filters";

export class ExpenseListFilters extends React.Component {
	state = {
		calendarFocused: null // ExpenseForm  also kept track of calendarFocused
	}
	onDatesChange = ({startDate, endDate}) => { // onDatesChange will be called by the react-dates library with an object startDate and endDate
		this.props.setStartDate(startDate);
		this.props.setEndDate(endDate);
	}
	onFocusChange = (calendarFocused) => {
		this.setState(() => ({calendarFocused}))
	}

	onTextChange = (event) => {
		// dispatch gets included in props with connected components
		this.props.setTextFilter(event.target.value);
	}

	onSortChange = (event) => {
		if (event.target.value === "date") {
			this.props.sortByDate()
		} else if (event.target.value === "amount") {
			this.props.sortByAmount()
		}
	}

	render() {
		return (
			<div>
				<input placeholder="Text Filter" type="text" value={this.props.filters.text}
					   onChange = {this.onTextChange}/>
				<select value={this.props.filters.sortBy} onChange = {this.onSortChange}>
					<option value="date">Date</option>
					<option value="amount">Amount</option>
				</select>
				<DateRangePicker
					startDate={this.props.filters.startDate}
					endDate={this.props.filters.endDate}
					onDatesChange={this.onDatesChange}
					focusedInput={this.state.calendarFocused}
					onFocusChange={this.onFocusChange}
					showClearDates={true}
					numberOfMonths={1}
					isOutsideRange={() => false}
				/>
			</div>
		);
	}
}

// Pulls state from redux store, passes in filters as props
const mapStateToProps = (state) => {
	return {
		filters: state.filters
	};
}

const mapDispatchToProps = (dispatch) => ({ // factor all dispatch calls down here
	setTextFilter: (text) => dispatch(setTextFilter(text)),
	sortByDate: () => dispatch(sortByDate()),
	sortByAmount: () => dispatch(sortByAmount()),
	setStartDate: (startDate) =>  dispatch(setStartDate(startDate)),
	setEndDate: (endDate) => dispatch(setEndDate(endDate))
})
// Map dispatch functions to Props
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
