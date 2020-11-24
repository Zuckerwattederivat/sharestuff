import React, { useReducer } from 'react';
import axios from 'axios';
import QueryContext from '../query/queryContext';
import queryReducer from '../query/queryReducer';
import { SET_LOADING, SET_ALL } from '../types';

// QueryState
const QueryState = props => {
	// initial state
	const initialState = {
		loading: true,
		categories: null,
		offers: null
	};

	// destructure reducer
	const [ state, dispatch ] = useReducer(queryReducer, initialState);

	// set state
	const setQueryState = (type, payload) => dispatch({ type: type, payload: payload });

	// get catgeories with params
	const getCategories = async paramsObj => await axios.get('/api/categories/get', { params: paramsObj });

	// get offers with params
	const getOffers = async paramsObj => await axios.get('/api/offers/get', { params: paramsObj });

	// set state home page
	const setHomeState = async () => {
		// set loading
		setQueryState(SET_LOADING, true);

		// get db data
		const resCategories = await getCategories({ rand: true, limit: 4 });
		const resOffers = await getOffers({ rand: true, limit: 3 });

		// set state
		if (resCategories && resOffers) {
			dispatch({ type: SET_ALL, payload: { categories: resCategories.data, offers: resOffers.data } });
		}
	};

	return (
		<QueryContext.Provider
			value={{
				loading: state.loading,
				categories: state.categories,
				offers: state.offers,
				getCategories,
				getOffers,
				setHomeState
			}}
		>
			{props.children}
		</QueryContext.Provider>
	);
};

export default QueryState;
