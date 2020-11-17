/**
 * Helper Functions
 */

// stop scrolling
const stopScrolling = () => {
	document.body.style.position = 'fixed';
	document.body.style.scrollTop = `-${window.scrollY}px`;
};

// start scrolling top of page
const startScrolling = () => {
	const scrollY = document.body.style.top;
	document.body.style.position = '';
	document.body.style.scrollTop = '';
	window.scrollTo(0, parseInt(scrollY || '0') * -1);
};

// capitalize first letter
const capitalizeFirstLetter = string => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

// export
export default { stopScrolling, startScrolling, capitalizeFirstLetter };
