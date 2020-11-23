import React, { useReducer } from 'react';
import SearchContext from './searchContext';
import searchReducer from './searchReducer';
import {} from '../types';

// SearchState
const SearchState = props => {
	// initial state
	const initialState = {
		category: null,
		offer: null,
		product: null,
		location: null
	};

	// destructure reducer
	const [ state, dispatch ] = useReducer(searchReducer, initialState);

	// set state
	const setSearchState = (type, payload) => dispatch({ type: type, payload: payload });

	return (
		<SearchContext.Provider
			value={{
				category: state.category,
				offer: state.offer,
				product: state.product,
				location: state.location,
				setSearchState
			}}
		>
			{props.children}
		</SearchContext.Provider>
	);
};

export default SearchState;
