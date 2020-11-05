import React, { useReducer } from 'react';
import NavbarContext from './navbarContext';
import navbarReducer from './navbarReducer';
import { SET_ANCHOREL, SET_MAIN_MENU, SET_REGISTER, SET_SCROLLED } from '../types';

const NavbarState = props => {
	// initial state
	const initialState = {
		mainMenuOpen: false,
		anchorEl: null,
		registerOpen: false,
		scrolled: {
			scrolledUp: true,
			scrolledDown: false,
			lastScrollTop: window.pageYOffset
		}
	};

	// destructure reducer
	const [ state, dispatch ] = useReducer(navbarReducer, initialState);

	// toggle main menu
	const setMainMenuOpen = mainMenuOpen => dispatch({ type: SET_MAIN_MENU, payload: mainMenuOpen });

	// open user menu
	const handleUserMenuOpen = e => dispatch({ type: SET_ANCHOREL, payload: e.currentTarget });

	// close user menu
	const handleUserMenuClose = () => dispatch({ type: SET_ANCHOREL, payload: null });

	// set register
	const setRegisterOpen = registerOpen => dispatch({ type: SET_REGISTER, payload: registerOpen });

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
				mainMenuOpen: state.mainMenuOpen,
				anchorEl: state.anchorEl,
				registerOpen: state.registerOpen,
				scrolled: state.scrolled,
				setMainMenuOpen,
				handleUserMenuOpen,
				handleUserMenuClose,
				setRegisterOpen,
				setScrolled
			}}
		>
			{props.children}
		</NavbarContext.Provider>
	);
};

// export NavbarState
export default NavbarState;
