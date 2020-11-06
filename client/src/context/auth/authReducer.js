import {
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
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload
			};
		case AUTH_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				authErr: action.payload
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
			return { ...state, error: action.payload };
		case CLEAR_ERRORS:
			return {
				...state,
				authErr: null,
				serverErr: null,
				usernameErr: null,
				emailErr: null,
				phoneErr: null,
				passwordErr: null,
				passwordConfirmErr: null,
				firstnameErr: null,
				lastnameErr: null,
				adressErr: null,
				zipCodeErr: null,
				countryErr: null,
				cityErr: null,
				serverErr: null,
				registerFail: null
			};
		default:
			return state;
	}
};
