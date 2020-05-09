import {combineReducers, createStore} from "redux";
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

export default () => {
	const store = createStore(
		combineReducers({
			expenses: expensesReducer,
			filters: filtersReducer
		}),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);

	return store;
	// when we import this file, we can just call the function right away
}
