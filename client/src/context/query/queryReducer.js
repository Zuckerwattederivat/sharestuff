import {
	SET_CATEGORIES,
	SET_CATEGORY,
	SET_OFFERS,
	SET_ALL,
	SET_LOADING,
	CLEAR_ALL,
	OFFER_ERROR,
	SET_PAGE,
	SET_PAGE_COUNT,
	SET_OFFERS_PAGINATED
} from '../types';

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
				offers: action.payload
			};
		case SET_OFFERS_PAGINATED:
			return {
				...state,
				offersPaginated: action.payload,
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
				offersPaginated: [],
				offer: [],
				page: 1,
				pageCount: 1
			};
		case SET_PAGE:
			return { ...state, page: action.payload };
		case SET_PAGE_COUNT:
			return { ...state, pageCount: action.payload };
		default:
			return state;
	}
};
