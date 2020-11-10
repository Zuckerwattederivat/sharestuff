import {
	SERVER_ERROR,
	INPUT_AUTH,
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
	SET_COUNTRY_AUTO,
	SET_COUNTRY_LABEL,
	CLEAR_INPUT_ERRORS
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case INPUT_AUTH:
			return { ...state, inputAuth: action.payload };
		case SERVER_ERROR:
			return { ...state, inputError: action.payload };
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
		case SET_COUNTRY_AUTO:
			return { ...state, countryAuto: action.payload };
		case SET_COUNTRY_LABEL:
			return { ...state, countryLabel: action.payload };
		case CITY_ERROR:
			return { ...state, cityErr: action.payload };
		case CLEAR_INPUT_ERRORS:
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
