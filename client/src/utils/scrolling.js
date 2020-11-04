/**
 * Helper Functions
 */

// stop scrolling
export const stopScrolling = () => {
	document.body.style.position = 'fixed';
	document.body.style.scrollTop = `-${window.scrollY}px`;
};

// start scrolling top of page
export const startScrolling = () => {
	const scrollY = document.body.style.top;
	document.body.style.position = '';
	document.body.style.scrollTop = '';
	window.scrollTo(0, parseInt(scrollY || '0') * -1);
};
