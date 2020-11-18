/**
 * Authentication Middleware
 * Checks for json web token
 * Verifies json web token
 */

// Node Modules
const jwt = require('jsonwebtoken');
// Config
const config = require('config');

// export middleware
module.exports = function(req, res, next) {
	// get token from header
	const token = req.header('x-auth-token');

	// check if not token
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	try {
		// verify token
		const decoded = jwt.verify(token, config.get('jwtSecret'));

		// assign user to request object
		req.user = decoded.user;
		next();

		// catch error & send response
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' });
	}
};
