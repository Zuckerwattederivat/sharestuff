import { SET_CATEGORIES, SET_OFFERS, SET_ALL, SET_LOADING, CLEAR_ALL } from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_CATEGORIES:
			return {
				...state,
				categories: action.payload,
				loading: false
			};
		case SET_OFFERS:
			return {
				...state,
				offers: action.payload,
				loading: false
			};
		case SET_ALL:
			return {
				categories: action.payload.categories,
				category: action.payload.category,
				offers: action.payload.offers,
				offer: action.payload.offer,
				loading: false
			};
		case SET_LOADING:
			return { ...state, loading: action.payload };
		case CLEAR_ALL:
			return {
				categories: null,
				offers: null,
				loading: true
			};
		default:
			return state;
	}
};
