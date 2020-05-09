import React from 'react';
import {connect} from 'react-redux';
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from '../selectors/expenses';

// Export this so we can test the unconnected version in jest
export const ExpenseList = (props) => (
	<div>
		{
			props.expenses.length === 0 ? (
				<p>No expenses</p>
			) : (
				props.expenses.map((expense) => {
					return <ExpenseListItem key={expense.id} {...expense}/> // spread operator
				})
			)
		}
	</div>
);

// Takes state and makes it into props for the connect api
// basically what do you want off the store, then what component do you want to connect the store to
const mapStateToProps = (state) => ({
	// Determine which expenses we should show in the list
	// by using selectExpenses
	expenses: selectExpenses(state.expenses, state.filters)
})

// call it ConnectedExpenseList
// connect returns a function, which means we need to call that function
export default connect(mapStateToProps)(ExpenseList);
