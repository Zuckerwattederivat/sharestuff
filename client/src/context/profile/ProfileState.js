import React, { useReducer } from 'react';
import axios from 'axios';
import ProfileContext from './profileContext';
import profileReducer from './profileReducer';

import {
	RESET_PROFILE_STATE,
	SET_TAB_LOCATION,
	SET_REDIRECT,
	SET_MODAL_ADD,
	SET_MODAL_EDIT,
	SET_MODAL_DELETE,
	SET_SUCCESS,
	SET_ERRORS,
	SET_LOADING
} from '../types';

// ProfileState
const ProfileState = props => {
	// initial state
	const initialState = {
		tabLocation: window.location.search.split('=')[1],
		redirect: false,
		modalEdit: false,
		modalAdd: false,
		modalDelete: false,
		offer: null,
		loading: false,
		success: false,
		errors: null
	};

	// geoCodeApiKey
	let geoCodeApiKey;
	// set geoCodeApiKey
	if (process.env.NODE_ENV !== 'production') {
		geoCodeApiKey = process.env.REACT_APP_GEOCODE_API_KEY;
	} else {
		geoCodeApiKey = process.env.GEOCODE_API_KEY;
	}

	// destructure reducer
	const [ state, dispatch ] = useReducer(profileReducer, initialState);

	// reset profile state
	const resetProfileState = () => dispatch({ type: RESET_PROFILE_STATE });

	// set loading
	const setLoading = bool => dispatch({ type: SET_LOADING, payload: bool });

	// set tab location
	const setTabLocation = tabLocation => {
		// reset profile state
		resetProfileState();
		// dispatch tab change
		dispatch({ type: SET_TAB_LOCATION, payload: tabLocation });
	};

	// set redirect
	const setRedirect = bool => dispatch({ type: SET_REDIRECT, payload: bool });

	// set modal
	const setModal = (action, bool, offer) => {
		switch (action) {
			case 'add':
				if (!offer) {
					dispatch({ type: SET_MODAL_ADD, payload: { modalOpen: bool, offer: null } });
				} else {
					dispatch({ type: SET_MODAL_ADD, payload: { modalOpen: bool, offer: offer } });
				}
				break;
			case 'edit':
				if (!offer) {
					dispatch({ type: SET_MODAL_EDIT, payload: { modalOpen: bool, offer: null } });
				} else {
					dispatch({ type: SET_MODAL_EDIT, payload: { modalOpen: bool, offer: offer } });
				}
				break;
			case 'delete':
				if (!offer) {
					dispatch({ type: SET_MODAL_DELETE, payload: { modalOpen: bool, offer: null } });
				} else {
					dispatch({ type: SET_MODAL_DELETE, payload: { modalOpen: bool, offer: offer } });
				}
				break;
		}
	};

	// delete offer
	const deleteOffer = () => {
		setLoading(true);
		setTimeout(() => {
			dispatch({ type: SET_SUCCESS });
		}, 1000);
	};

	return (
		<ProfileContext.Provider
			value={{
				tabLocation: state.tabLocation,
				redirect: state.redirect,
				modalAdd: state.modalAdd,
				modalEdit: state.modalEdit,
				modalDelete: state.modalDelete,
				loading: state.loading,
				success: state.success,
				resetProfileState,
				setTabLocation,
				setRedirect,
				setModal,
				deleteOffer
			}}
		>
			{props.children}
		</ProfileContext.Provider>
	);
};

export default ProfileState;
