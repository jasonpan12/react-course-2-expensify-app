import authReducer from '../../reducers/auth';

test('should set uid for login', () => {
	const uid = '12345';
	const action = {
		type: 'LOGIN',
		uid
	}

	const state = authReducer(undefined, action);
	expect(state).toEqual({
		uid
	})
})

test('should remove uid for logout', () => {
	const uid = '12345';
	const action = {
		type: 'LOGOUT'
	}

	const state = authReducer({uid}, action);
	expect(state).toEqual({});
})
