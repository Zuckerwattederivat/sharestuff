import {
	SET_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USERNAME_ERROR,
	EMAIL_ERROR,
	PHONE_ERROR,
	PASSWORD_ERROR,
	PASSWORD_CONFIRM_ERROR,
	FIRSTNAME_ERROR,
	LASTNAME_ERROR,
	ADDRESS_ERROR,
	ZIPCODE_ERROR,
	COUNTRY_ERROR,
	CITY_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_LOADING:
			return {
				...state,
				loading: true
			};
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
				error: action.payload
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
			return { ...state, loading: false, error: action.payload };
		case USERNAME_ERROR:
			return { ...state, loading: false, usernameErr: action.payload };
		case EMAIL_ERROR:
			return { ...state, loading: false, emailErr: action.payload };
		case PHONE_ERROR:
			return { ...state, loading: false, phoneErr: action.payload };
		case PASSWORD_ERROR:
			return { ...state, loading: false, passwordErr: action.payload };
		case PASSWORD_CONFIRM_ERROR:
			return { ...state, loading: false, passwordConfirmErr: action.payload };
		case FIRSTNAME_ERROR:
			return { ...state, loading: false, firstnameErr: action.payload };
		case LASTNAME_ERROR:
			return { ...state, loading: false, lastnameErr: action.payload };
		case ADDRESS_ERROR:
			return { ...state, loading: false, addressErr: action.payload };
		case ZIPCODE_ERROR:
			return { ...state, loading: false, zipCodeErr: action.payload };
		case COUNTRY_ERROR:
			return { ...state, loading: false, countryErr: action.payload };
		case CITY_ERROR:
			return { ...state, loading: false, cityErr: action.payload };
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
				usernameErr: null,
				emailErr: null,
				phoneErr: null,
				passwordErr: null,
				passwordConfirmErr: null,
				firstnameErr: null,
				lastnameErr: null,
				addressErr: null,
				zipCodeErr: null,
				countryErr: null,
				cityErr: null
			};
		default:
			return state;
	}
};
