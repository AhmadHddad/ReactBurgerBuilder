import * as actionTypes from '../actoinTypes/actionTypes';
import axios from 'axios'


export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
};

export const authFail = (err) => {
	return {
		type: actionTypes.AUTH_FAIL, err: err
	}
};
export const authSuccess = (token, userId, refreshToken) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		userId: userId,
		refreshToken: refreshToken,
	}
};

export const auth = (email, pass, isSignUp) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: pass,
			returnSecureToken: true,
		};
		let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAf7MDHioPNxuN_EyGr1JokfzuVO5yClwc';
		if (!isSignUp) {
			url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAf7MDHioPNxuN_EyGr1JokfzuVO5yClwc'
		}
		axios.post(url, authData)
			.then(res => {
				let response = res.data;
				const expirationDate = new Date(new Date().getTime() + response.expiresIn * 1000);
				localStorage.setItem('token', response.idToken);
				localStorage.setItem('expirationDate', expirationDate);
				localStorage.setItem('userId', response.localId);
				console.log('this is autActionCreator response.data', response);
				dispatch(checkAuthTimeout(response.expiresIn));
				dispatch(authSuccess(response.idToken, response.localId, response.refreshToken))
			})
			.catch(err => {
				console.log('this is auth err', err.message);
				dispatch(authFail(err))
			})
	}
};

export const logOut = () => {
	localStorage.clear();
	return {
		type: actionTypes.AUTH_LOGOUT
	}
};

export const checkAuthTimeout = (timeout) => {

	return dispatch => {
		setTimeout(() => {
			dispatch(logOut())
		}, timeout * 1000)
	}

};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logOut())
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate > new Date()) {
				const userId = localStorage.getItem('userId');
				dispatch(authSuccess(token, userId, null));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
			} else {
				dispatch(logOut())
			}
		}
	}
};
