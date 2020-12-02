import { SET_CATEGORIES, SET_CATEGORY, SET_OFFERS, SET_ALL, SET_LOADING, CLEAR_ALL, OFFER_ERROR } from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_CATEGORIES:
			return {
				...state,
				categories: action.payload
			};
		case SET_CATEGORY:
			return {
				...state,
				category: action.payload
			};
		case SET_OFFERS:
			return {
				...state,
				offers: action.payload,
				loading: false
			};
		case SET_ALL:
			return {
				...state,
				categories: action.payload.categories,
				category: action.payload.category,
				offers: action.payload.offers,
				offer: action.payload.offer,
				loading: false
			};
		case SET_LOADING:
			return { ...state, loading: action.payload };
		case OFFER_ERROR:
			return {
				...state,
				loading: false,
				errors: action.payload
			};
		case CLEAR_ALL:
			return {
				...state,
				loading: true,
				errors: null,
				category: [],
				offers: [],
				offer: []
			};
		default:
			return state;
	}
};
