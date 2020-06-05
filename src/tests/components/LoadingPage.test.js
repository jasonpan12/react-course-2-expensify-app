import {shallow} from "enzyme/build";
import React from "react";
import LoadingPage from "../../components/LoadingPage";

test('should render login page that matches snapshot', () => {
	const wrapper = shallow(<LoadingPage />);
	expect(wrapper).toMatchSnapshot();
});
