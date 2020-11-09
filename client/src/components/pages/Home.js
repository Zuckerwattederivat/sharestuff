// Node Modules
import React, { useEffect, useContext } from 'react';
// Context
import AuthContext from '../../context/auth/authContext';
// Components
import Hero from '../layout/Hero';

// Home Component
const Home = () => {
	// load auth context
	const authContext = useContext(AuthContext);

	// load user
	useEffect(() => {
		authContext.loadUser();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='home'>
			<Hero />
		</div>
	);
};

// export Home Component
export default Home;
