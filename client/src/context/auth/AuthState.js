import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
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

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		user: null,
		loading: true,
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
			dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
		}
	};

	// check for duplicate user
	const checkForDuplicateUser = async (username, email) => {
		// let errors = { ...initialState.error };
		// try {
		// 	let res = await axios.get('/api/users', { params: { username: username, email: email } });
		// 	if (res.data.user.username) {
		// 		errors.usernameErr = 'Username is already taken';
		// 		dispatch({ tyoe: SET_REGISTER_ERRORS, payload: errors });
		// 	}
		// 	if (res.data.user.email) {
		// 		console.log(res.data.email);
		// 		errors.emailErr = 'Email is already taken';
		// 		dispatch({ tyoe: SET_REGISTER_ERRORS, payload: errors });
		// 	}
		// } catch (err) {
		// 	console.log(err);
		// }
	};

	// login user
	const login = () => console.log('login user');

	// logout
	const logout = () => console.log('logout user');

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				user: state.user,
				loading: state.loading,
				error: state.error,
				loadUser,
				register,
				login,
				logout,
				checkForDuplicateUser,
				clearErrors
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
