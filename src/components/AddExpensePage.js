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
				<div className = "page-header">
					<div className = "content-container">
						<h1 className = "page-header__title">Add Expense</h1>
					</div>
				</div>
				<div className = "content-container">
					<ExpenseForm onSubmit={this.onSubmit}/>
				</div>
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
