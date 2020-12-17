import { RESET_PROFILE_STATE, SET_TAB_LOCATION, SET_REDIRECT, SET_MODAL } from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_TAB_LOCATION:
			return {
				...state,
				tabLocation: action.payload
			};
		case SET_REDIRECT:
			return {
				...state,
				redirect: action.payload
			};
		case SET_MODAL:
			return {
				...state,
				modalOpen: action.payload.modalOpen,
				offer: action.payload.offer,
				action: action.payload.action
			};
		case RESET_PROFILE_STATE:
			return {
				...state,
				tabLocation: window.location.search.split('=')[1],
				redirect: false,
				modalOpen: false,
				offer: null
			};
		default:
			return state;
	}
};
