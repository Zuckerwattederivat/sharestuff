import { RESET_PROFILE_STATE, SET_TAB_LOCATION, REDIRECT, SET_REDIRECT } from '../types';

export default (state, action) => {
	switch (action.type) {
		case RESET_PROFILE_STATE:
			return {
				...state,
				tabLocation: window.location.search.split('=')[1],
				redirect: false,
				modalOpen: false
			};
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
		default:
			return state;
	}
};
