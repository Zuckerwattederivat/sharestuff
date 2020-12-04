// Node Modules
import { useContext, useEffect } from 'react';
// Context
import AuthContext from '../../context/auth/authContext';

// LoadUser Component
const LoadUser = props => {
	// load auth context
	const authContext = useContext(AuthContext);

	// load user
	useEffect(() => {
		if (localStorage.token) {
			authContext.loadUser();
		}
		// eslint-disable-next-line
	}, []);

	return props.children;
};

// export LoadUser Component
export default LoadUser;
