import React, { useReducer } from 'react';
import axios from 'axios';
import QueryContext from '../query/queryContext';
import queryReducer from '../query/queryReducer';
import { SET_LOADING, SET_ALL, CLEAR_ALL, SET_CATEGORIES, SET_OFFERS } from '../types';

// QueryState
const QueryState = props => {
	// initial state
	const initialState = {
		loading: true,
		categories: null,
		category: null,
		offers: null,
		offer: null
	};

	// destructure reducer
	const [ state, dispatch ] = useReducer(queryReducer, initialState);

	// set state
	const setQueryState = (type, payload) => dispatch({ type: type, payload: payload });

	// get catgeories with params
	const getCategories = async paramsObj => await axios.get('/api/categories/get', { params: paramsObj });

	// get offers with params
	const getOffers = async paramsObj => await axios.get('/api/offers/get', { params: paramsObj });

	const searchOffers = async paramsObj => await axios.get('/api/offers/search', { params: paramsObj });

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
	const setOffersState = async (catId = null, locationId = null, product = null, filter = null) => {
		// set loading
		setQueryState(SET_LOADING, true);

		// get location
		// TODO API TO GEOCODE
		let location = [];
		// get db data
		const resCategory = await getCategories({ id: catId });
		const resCategories = await getCategories({});
		const resOffers = await searchOffers({ categoryId: catId, product: product, location: location, filter: filter });

		// set state
		if (resCategory) {
		}
	};

	// clear query state
	const clearQueryState = () => {
		setQueryState(CLEAR_ALL);
	};

	return (
		<QueryContext.Provider
			value={{
				loading: state.loading,
				categories: state.categories,
				category: state.category,
				offers: state.offers,
				offer: state.offer,
				getCategories,
				getOffers,
				setHomeState,
				setOffersState,
				clearQueryState
			}}
		>
			{props.children}
		</QueryContext.Provider>
	);
};

export default QueryState;
