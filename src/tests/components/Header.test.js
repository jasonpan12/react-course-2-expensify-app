import React from 'react';
import {shallow} from 'enzyme';
// import toJSON from 'enzyme-to-json'; // just extract meaningful output
import {Header} from '../../components/Header';

// Instantiate props outside of beforeEach
let startLogout, wrapper;

beforeEach(() => {
	// Set up spies
	startLogout = jest.fn();

	// Set up component
	wrapper = shallow(<Header startLogout={startLogout}/>);
})

test('should render Header correctly', () => {
	// expect(toJSON(wrapper)).toMatchSnapshot();
	expect(wrapper).toMatchSnapshot();

	// expect(wrapper.find('h1').text()).toBe('Expensify');
	// const renderer = new ReactShallowRenderer();
	// renderer.render(<Header/>);
	// expect(renderer.getRenderOutput()).toMatchSnapshot();
	//
	// console.log(renderer.getRenderOutput());
})

// should call startLogout on button click

test('should call startLogout on button click', () => {
	wrapper.find('button').simulate('click');
	expect(startLogout).toHaveBeenCalled();
})
//login page test file / should call startLogin on button click
