// Get visible expenses
import moment from "moment";

export default (expenses, { text, sortBy, startDate, endDate}) => { // destructured filter object
	return expenses.filter((expense) => {
		// for every expense, see if it should be returned by filter
		const createdAtMoment = moment(expense.createdAt); // create a moment and use it below
		const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day'): true;
		const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment,'day'): true;
		// const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate; // default to true if startDate is not a number... fail "open"
		// const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
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
