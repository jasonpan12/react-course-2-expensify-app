import {shallow} from "enzyme/build";
import expenses from "../fixtures/expenses";
import React from "react";
import ExpenseListItem from "../../components/ExpenseListItem";

test('should render ExpenseListItem with expense', () => {
	const wrapper = shallow(<ExpenseListItem {...expenses[0]}/>);
	expect(wrapper).toMatchSnapshot();
})
