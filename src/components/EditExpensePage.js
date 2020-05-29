import React from "react";
import {connect} from "react-redux";
import ExpenseForm from "./ExpenseForm";
import {editExpense, startRemoveExpense} from "../actions/expenses";

// Refactor EditExpensePage to be a class based component, which will let us pull out the inline fnctions
// set up mapDispatchToProps editExpense and removeExpense

// should render EditExpensePage
// snapshot

// should handle editExpense
// spies

// should handle removeExpense
// spies

export class EditExpensePage extends React.Component {
	onSubmit = (expense) => { // by binding the onSubmit here, we aren't re-rendering onsubmit each time the props update
		// the expense object is provided down in ExpenseForm
		// dispatch action to edit expense
		// redirect to dashboard page
		this.props.editExpense(this.props.expense.id, expense)
		this.props.history.push('/');
	}

	onRemove = () => {
		// dispatch action to removeExpense
		this.props.startRemoveExpense({id: this.props.expense.id})
		this.props.history.push('/');
	}

	render() {
		return (
			<div>
					<ExpenseForm
						expense = {this.props.expense}
						onSubmit = {this.onSubmit}
					/>
					<button onClick={this.onRemove}>Remove</button>
				</div>
		)
	}
}

const mapStateToProps = (state, props) => { // these props can be sent down to the HOC
	return { // EditExpensePage is given an expense prop
		expense: state.expenses.find((expense) => expense.id === props.match.params.id)
		// All expenses are in the state, but this page has an id in its params
		// the expense prop is whichever expense matches the ID in the params.
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	editExpense: (id, expense) => dispatch(editExpense(id, expense)),
	startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage); // this is the HOC (EditExpensePage), and we can pass new props in
