import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import { SET_LOADING, USER_LOADED, AUTH_ERROR, REGISTER_SUCCESS, SET_ERROR, CLEAR_ERRORS } from '../types';

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

	// set errors
	const setState = (type, payload) => dispatch({ type: type, payload: payload });

	// check for duplicate user
	const checkForDuplicateUser = async (username = '', email = '', type = null, payload = null) => {
		const setLoading = bool => {
			setState(SET_LOADING, bool);
			return new Promise(resolve => resolve(true));
		};
		const loading = await setLoading(true);
		if (loading) {
			try {
				const res = await axios.get('/api/users', { params: { username: username, email: email } });
				if (!res.data.msg) {
					setState(type, payload);
				} else {
					await setLoading(false);
				}
			} catch (err) {
				setState(SET_ERROR, `Server Error: ${err.response.status}`);
			}
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
				checkForDuplicateUser,
				clearErrors
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
