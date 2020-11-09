import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
	SET_LOADING,
	USER_LOADED,
	AUTH_ERROR,
	REGISTER_SUCCESS,
	SET_ERROR,
	CLEAR_ERRORS,
	USERNAME_ERROR,
	EMAIL_ERROR,
	PASSWORD_ERROR,
	PASSWORD_CONFIRM_ERROR,
	FIRSTNAME_ERROR,
	LASTNAME_ERROR,
	COUNTRY_ERROR,
	PHONE_ERROR,
	ZIPCODE_ERROR,
	ADDRESS_ERROR,
	CITY_ERROR,
	LOGOUT
} from '../types';

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		user: null,
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
		cityErr: null,
		countryAuto: null,
		countryLabel: null
	};

	const [ state, dispatch ] = useReducer(authReducer, initialState);

	// clear errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

	// load user
	const loadUser = async () => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		try {
			const res = await axios.get('/server/auth');
			dispatch({ type: USER_LOADED, payload: res.data });
		} catch (err) {
			dispatch({ type: AUTH_ERROR });
		}
	};

	// login user
	const login = () => async formData => {
		// const config = {
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	}
		// };
		// try {
		// 	const res = await axios.post('/server/users', formData, config);
		// 	dispatch({ type: REGISTER_SUCCESS, payload: res.data });
		// 	loadUser();
		// } catch (err) {
		// 	if (err.response.data.msg) {
		// 		dispatch({ type: SET_ERROR, payload: err.response.data.msg });
		// 	} else {
		// 		dispatch({ type: SET_ERROR, payload: err.response.data });
		// 	}
		// }
	};

	// logout
	const logout = () => {
		localStorage.removeItem('token');
		dispatch({ type: LOGOUT });
	};

	// register user
	const register = async formData => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const res = await axios.post('/server/users', formData, config);
			dispatch({ type: REGISTER_SUCCESS, payload: res.data });
			loadUser();
		} catch (err) {
			if (err.response.data.msg) {
				dispatch({ type: SET_ERROR, payload: err.response.data.msg });
			} else {
				dispatch({ type: SET_ERROR, payload: err.response.data });
			}
		}
	};

	// set state
	const setState = (type, payload) => dispatch({ type: type, payload: payload });

	// check for condition
	const checkForOneCond = (input, condition, type, errMsg) => {
		if (input === condition) {
			setState(type, errMsg);
			return Promise.resolve(false);
		} else {
			return Promise.resolve(true);
		}
	};

	// check username
	const checkUsername = (input1, input2, input3) => {
		if (input1 === 'Username found' || input2) {
			setState(USERNAME_ERROR, 'Username is already taken');
			return Promise.resolve(false);
		} else if (input3 === '') {
			setState(USERNAME_ERROR, 'Choose a username');
			return Promise.resolve(false);
		} else {
			return Promise.resolve(true);
		}
	};

	// check email
	const checkEmail = (input1, input2, input3) => {
		if (input1 === 'Email found' || input2) {
			setState(EMAIL_ERROR, 'Email already exists');
			return Promise.resolve(false);
		} else if (!input3.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
			setState(EMAIL_ERROR, 'Enter your email address');
			return Promise.resolve(false);
		} else {
			return Promise.resolve(true);
		}
	};

	// ckeck password
	const checkPasswords = async (input1, input2) => {
		const passwordNotEmpty = await checkForOneCond(input1, '', PASSWORD_ERROR, 'Choose a password');
		const passwordConfirmNotEmpty = await checkForOneCond(input2, '', PASSWORD_CONFIRM_ERROR, 'Confirm your password');
		if (passwordNotEmpty && passwordConfirmNotEmpty) {
			if (input1 !== input2) {
				setState(PASSWORD_ERROR, 'Passwords do not match');
				setState(PASSWORD_CONFIRM_ERROR, 'Passwords do not match');
				return Promise.resolve(false);
			} else if (input1.length < 6 || input2.length < 6) {
				setState(PASSWORD_ERROR, 'Password must be at least 6 characters long');
				setState(PASSWORD_CONFIRM_ERROR, 'Password must be at least 6 characters long');
				return Promise.resolve(false);
			} else {
				return Promise.resolve(true);
			}
		} else {
			return Promise.resolve(false);
		}
	};

	// validate user data
	const validateUserData = async input => {
		// destructure input
		const { username, email, password, passwordConfirm } = input;

		try {
			// check username against db entries
			const res = await axios.get('/server/users', { params: { username: username, email: email } });
			if (res) {
				// validate form
				const usernameValidated = await checkUsername(res.data.msg, res.data.msg2, username);
				const emailValidated = await checkEmail(res.data.msg, res.data.msg1, email);
				const passwordsValidated = await checkPasswords(password, passwordConfirm);
				// set loading
				if (usernameValidated && emailValidated && passwordsValidated) {
					setState(SET_LOADING, false);
				}
			}
		} catch (err) {
			setState(SET_ERROR, err);
		}
	};

	// validate personal data
	const validatePersonalData = async input => {
		// destructure input
		const { countryAuto, firstname, lastname, phone, address, zipCode, city } = input;

		// validate form
		const firstnameValidated = await checkForOneCond(firstname, '', FIRSTNAME_ERROR, 'Enter your first name');
		const lastnameValidated = await checkForOneCond(lastname, '', LASTNAME_ERROR, 'Enter your last name');
		const countryValidated = await checkForOneCond(countryAuto, null, COUNTRY_ERROR, 'Enter country');
		const phoneValidated = await checkForOneCond(phone, '', PHONE_ERROR, 'Enter your phone number');
		const addressValidated = await checkForOneCond(address, '', ADDRESS_ERROR, 'Enter your address');
		const zipCodeValidated = await checkForOneCond(zipCode, '', ZIPCODE_ERROR, 'Enter zip');
		const cityValidated = await checkForOneCond(city, '', CITY_ERROR, 'Enter city');

		// set loading
		if (
			firstnameValidated &&
			lastnameValidated &&
			countryValidated &&
			phoneValidated &&
			addressValidated &&
			zipCodeValidated &&
			cityValidated
		) {
			setState(SET_LOADING, false);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				user: state.user,
				loading: state.loading,
				error: state.error,
				usernameErr: state.usernameErr,
				emailErr: state.emailErr,
				phoneErr: state.phoneErr,
				passwordErr: state.passwordErr,
				passwordConfirmErr: state.passwordConfirmErr,
				firstnameErr: state.firstnameErr,
				lastnameErr: state.lastnameErr,
				addressErr: state.addressErr,
				zipCodeErr: state.zipCodeErr,
				countryErr: state.countryErr,
				countryAuto: state.countryAuto,
				countryLabel: state.countryLabel,
				cityErr: state.cityErr,
				loadUser,
				register,
				login,
				logout,
				setState,
				clearErrors,
				validateUserData,
				validatePersonalData
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
