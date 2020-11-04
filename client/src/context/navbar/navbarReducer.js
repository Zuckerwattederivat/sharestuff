import { SET_ANCHOREL, SET_SCROLLED } from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_ANCHOREL:
			return { ...state, anchorEl: action.payload };
		case SET_SCROLLED:
			return {
				...state,
				scrolled: { scrolledUp: action.payload.scrolledUp, scrolledDown: action.payload.scrolledDown }
			};
		default:
			return state;
	}
};
