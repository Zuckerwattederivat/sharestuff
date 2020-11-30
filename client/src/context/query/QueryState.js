import React, { useReducer } from 'react';
import axios from 'axios';
import QueryContext from '../query/queryContext';
import queryReducer from '../query/queryReducer';
import { SET_LOADING, SET_ALL, CLEAR_ALL, SET_CATEGORIES, SET_OFFERS } from '../types';

// QueryState
const QueryState = props => {
	// initial state
	const initialState = {
		errors: null,
		loading: true,
		categories: null,
		category: null,
		offers: null,
		offer: null,
		filter: {
			product: false,
			tags: false,
			price: false,
			createdBy: false,
			categoryId: false,
			location: false,
			sorted: 'desc'
		}
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

	// get offers with params
	const getOffers = async paramsObj => await axios.get('/api/offers/get', { params: paramsObj });

	const searchOffers = async paramsObj => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		await axios.post('/api/offers/search', paramsObj, config);
	};

	// set state home page
	const setHomeState = async () => {
		// set loading
		setQueryState(SET_LOADING, true);

		// get db data
		const resCategories = await getCategories({ rand: true, limit: 4 });
		const resOffers = await getOffers({ sort: 'desc', limit: 3 });

		// set state
		if (resCategories && resOffers) {
			dispatch({ type: SET_ALL, payload: { categories: resCategories.data, offers: resOffers.data } });
		}
	};

	// set state offers page
	const setOffersState = async (searchParams, filter) => {
		// set loading
		setQueryState(SET_LOADING, true);

		// get db data
		const resCategories = await getCategories({});

		// if search by location
		if (filter.location) {
			const response = await axios.get(
				`https://app.geocodeapi.io/api/v1/autocomplete?text=${searchParams.location}&apikey=${geoCodeApiKey}`
			);
			if (response) {
				const locationResponse = response.data.features[0].properties;
				const resOffers = await searchOffers({
					categoryId: searchParams.catId,
					product: searchParams.product,
					location: locationResponse,
					filter: filter
				});
				console.log(resOffers);
			} else {
				/// TODO SET ERRORS ///
			}
		}
	};

	// clear query state
	const clearQueryState = () => {
		setQueryState(CLEAR_ALL);
	};

	return (
		<QueryContext.Provider
			value={{
				errors: state.errors,
				loading: state.loading,
				categories: state.categories,
				category: state.category,
				offers: state.offers,
				offer: state.offer,
				filter: state.filter,
				getCategories,
				getOffers,
				setHomeState,
				setOffersState,
				clearQueryState,
				setQueryState
			}}
		>
			{props.children}
		</QueryContext.Provider>
	);
};

export default QueryState;
