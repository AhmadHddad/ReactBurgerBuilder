import * as actionTypes from '../actions/actoinTypes/actionTypes.js';


const initialState = {
	token: null,
	userId: null,
	err: null,
	loading: false,
	refreshToken:null,
};
const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return {
				...state,
				err: null,
				loading: true,
			};
		case actionTypes.AUTH_FAIL:
			return {
				...state,
				error: action.err,
				loading: false,
			};
		case actionTypes.AUTH_SUCCESS:
			return {
				...state,
				token: action.token,
				userId: action.userId,
				err: null,
				loading: false,
				refreshToken:action.refreshToken
			};

		case actionTypes.AUTH_LOGOUT:
			return {
				...state,
				token: null,
				userId: null,
				err: null,
				name: null,
				refreshToken: null,
			};
		default:
			return state;

	}
};

export default authReducer;