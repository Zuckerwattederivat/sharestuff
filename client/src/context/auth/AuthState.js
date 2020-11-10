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
	CLEAR_ERRORS,
	SET_LOADING
} from '../types';

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		user: null,
		loading: true,
		error: null
	};

	const [ state, dispatch ] = useReducer(authReducer, initialState);

	// clear errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
	// set state
	const setAuthState = (type, payload) => dispatch({ type: type, payload: payload });

	// load user
	const loadUser = async () => {
		dispatch({ type: SET_LOADING, payload: true });

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

	// register user
	const register = async formData => {
		dispatch({ type: SET_LOADING, payload: true });

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
				dispatch({ type: REGISTER_FAIL, payload: [ { msg: err.response.data.msg } ] });
			} else {
				dispatch({ type: REGISTER_FAIL, payload: err.response.data.errors });
			}
		}
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
				clearErrors,
				setAuthState,
				loadUser,
				register,
				login,
				logout
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
