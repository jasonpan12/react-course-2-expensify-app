import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from "react-router-dom";
import Header from "../components/Header";

// Route to Dashboard if authenticated
// Route to requested component if not authenticated
export const PublicRoute = ({
	isAuthenticated,
	component: Component,
	...rest // Rest operator
}) => (
	<Route {...rest} component={(props) => (
		isAuthenticated ? (
			<Redirect to="/dashboard"/>
		) : (
			<div>
				<Header/>
				<Component {...props} />
			</div>
		)
		)}/> // Pass in rest of props
);

const mapStateToProps = (state) => ({
	isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);

// Create PublicRoute
// Redirect to /dashboard
// Render component if not logged in
// Use it for the Login page
