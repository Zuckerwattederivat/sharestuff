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
	SET_COUNTRY_AUTO
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
		countryAuto: undefined,
		cityErr: null
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
	const login = () => console.log('login user');

	// logout
	const logout = () => console.log('logout user');

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
			dispatch({ type: SET_ERROR, payload: err.response.data.msg });
		}
	};

	// set state
	const setState = (type, payload) => dispatch({ type: type, payload: payload });

	// validate user data
	const validateUserData = async input => {
		// destructure input
		const { username, email, password, passwordConfirm } = input;

		try {
			// check username against db entries
			const res = await axios.get('/server/users', { params: { username: username, email: email } });
			if (res) {
				// validate username
				if (res.data.msg2 || res.data.msg === 'Username found') {
					setState(USERNAME_ERROR, 'Username is already taken');
				} else if (username === '') {
					setState(USERNAME_ERROR, 'Please choose a username');
				}
				// validate email
				if (res.data.msg1 || res.data.msg === 'Email found') {
					setState(EMAIL_ERROR, 'Email already exists');
				} else if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
					setState(EMAIL_ERROR, 'Please enter a valid email address');
				}
				// validate passwords
				if (password === '') {
					setState(PASSWORD_ERROR, 'Please choose a password');
				}
				if (passwordConfirm === '') {
					setState(PASSWORD_CONFIRM_ERROR, 'Please confirm your password');
				} else if (password !== passwordConfirm) {
					setState(PASSWORD_ERROR, 'Passwords do not match');
					setState(PASSWORD_CONFIRM_ERROR, 'Passwords do not match');
				} else if (password.length < 6 || passwordConfirm.length < 6) {
					setState(PASSWORD_ERROR, 'Password must be at least 6 characters long');
					setState(PASSWORD_CONFIRM_ERROR, 'Password must be at least 6 characters long');
				}
				// set loading
				setState(SET_LOADING, false);
			}
		} catch (err) {
			setState(SET_ERROR, err);
		}
	};

	// validate personal data
	const validatePersonalData = async input => {
		// destructure input
		const { countryAuto, firstname, lastname, phone, address, zipCode } = input;

		// validation functions
		const validateFirstname = input => {
			if (input === '') {
				setState(FIRSTNAME_ERROR, 'Please enter your first name');
			} else {
				return Promise.resolve(true);
			}
		};
		const validateLastname = input => {
			if (input === '') {
				setState(LASTNAME_ERROR, 'Please enter your last name');
			} else {
				return Promise.resolve(true);
			}
		};
		const validateCountry = input => {
			if (!input) {
				setState(COUNTRY_ERROR, 'Enter country');
			} else {
				return Promise.resolve(true);
			}
		};
		const validatePhone = input => {
			if (input === '') {
				setState(PHONE_ERROR, 'Please enter your phone number');
			} else {
				return Promise.resolve(true);
			}
		};
		const validateAddress = input => {
			if (input === '') {
				setState(ADDRESS_ERROR, 'Please enter your address');
			} else {
				return Promise.resolve(true);
			}
		};
		const validateZipCode = input => {
			if (input === '') {
				setState(ZIPCODE_ERROR, 'Enter Zip');
			} else {
				return Promise.resolve(true);
			}
		};

		// validate form
		const firstnameValidated = await validateFirstname(firstname);
		const lastnameValidated = await validateLastname(lastname);
		const countryValidated = await validateCountry(countryAuto);
		const phoneValidated = await validatePhone(phone);
		const addressValidated = await validateAddress(address);
		const zipCodeValidated = await validateZipCode(zipCode);

		// set loading
		if (
			firstnameValidated &&
			lastnameValidated &&
			countryValidated &&
			phoneValidated &&
			addressValidated &&
			zipCodeValidated
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
