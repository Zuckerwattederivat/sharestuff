import { SET_MAIN_MENU, SET_ANCHOREL, SET_REGISTER, SET_LOGIN, SET_SCROLLED, SET_STICKY } from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_MAIN_MENU:
			return { ...state, mainMenuOpen: action.payload };
		case SET_ANCHOREL:
			return { ...state, anchorEl: action.payload };
		case SET_REGISTER:
			return { ...state, registerOpen: action.payload };
		case SET_LOGIN:
			return { ...state, loginOpen: action.payload };
		case SET_SCROLLED:
			return {
				...state,
				scrolled: { scrolledUp: action.payload.scrolledUp, scrolledDown: action.payload.scrolledDown }
			};
		case SET_STICKY:
			return { ...state, sticky: action.payload };
		default:
			return state;
	}
};
