export default (state = {}, action) => {
	switch (action.type) {
		case 'LOGIN':
			// Return new state, which is an object
			return {
				uid: action.uid
			}
		case 'LOGOUT':
			return {};
		default:
			return state;
	}
}
