import {
	SET_LOADING,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_LOADING:
			return { ...state, loading: action.payload };
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload
			};
		case REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false
			};
		case REGISTER_FAIL:
			console.log(action.payload);
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case AUTH_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload
			};
		case CLEAR_ERRORS:
			return {
				...state,
				errors: null
			};
		default:
			return state;
	}
};
