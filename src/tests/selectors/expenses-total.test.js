import selectExpensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

test('should return 0 if no expenses', () => {
	const actual = selectExpensesTotal([]);
	const expected = 0;

	expect(actual).toBe(actual);
});

test('should correctly add up a single expense', () => {
	const actual = selectExpensesTotal([expenses[0]]);
	const expected = 195;

	expect(actual).toBe(actual);
});

test('should correctly add up multiple expenses', () => {
	const actual = selectExpensesTotal(expenses);
	const expected = 114195;

	expect(actual).toBe(actual);
});

