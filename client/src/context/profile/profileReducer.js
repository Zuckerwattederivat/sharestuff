import {
	RESET_PROFILE_STATE,
	SET_TAB_LOCATION,
	SET_CATEGORIES,
	SET_REDIRECT,
	SET_MODAL_ADD,
	SET_MODAL_EDIT,
	SET_MODAL_DELETE,
	SET_SUCCESS,
	SET_ERRORS,
	SET_LOADING
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_TAB_LOCATION:
			return {
				...state,
				tabLocation: action.payload
			};
		case SET_CATEGORIES:
			return {
				...state,
				categories: action.payload
			};
		case SET_REDIRECT:
			return {
				...state,
				redirect: action.payload
			};
		case SET_MODAL_ADD:
			return {
				...state,
				modalAdd: action.payload.modalOpen,
				loading: false,
				success: false
			};
		case SET_MODAL_EDIT:
			return {
				...state,
				offer: action.payload.offer,
				modalEdit: action.payload.modalOpen,
				loading: false,
				success: false
			};
		case SET_MODAL_DELETE:
			return {
				...state,
				offer: action.payload.offer,
				modalDelete: action.payload.modalOpen,
				loading: false,
				success: false
			};
		case SET_LOADING: {
			return { ...state, loading: action.payload };
		}
		case SET_SUCCESS:
			return {
				...state,
				success: true,
				loading: false,
				errors: null
			};
		case RESET_PROFILE_STATE:
			return {
				...state,
				tabLocation: window.location.search.split('=')[1],
				redirect: false,
				modalAdd: false,
				modalEdit: false,
				modalDelete: false,
				offer: null,
				loading: false,
				success: false
			};
		default:
			return state;
	}
};
