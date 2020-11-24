import { SET_CATEGORIES, SET_OFFERS, SET_ALL, SET_LOADING } from '../types';

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
				offers: action.payload.offers,
				loading: false
			};
		case SET_LOADING:
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};
