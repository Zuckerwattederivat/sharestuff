import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT, REMOVE_ALL_ALERTS } from '../types';

const AlertState = props => {
	const initialState = [];

	const [ state, dispatch ] = useReducer(alertReducer, initialState);

	// set alert
	const setAlert = (msg, type, timeout = 3000) => {
		const id = uuidv4();
		dispatch({ type: SET_ALERT, payload: { msg, type, id } });
		if (timeout !== 'unlimited') {
			setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
		}
	};

	// remove all alert
	const removeAllAlerts = () => {
		dispatch({ type: REMOVE_ALL_ALERTS });
	};

	return (
		<AlertContext.Provider
			value={{
				alerts: state,
				setAlert,
				removeAllAlerts
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;
