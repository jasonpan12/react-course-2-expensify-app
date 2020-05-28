import React from "react";
import {connect} from 'react-redux';
import ExpenseForm from "./ExpenseForm";
import {startAddExpense} from "../actions/expenses";

export class AddExpensePage extends React.Component {
	onSubmit = (expense) => {
		this.props.startAddExpense(expense);
		this.props.history.push('/');
	}

	render() {
		return (
			<div>
				<h1>Add Expense</h1>
				<ExpenseForm
					onSubmit={this.onSubmit}
				/>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	startAddExpense: (expense) => dispatch(startAddExpense(expense)) // implicitly return an object, where onSubmit is a function
	// pull addExpense into here so that we can test this component
	// should be named addExpense, the name of the dispatcher
	// return your dispatcher functions here
})

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
