import React from 'react';
import selectExpenses from '../selectors/expenses'
import selectExpensesTotal from "../selectors/expenses-total";
import {connect} from "react-redux";
import numeral from "numeral";

// Must export this on its own (unconnected) in order to test the unconnected component
export const ExpensesSummary = (props) => {
	const expenseCount = props.expenses.length;
	const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
	const expensesTotal = numeral(selectExpensesTotal(props.expenses)/100).format('$0,0.00');
	return (
		<h1>{`Viewing ${expenseCount} expenses totalling ${expensesTotal}`}</h1>
	);
}

// Map redux state to props. props.expenses is the result of selectExpenses.
const mapStateToProps = (state) => ({
	expenses: selectExpenses(state.expenses, state.filters)
})

// Connect this component to the Redux store
export default connect(mapStateToProps)(ExpensesSummary);
