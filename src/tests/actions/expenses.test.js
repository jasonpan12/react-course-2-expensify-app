import {addExpense, editExpense, removeExpense} from "../../actions/expenses";

test('should set up remove expense action object', () => {
	const action = removeExpense({ id: '123abc' });
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	})
})

test('should set up edit expense action object', () => {
	const action = editExpense('123abc', {note: 'New Note Value'});
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123abc',
		updates: {
			note: 'New Note Value'
		}
	})
})

test('should set up add expense action object with provided values', () => {
	const expenseData = {
		description: 'Rent',
		amount: 10950,
		createdAt: 1000,
		note: 'This was last months rent'
	};
	const action = addExpense(expenseData);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenseData,
			id: expect.any(String)
		}
	})
});

test('should set up add expense action with default values', () => {
	const expenseDataDefault = {
		description: '',
		note: '',
		amount: 0,
		createdAt: 0
	}
	const action = addExpense();
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenseDataDefault,
			id: expect.any(String)
		}
	})
})
