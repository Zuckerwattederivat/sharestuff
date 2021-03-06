// Node Modules
import React, { useReducer } from 'react';
import axios from 'axios';
// Context
import AuthValidationContext from './authValidationContext';
import authCalidationReducer from './authValidationReducer';
// Types
import {
	REGISTER,
	LOGIN,
	INPUT_AUTH,
	SERVER_ERROR,
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
	CLEAR_INPUT_ERRORS
} from '../types';

// AuthValidationState Component
const AuthValidationState = props => {
	const initialState = {
		login: false,
		register: false,
		inputAuth: false,
		serverError: null,
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

	const [ state, dispatch ] = useReducer(authCalidationReducer, initialState);

	// clear errors
	const clearInputErrors = () => dispatch({ type: CLEAR_INPUT_ERRORS });

	// set state
	const setInputState = (type, payload) => dispatch({ type: type, payload: payload });

	// check for condition
	const checkForOneCond = (input, condition, type, errMsg) => {
		if (input === condition) {
			setInputState(type, errMsg);
			return Promise.resolve(false);
		} else {
			return Promise.resolve(true);
		}
	};

	// check username
	const checkUsername = (input1, input2, input3) => {
		if (input1 === 'Username found' || input2) {
			setInputState(USERNAME_ERROR, 'Username is already taken');
			return Promise.resolve(false);
		} else if (input3 === '') {
			setInputState(USERNAME_ERROR, 'Choose a username');
			return Promise.resolve(false);
		} else if (input3.length > 18) {
			setInputState(USERNAME_ERROR, 'Username can not be longer than 15 characters');
			return Promise.resolve(false);
		} else {
			return Promise.resolve(true);
		}
	};

	// check email & email exists
	const checkEmail = (input1, input2, input3) => {
		if (input1 === 'Email found' || input2) {
			setInputState(EMAIL_ERROR, 'Email already exists');
			return Promise.resolve(false);
		} else if (!input3.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
			setInputState(EMAIL_ERROR, 'Enter a valid email address');
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
				setInputState(PASSWORD_ERROR, 'Passwords do not match');
				setInputState(PASSWORD_CONFIRM_ERROR, 'Passwords do not match');
				return Promise.resolve(false);
			} else if (input1.length < 6 || input2.length < 6) {
				setInputState(PASSWORD_ERROR, 'Password must be at least 6 characters long');
				setInputState(PASSWORD_CONFIRM_ERROR, 'Password must be at least 6 characters long');
				return Promise.resolve(false);
			} else if (input1.length > 30 || input2.length > 30) {
				setInputState(PASSWORD_ERROR, 'Password can not be longer than 30 characters');
				setInputState(PASSWORD_CONFIRM_ERROR, 'Password can not be longer than 30 characters');
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
		// validate for register form
		setInputState(REGISTER, true);

		// destructure input
		const { username, email, password, passwordConfirm } = input;

		try {
			// check username against db entries
			const res = await axios.get('/api/users/check', { params: { username: username, email: email } });
			if (res) {
				// validate form
				const usernameValidated = await checkUsername(res.data.msg, res.data.msg2, username);
				const emailValidated = await checkEmail(res.data.msg, res.data.msg1, email);
				const passwordsValidated = await checkPasswords(password, passwordConfirm);
				// set loading
				if (usernameValidated && emailValidated && passwordsValidated) {
					setInputState(INPUT_AUTH, true);
				}
			}
		} catch (err) {
			setInputState(SERVER_ERROR, err.response.data.msg);
		}
	};

	// validate personal data
	const validatePersonalData = async input => {
		// validate for register form
		setInputState(REGISTER, true);

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
			setInputState(INPUT_AUTH, true);
		}
	};
	// validate login data
	const validateLoginData = async input => {
		// validate for login form
		setInputState(LOGIN, true);

		// destructure input
		const { email, password } = input;

		// validate form
		const emailValidated = await checkEmail(null, null, email);
		const passwordValidated = await checkForOneCond(password, '', PASSWORD_ERROR, 'Enter your password');

		// set loading
		if (emailValidated && passwordValidated) {
			setInputState(INPUT_AUTH, true);
		}
	};

	return (
		<AuthValidationContext.Provider
			value={{
				register: state.register,
				login: state.login,
				inputAuth: state.inputAuth,
				serverError: state.inputError,
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
				setInputState,
				clearInputErrors,
				validateUserData,
				validatePersonalData,
				validateLoginData
			}}
		>
			{props.children}
		</AuthValidationContext.Provider>
	);
};

// export AUthValidationState COmponent
export default AuthValidationState;
