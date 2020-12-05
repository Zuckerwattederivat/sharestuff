import React, { useReducer } from 'react';
import axios from 'axios';
import QueryContext from '../query/queryContext';
import queryReducer from '../query/queryReducer';
import {
	CLEAR_ALL,
	SET_LOADING,
	SET_CATEGORIES,
	SET_CATEGORY,
	SET_OFFERS,
	SET_OFFER,
	SET_OFFERS_PAGINATED,
	OFFER_ERROR,
	SET_PAGE,
	SET_PAGE_COUNT,
	SEARCH_CACHED
} from '../types';

// QueryState
const QueryState = props => {
	// initial state
	const initialState = {
		errors: null,
		loading: true,
		categories: [],
		category: [],
		offers: [],
		offersPaginated: [],
		offer: null,
		page: 1,
		pageCount: 1,
		searchCached: ''
	};

	// geoCodeApiKey
	let geoCodeApiKey;
	// set geoCodeApiKey
	if (process.env.NODE_ENV !== 'production') {
		geoCodeApiKey = process.env.REACT_APP_GEOCODE_API_KEY;
	} else {
		geoCodeApiKey = process.env.GEOCODE_API_KEY;
	}

	// destructure reducer
	const [ state, dispatch ] = useReducer(queryReducer, initialState);

	// set state
	const setQueryState = (type, payload) => dispatch({ type: type, payload: payload });

	// get catgeories with params
	const getCategories = async paramsObj => await axios.get('/api/categories/get', { params: paramsObj });

	// search offers
	const searchOffers = async paramsObj => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		return await axios.post('/api/offers/search', paramsObj, config);
	};

	// search offer
	const searchOffer = async offerId => await axios.get('/api/offers/get', { params: { id: offerId } });

	// clear query state
	const clearQueryState = () => {
		setQueryState(CLEAR_ALL);
	};

	// get offers paginated
	const getOffersPaginated = (offers, lowerRange, upperRange) => {
		let offersPaginated = [];
		if (lowerRange === 1) lowerRange = 0;
		// eslint-disable-next-line
		offers.map((el, i) => {
			if (i >= lowerRange && i < upperRange) offersPaginated.push(el);
		});
		return Promise.resolve(offersPaginated);
	};

	// set pagination page
	const setPage = page => {
		// set loading
		setQueryState(SET_LOADING, true);
		// set offers paginated
		getOffersPaginated(state.offers, page, page * 12).then(resolve => setQueryState(SET_OFFERS_PAGINATED, resolve));
		// set page
		setQueryState(SET_PAGE, page);
	};

	// set search cached
	const setSearchCached = searchParams => {
		// set search url
		const searchUrl = `/offers?${searchParams.product
			? 'product=' + searchParams.product + '&'
			: ''}${searchParams.location ? 'location=' + searchParams.location + '&' : ''}${searchParams.categoryId
			? 'cat_id=' + searchParams.categoryId + '&'
			: ''}`;

		setQueryState(SEARCH_CACHED, searchUrl);
	};

	// set state offers page
	const setOffersState = searchParams => {
		// clear all
		clearQueryState();
		// cache search
		setSearchCached(searchParams);

		// get categories
		if (!state.categories[0]) {
			getCategories({})
				.then(resolve => {
					setQueryState(SET_CATEGORIES, resolve.data);
				})
				.catch(err => {
					setQueryState(OFFER_ERROR, err.response.data);
				});
		}
		// get category
		if (searchParams.categoryId) {
			getCategories({ id: searchParams.categoryId })
				.then(resolve => {
					setQueryState(SET_CATEGORY, resolve.data);
				})
				.catch(err => {
					setQueryState(OFFER_ERROR, err.response.data);
				});
		}

		// search by location + other parameters
		if (searchParams.filter.location) {
			fetch(`https://app.geocodeapi.io/api/v1/autocomplete?text=${searchParams.location}&apikey=${geoCodeApiKey}`)
				.then(resolve => {
					return resolve.json();
				})
				.then(resolve => {
					if (resolve.features[0].properties) searchParams.location = resolve.features[0].properties;
				})
				.then(() => {
					searchOffers(searchParams)
						.then(resolve => {
							// set offers
							!resolve.data.msg ? setQueryState(SET_OFFERS, resolve.data) : setQueryState(OFFER_ERROR, resolve.data);
							if (!resolve.data.msg)
								getOffersPaginated(resolve.data, 0, 12).then(resolve => setQueryState(SET_OFFERS_PAGINATED, resolve));
							// calculate page count
							let pageCount = Math.round(resolve.data.length / 12);
							if (pageCount < 1) pageCount = 1;
							// set page count
							setQueryState(SET_PAGE_COUNT, pageCount);
						})
						.catch(err => {
							setQueryState(OFFER_ERROR, err.response.data);
						});
				})
				.catch(err => {
					setQueryState(OFFER_ERROR, err.response.data);
				});

			// search without location
		} else if (!searchParams.filter.location) {
			searchOffers(searchParams)
				.then(resolve => {
					// set offers
					!resolve.data.msg ? setQueryState(SET_OFFERS, resolve.data) : setQueryState(OFFER_ERROR, resolve.data);
					if (!resolve.data.msg)
						getOffersPaginated(resolve.data, 0, 12).then(resolve => setQueryState(SET_OFFERS_PAGINATED, resolve));
					// calculate page count
					let pageCount = Math.round(resolve.data.length / 12);
					if (pageCount < 1) pageCount = 1;
					// set page count
					setQueryState(SET_PAGE_COUNT, pageCount);
				})
				.catch(err => {
					setQueryState(OFFER_ERROR, err.response.data);
				});
		}
	};

	// set state offer page
	const setOfferState = offerId => {
		// clear all
		clearQueryState();

		// get offer
		searchOffer(offerId)
			.then(resolve => {
				// set offer
				if (!resolve.data.msg) {
					setQueryState(SET_OFFER, resolve.data);
				} else {
					setQueryState(OFFER_ERROR, resolve.data);
				}
				return resolve;
			})
			.catch(err => {
				setQueryState(OFFER_ERROR, err.response.data);
			})
			.then(resolve => {
				console.log(resolve.data);
			});
	};

	return (
		<QueryContext.Provider
			value={{
				errors: state.errors,
				loading: state.loading,
				categories: state.categories,
				category: state.category,
				offers: state.offers,
				offersPaginated: state.offersPaginated,
				offer: state.offer,
				page: state.page,
				pageCount: state.pageCount,
				searchCached: state.searchCached,
				setOffersState,
				setOfferState,
				setPage,
				clearQueryState
			}}
		>
			{props.children}
		</QueryContext.Provider>
	);
};

export default QueryState;
