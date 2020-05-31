import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter, {history} from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import {startSetExpenses} from "./actions/expenses";
import {login, logout} from "./actions/auth";
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';
import {firebase} from './firebase/firebase';
// import './playground/promises';

const store = configureStore();

// store.dispatch(addExpense({description: 'Water bill', amount: 4500}));
// store.dispatch(addExpense({ description: 'Gas bill', createdAt: 1000}));
// store.dispatch(addExpense({description: 'rent', amount: 109500}));
// // store.dispatch(setTextFilter('gas'));
// //
// // setTimeout(() => {
// // 	store.dispatch(setTextFilter('bill'))
// // }, 3000);
//
// const state = store.getState();
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
// console.log(visibleExpenses);
// console.log(store.getState());

// provider provides store to all components
const jsx = (
	<Provider store={store}>
		<AppRouter/>
	</Provider>
)

// only render app if it hasn't been rendered yet. cut down on re-renders.
let hasRendered = false;
const renderApp = () => {
	if (!hasRendered) {
		ReactDOM.render(jsx, document.getElementById('app'));
		hasRendered = true;
	}
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		// "Login" needs to be called anytime a user visits a route directly
		// so that we can set the user ID in the state
		// This is different from startLogin, which is only called on explicit logins
		store.dispatch(login(user.uid));
		// only redirect the user if they are on the login page
		// user will exist if we do a hard refresh on any routes
		store.dispatch(startSetExpenses()).then(() => {
			console.log('uid', user.uid);
			renderApp()
			if (history.location.pathname === '/') {
				history.push('/dashboard');
			}
		})
	} else {
		store.dispatch(logout());
		renderApp();
		history.push('/');
		console.log('log out');
	}
})
