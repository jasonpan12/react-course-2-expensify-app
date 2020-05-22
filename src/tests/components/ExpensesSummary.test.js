import {shallow} from "enzyme/build";
import expenses from "../fixtures/expenses";
import React from "react";
import {ExpensesSummary} from "../../components/ExpensesSummary";

test('should display correct summary for one expense', () => {
	const wrapper = shallow(<ExpensesSummary expenses={[expenses[0]]}/>);
	expect(wrapper).toMatchSnapshot();
})

test('should display correct summary for two expenses', () => {
	const wrapper = shallow(<ExpensesSummary expenses={[expenses[0], expenses[1]]}/>);
	expect(wrapper).toMatchSnapshot();
})
