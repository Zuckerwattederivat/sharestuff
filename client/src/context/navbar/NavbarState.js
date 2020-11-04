import React, { useReducer } from 'react';
import NavbarContext from './navbarContext';
import navbarReducer from './navbarReducer';
import { SET_ANCHOREL, SET_SCROLLED } from '../types';

const NavbarState = props => {
	// initial state
	const initialState = {
		anchorEl: null,
		scrolled: {
			scrolledUp: true,
			scrolledDown: false,
			lastScrollTop: window.pageYOffset
		}
	};

	// destructure reducer
	const [ state, dispatch ] = useReducer(navbarReducer, initialState);

	// open menu
	const handleUserMenuOpen = e => dispatch({ type: SET_ANCHOREL, payload: e.currentTarget });

	// menu close
	const handleUserMenuClose = () => dispatch({ type: SET_ANCHOREL, payload: null });

	// set scrolled
	const setScrolled = () => {
		let offset = window.pageYOffset;
		if (offset > state.scrolled.lastScrollTop && !state.scrolled.scrolledDown) {
			dispatch({ type: SET_SCROLLED, payload: { scrolledUp: false, scrolledDown: true } });
		} else if (offset === state.scrolled.lastScrollTop) {
			dispatch({ type: SET_SCROLLED, payload: { scrolledUp: true, scrolledDown: false } });
		}
	};

	return (
		<NavbarContext.Provider
			value={{
				anchorEl: state.anchorEl,
				scrolled: state.scrolled,
				handleUserMenuOpen,
				handleUserMenuClose,
				setScrolled
			}}
		>
			{props.children}
		</NavbarContext.Provider>
	);
};

// export NavbarState
export default NavbarState;
