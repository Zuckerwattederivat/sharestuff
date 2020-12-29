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

// convert base 64 to blob
const b64ToBlob = (content, contentType) => {
	contentType = contentType || '';
	var sliceSize = 512;
	var byteCharacters = window.atob(content); //method which converts base64 to binary
	var byteArrays = [];
	for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		var slice = byteCharacters.slice(offset, offset + sliceSize);
		var byteNumbers = new Array(slice.length);
		for (var i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}
		var byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}
	var blob = new Blob(byteArrays, {
		type: contentType
	}); //statement which creates the blob
	return blob;
};

// export
export default { stopScrolling, startScrolling, capitalizeFirstLetter, b64ToBlob };
