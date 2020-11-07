import {
	SET_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	REGISTER_SUCCESS,
	SET_ERROR,
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
				loading: action.payload
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
		case SET_ERROR:
			return { ...state, error: action.payload };
		case USERNAME_ERROR:
			return { ...state, usernameErr: action.payload };
		case EMAIL_ERROR:
			return { ...state, emailErr: action.payload };
		case PHONE_ERROR:
			return { ...state, phoneErr: action.payload };
		case PASSWORD_ERROR:
			return { ...state, passwordErr: action.payload };
		case PASSWORD_CONFIRM_ERROR:
			return { ...state, passwordConfirmErr: action.payload };
		case FIRSTNAME_ERROR:
			return { ...state, firstnameErr: action.payload };
		case LASTNAME_ERROR:
			return { ...state, lastnameErr: action.payload };
		case ADDRESS_ERROR:
			return { ...state, addressErr: action.payload };
		case ZIPCODE_ERROR:
			return { ...state, zipCodeErr: action.payload };
		case COUNTRY_ERROR:
			return { ...state, countryErr: action.payload };
		case CITY_ERROR:
			return { ...state, cityErr: action.payload };
		case CLEAR_ERRORS:
			return {
				...state,
				loading: true,
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
