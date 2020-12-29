import React, { useReducer } from 'react';
import axios from 'axios';
import ProfileContext from './profileContext';
import profileReducer from './profileReducer';
import utils from '../../utils/helpers';

import {
	RESET_PROFILE_STATE,
	SET_TAB_LOCATION,
	SET_REDIRECT,
	SET_MODAL_ADD,
	SET_MODAL_EDIT,
	SET_MODAL_DELETE,
	SET_SUCCESS,
	SET_ERRORS,
	SET_LOADING,
	SET_CATEGORIES
} from '../types';
import { forEach } from 'lodash';

// ProfileState
const ProfileState = props => {
	// initial state
	const initialState = {
		tabLocation: window.location.search.split('=')[1],
		categories: [],
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

	// set categories
	const setCategories = async () => {
		try {
			const categories = await axios.get('/api/categories/get');
			if (categories) {
				dispatch({ type: SET_CATEGORIES, payload: categories.data });
			} else {
				dispatch({ type: SET_CATEGORIES, payload: categories.data.msg });
			}
		} catch (error) {
			dispatch({ type: SET_CATEGORIES, payload: error.data.msg });
		}
	};

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

	// add offer
	const addOffer = async dataObj => {
		// create formData
		let formData = new FormData();
		// append data
		for (let i = 0; i < Object.keys(dataObj.images).length; i++) {
			console.log('convert...');
			const imageUrl = dataObj.images[i];
			// Split the base64 string in data and contentType
			const block = imageUrl.split(';');
			// Get the content type of the image
			const contentType = block[0].split(':')[1];
			// get the real base64 content of the file
			const realData = block[1].split(',')[1];
			// Convert it to a blob to upload
			const blob = utils.b64ToBlob(realData, contentType);
			// convert blob to file
			const file = new File([ blob ], `image-${1}`, { type: contentType, lastModified: Date.now() });
			formData.append('images', file);
		}
		formData.append('title', dataObj.title);
		formData.append('product', dataObj.product);
		formData.append('categoryId', dataObj.categoryId);
		formData.append('price', dataObj.price);
		formData.append('currency', dataObj.currency);
		formData.append('location', JSON.stringify(dataObj.location));
		formData.append('tags', JSON.stringify(dataObj.tags));
		formData.append('description', dataObj.description);

		// set loading
		setLoading(true);

		try {
			// config
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			};

			// send data
			const res = await axios.post('/api/offers/create', formData, config);
		} catch (error) {
			console.log(error.response);
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
				categories: state.categories,
				redirect: state.redirect,
				modalAdd: state.modalAdd,
				modalEdit: state.modalEdit,
				modalDelete: state.modalDelete,
				loading: state.loading,
				success: state.success,
				resetProfileState,
				setTabLocation,
				setRedirect,
				setCategories,
				setModal,
				addOffer,
				deleteOffer
			}}
		>
			{props.children}
		</ProfileContext.Provider>
	);
};

export default ProfileState;
