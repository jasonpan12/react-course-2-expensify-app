import React from 'react';
import selectExpenses from '../selectors/expenses'
import selectExpensesTotal from "../selectors/expenses-total";
import {connect} from "react-redux";
import numeral from "numeral";
import {Link} from "react-router-dom";

// Must export this on its own (unconnected) in order to test the unconnected component
export const ExpensesSummary = (props) => {
	const expenseCount = props.expenses.length;
	const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
	const expensesTotal = numeral(selectExpensesTotal(props.expenses)/100).format('$0,0.00');
	return (
		<div className = "page-header">
			<div className = "content-container">
				<h1 className = "page-header__title">Viewing <span>{expenseCount}</span> expenses totalling <span>{expensesTotal}</span></h1>
				<div className = "page-header__actions">
					<Link className = "button" to ="/create">Add Expense</Link>
				</div>
			</div>
		</div>
	);
}

// Map redux state to props. props.expenses is the result of selectExpenses.
const mapStateToProps = (state) => ({
	expenses: selectExpenses(state.expenses, state.filters)
})

// Connect this component to the Redux store
export default connect(mapStateToProps)(ExpensesSummary);
