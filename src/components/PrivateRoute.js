import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from "react-router-dom";
import Header from "../components/Header";

// This is how you rename a lower case prop to upper case Component
// component comes from approuter.js
// isAuthenticated comes from mapStatetoProps
// We want to pull out isAuthenticated and component, and then get the rest of the props
export const PrivateRoute = ({
	isAuthenticated,
	component: Component,
	...rest // Rest operator
}) => (
	<Route {...rest} component={(props) => (
		isAuthenticated ? (
			<div>
				<Header/>
				<Component {...props} />
			</div>
		) : (
			<Redirect to="/"/>
		)
		)}/> // Pass in rest of props
);

const mapStateToProps = (state) => ({
	isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
