import { SET_CATEGORY, SET_OFFER, SET_PRODUCT, SET_LOCATION, CLEAR_SEARCH } from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_CATEGORY:
			return { ...state, category: action.payload };
		case SET_OFFER:
			return { ...state, offer: action.payload };
		case SET_PRODUCT:
			return { ...state, product: action.payload };
		case SET_LOCATION:
			return { ...state, location: action.payload };
		case CLEAR_SEARCH:
			return {
				category: null,
				offer: null,
				product: null,
				location: null
			};
		default:
			return state;
	}
};
