import {shallow} from "enzyme/build";
import expenses from "../fixtures/expenses";
import React from "react";
import ExpenseDashboardPage from "../../components/ExpenseDashboardPage";

test('should render ExpenseDashboardPage with expense', () => {
	const wrapper = shallow(<ExpenseDashboardPage {...expenses[0]}/>);
	expect(wrapper).toMatchSnapshot();
})
