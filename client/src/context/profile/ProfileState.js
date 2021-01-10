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
		serverErrors: null
	};

	// destructure reducer
	const [ state, dispatch ] = useReducer(profileReducer, initialState);

	// reset profile state
	const resetProfileState = () => dispatch({ type: RESET_PROFILE_STATE });

	// set loading
	const setLoading = bool => dispatch({ type: SET_LOADING, payload: bool });

	// reset errors
	const resetErrors = () => {
		dispatch({ type: SET_ERRORS, payload: false });
	};

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
			default:
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
		// set loading
		setLoading(true);

		// config
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		};

		// create formData
		let formData = new FormData();
		// append data
		for (let i = 0; i < Object.keys(dataObj.images).length; i++) {
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

		try {
			// send data
			const res = await axios.post('/api/offers/create', formData, config);
			// set state success
			dispatch({ type: SET_SUCCESS, payload: res.data.msg });
			// set state errors
		} catch (err) {
			if (err.response.data.msg) {
				dispatch({ type: SET_ERRORS, payload: [ { msg: err.response.data.msg } ] });
			} else {
				dispatch({ type: SET_ERRORS, payload: err.response.data.errors });
			}
		}
	};

	// delete offer
	const deleteOffer = async () => {
		// set loading
		setLoading(true);

		try {
			// delete offer
			const res = await axios.delete('/api/offers/delete', { params: { id: state.offer._id } });
			// set state success
			dispatch({ type: SET_SUCCESS, payload: res.data.msg });
			// set sate errors
		} catch (err) {
			dispatch({ type: SET_ERRORS, payload: [ { msg: err.response.data.msg } ] });
		}
	};

	// edit offer
	const editOffer = async dataObj => {
		// set loading
		setLoading(true);

		// config
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		};

		// create formData
		let formData = new FormData();
		// append data
		for (let i = 0; i < Object.keys(dataObj.images).length; i++) {
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
		formData.append('id', dataObj.id);
		formData.append('title', dataObj.title);
		formData.append('product', dataObj.product);
		formData.append('categoryId', dataObj.categoryId);
		formData.append('price', dataObj.price);
		formData.append('currency', dataObj.currency);
		formData.append('location', JSON.stringify(dataObj.location));
		formData.append('tags', JSON.stringify(dataObj.tags));
		formData.append('imagesOld', JSON.stringify(dataObj.imagesOld));
		formData.append('imagesThumbOld', JSON.stringify(dataObj.imagesThumbOld));
		formData.append('description', dataObj.description);

		try {
			// send data
			const res = await axios.put('/api/offers/edit', formData, config);
			// set state success
			dispatch({ type: SET_SUCCESS, payload: res.data.msg });
			// set state errors
		} catch (err) {
			if (err.response.data.msg) {
				dispatch({ type: SET_ERRORS, payload: [ { msg: err.response.data.msg } ] });
			} else {
				dispatch({ type: SET_ERRORS, payload: err.response.data.errors });
			}
		}
	};

	return (
		<ProfileContext.Provider
			value={{
				tabLocation: state.tabLocation,
				categories: state.categories,
				offer: state.offer,
				redirect: state.redirect,
				modalAdd: state.modalAdd,
				modalEdit: state.modalEdit,
				modalDelete: state.modalDelete,
				loading: state.loading,
				success: state.success,
				serverErrors: state.serverErrors,
				resetProfileState,
				setTabLocation,
				setRedirect,
				setCategories,
				setModal,
				addOffer,
				resetErrors,
				deleteOffer,
				editOffer
			}}
		>
			{props.children}
		</ProfileContext.Provider>
	);
};

export default ProfileState;
