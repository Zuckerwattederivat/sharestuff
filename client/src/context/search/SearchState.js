import React, { useReducer } from 'react';
import SearchContext from './searchContext';
import searchReducer from './searchReducer';
import {} from '../types';

const SearchState = props => {
	const initialState = [];

	const [ state, dispatch ] = useReducer(searchReducer, initialState);

	return <SearchContext.Provider value={{}}>{props.children}</SearchContext.Provider>;
};

export default SearchState;
