import React, { useReducer } from 'react';
import axios from 'axios';
import QueryContext from '../query/queryContext';
import queryReducer from '../query/queryReducer';
import { CLEAR_ALL, SET_LOADING, SET_CATEGORIES, SET_CATEGORY, SET_OFFERS, OFFER_ERROR } from '../types';

// QueryState
const QueryState = props => {
	// initial state
	const initialState = {
		errors: null,
		loading: true,
		categories: [],
		category: [],
		offers: [],
		offer: []
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

	// search offers
	const searchOffers = async paramsObj => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		return await axios.post('/api/offers/search', paramsObj, config);
	};

	// set state offers page
	const setOffersState = searchParams => {
		// set loading
		setQueryState(SET_LOADING, true);
		// clear all
		clearQueryState();

		// get categories
		if (!state.categories[0]) {
			getCategories({})
				.then(resolve => {
					setQueryState(SET_CATEGORIES, resolve.data);
				})
				.catch(err => {
					setQueryState(OFFER_ERROR, err.data);
				});
		}
		// get category
		getCategories({ id: searchParams.categoryId })
			.then(resolve => {
				setQueryState(SET_CATEGORY, resolve.data);
			})
			.catch(err => {
				console.error(err);
			});

		// search by location + other parameters
		if (searchParams.filter.location) {
			//console.log('locations:', searchParams.filter);
			fetch(`https://app.geocodeapi.io/api/v1/autocomplete?text=${searchParams.location}&apikey=${geoCodeApiKey}`)
				.then(resolve => {
					return resolve.json();
				})
				.then(resolve => {
					searchParams.location = resolve.features[0].properties;
				})
				.then(() => {
					searchOffers(searchParams)
						.then(resolve => {
							!resolve.data.msg ? setQueryState(SET_OFFERS, resolve.data) : setQueryState(OFFER_ERROR, resolve.data);
						})
						.catch(err => {
							setQueryState(OFFER_ERROR, err.data);
						});
				})
				.catch(err => {
					setQueryState(OFFER_ERROR, err.data);
				});

			// search without location
		} else if (!searchParams.filter.location) {
			//console.log('no location:', searchParams.filter);
			searchOffers(searchParams)
				.then(resolve => {
					!resolve.data.msg ? setQueryState(SET_OFFERS, resolve.data) : setQueryState(OFFER_ERROR, resolve.data);
				})
				.catch(err => {
					setQueryState(OFFER_ERROR, err.data);
				});
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
				getCategories,
				getOffers,
				setOffersState
			}}
		>
			{props.children}
		</QueryContext.Provider>
	);
};

export default QueryState;
