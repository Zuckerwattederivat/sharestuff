// Node Modules
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
// Context
import AuthContext from '../../context/auth/authContext';

// PrivateRoute Component
const PrivateRoute = ({ component: Component, ...rest }) => {
	// load authContext
	const authContext = useContext(AuthContext);
	const { isAuthenticated, loading } = authContext;

	return (
		<Route {...rest} render={props => (!isAuthenticated && loading ? <Redirect to='/' /> : <Component {...props} />)} />
	);
};

// export PrivateRoute Component
export default PrivateRoute;
