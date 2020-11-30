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
		offer: null
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
		return await axios.post('/api/offers/search', paramsObj, config);
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
	const setOffersState = searchParams => {
		// set loading
		setQueryState(SET_LOADING, true);

		// get categories
		getCategories({})
			.then(resolve => {
				setQueryState(SET_CATEGORIES, resolve.data);
			})
			.catch(err => {
				console.log(err);
			});

		// search by location + other parameters
		if (searchParams.filter.location) {
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
							console.log(resolve);
							setQueryState(SET_OFFERS, resolve.data);
						})
						.catch(err => {
							console.log(err);
						});
				})
				.catch(err => {
					console.log(err);
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
