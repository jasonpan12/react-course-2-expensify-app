const selectExpensesTotal = (expenses) => {
	const justTotals = expenses.map((expense) => expense.amount);
	const sum = justTotals.length > 0 ? justTotals.reduce((previousValue, currentValue) => previousValue + currentValue) : 0;
	return sum;
};

export default selectExpensesTotal;
