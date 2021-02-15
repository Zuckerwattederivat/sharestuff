import {
	SET_CATEGORIES,
	SET_CATEGORY,
	SET_OFFERS,
	SET_OFFER,
	SET_CREATOR,
	SET_ALL,
	SET_LOADING,
	CLEAR_ALL,
	OFFER_ERROR,
	SET_PAGE,
	SET_PAGE_COUNT,
	SET_OFFERS_PAGINATED,
	SET_BOOKINGS,
	SEARCH_CACHED,
	BOOKING_LOADING,
	BOOKING_ERROR,
	OFFER_BOOKED
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
		case SET_OFFER:
			return {
				...state,
				offer: action.payload,
				loading: false
			};
		case SET_CREATOR:
			return {
				...state,
				creator: action.payload,
				loading: false
			};
		case SET_OFFERS_PAGINATED:
			return {
				...state,
				offersPaginated: action.payload,
				loading: false
			};
		case SET_BOOKINGS:
			return {
				...state,
				bookings: {
					bookedFromUser: action.payload.bookedFromUser.msg ? null : action.payload.bookedFromUser,
					boookedByUser: action.payload.bookedByUser.msg ? null : action.payload.bookedByUser
				}
			};
		case SET_ALL:
			return {
				...state,
				categories: action.payload.categories ? action.payload.categories : [],
				category: action.payload.category ? action.payload.category : [],
				offers: action.payload.offers ? action.payload.offers : [],
				offer: action.payload.offer ? action.payload.offer : null,
				creator: action.payload.creator ? action.payload.creator : [],
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
		case BOOKING_LOADING:
			return { ...state, bookingLoading: action.payload };
		case BOOKING_ERROR:
			return {
				...state,
				bookedFromUserError: action.payload.bookedFromUserError,
				bookedByUserError: action.payload.bookedByUserError,
				bookingLoading: false
			};
		case OFFER_BOOKED:
			return { ...state, offerBooked: true, bookingLoading: false };
		case CLEAR_ALL:
			return {
				...state,
				loading: true,
				bookingLoading: true,
				bookedFromUserError: null,
				bookedByUserError: null,
				bookings: {
					bookedFromUser: null,
					bookedByUser: null
				},
				offerBooked: false,
				errors: null,
				category: [],
				offers: [],
				offersPaginated: [],
				offer: null,
				creator: [],
				page: 1,
				pageCount: 1
			};
		case SET_PAGE:
			return { ...state, page: action.payload };
		case SET_PAGE_COUNT:
			return { ...state, pageCount: action.payload };
		case SEARCH_CACHED:
			return { ...state, searchCached: action.payload };
		default:
			return state;
	}
};
