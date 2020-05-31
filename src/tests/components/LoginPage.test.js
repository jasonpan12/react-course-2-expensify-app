import {shallow} from "enzyme/build";
import React from "react";
import {LoginPage} from "../../components/LoginPage";

let wrapper, startLogin;

beforeEach(() => {
	startLogin = jest.fn();

	wrapper = shallow(<LoginPage startLogin={startLogin}/>);
})
test('should render login page that matches snapshot', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should call startLogin on button click', () => {
	wrapper.find('button').simulate('click');
	expect(startLogin).toHaveBeenCalled();
})
