import {login, logout} from "../../actions/auth";

test('should set up login action', () => {
	const uid = '12345';
	const expected = {
		type: 'LOGIN',
		uid
	};

	const actual = login(uid);
	expect(expected).toEqual(actual);
})

test('should set up logout action', () => {
	const expected = {
		type: 'LOGOUT'
	};

	const actual = logout();
	expect(expected).toEqual(actual);
})
