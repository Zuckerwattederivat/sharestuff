import axios from 'axios';

// set authentification token
const setAuthToken = token => {
	if (token) {
		axios.defaults.headers.common['x-auth-token'] = token;
	} else {
		delete axios.defaults.headers.common['x-auth-token'];
	}
};

// export setAuthToken
export default setAuthToken;
