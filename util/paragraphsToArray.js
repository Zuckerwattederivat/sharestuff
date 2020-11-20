/**
 * Save Paragraphs Array
 */

// save paragraphs into array
module.exports = function paragraphsToArray(text) {
	return text.split(/\r?\n/g);
};
