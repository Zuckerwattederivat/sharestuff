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
	PASSWORD_CONFIRM_ERROR
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
			const res = await axios.get('/api/auth');
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
			const res = await axios.post('/api/users', formData, config);
			dispatch({ type: REGISTER_SUCCESS, payload: res.data });
			loadUser();
		} catch (err) {
			dispatch({ type: SET_ERROR, payload: err.response.data.msg });
		}
	};

	// set state
	const setState = (type, payload) => dispatch({ type: type, payload: payload });

	// validate input
	const validateUserData = async input => {
		// destructure input
		const { username, email, password, passwordConfirm } = input;

		try {
			// check username against db entries
			const res = await axios.get('/api/users', { params: { username: username, email: email } });
			if (res) {
				// validate username
				if (res.data.msg2 || res.data.msg === 'Username found') {
					setState(USERNAME_ERROR, 'Username already taken');
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
				cityErr: state.cityErr,
				loadUser,
				register,
				login,
				logout,
				setState,
				clearErrors,
				validateUserData
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
