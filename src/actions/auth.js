import {firebase, googleAuthProvider} from '../firebase/firebase';

export const login = (uid) => ({
	type: 'LOGIN',
	uid
})

export const startLogin = () => {
	// Returning a function in an async action is redux thunk
	return () => {
		return firebase.auth().signInWithPopup(googleAuthProvider);
	}
}

export const logout = () => ({
	type: 'LOGOUT'
})

export const startLogout = () => {
	return () => {
		return firebase.auth().signOut();
	}
}
