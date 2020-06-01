import {Router, Link, NavLink, Route, Switch} from "react-router-dom";
import React from "react";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from "../components/PublicRoute";

export const history = createHistory();

const AppRouter = () => (
	// using Router vs BrowserRouter means we can use custom history
	// BrowserRouter has history built in
	<Router history={history}>
		<div>
			<Switch>
				<PublicRoute path="/" component={LoginPage} exact={true}/>
				<PrivateRoute path="/dashboard" component={ExpenseDashboardPage}/>
				<PrivateRoute path="/create" component={AddExpensePage}/>
				<PrivateRoute path="/edit/:id" component={EditExpensePage}/>
				<Route component={NotFoundPage}/>
			</Switch>
		</div>
	</Router>
);

export default AppRouter;
