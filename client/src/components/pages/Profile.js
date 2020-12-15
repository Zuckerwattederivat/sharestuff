// Node Modules
import React, { useContext, useEffect, useState } from 'react';
import { Link as RouterLink, withRouter, Redirect } from 'react-router-dom';
import { Container, Breadcrumbs, Link, Typography } from '@material-ui/core';
import {} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
// Context
import AuthContext from '../../context/auth/authContext';
import QueryContext from '../../context/query/queryContext';

// define styles
const useStyles = makeStyles(theme => ({
	profile: {
		height: '100vh',
		padding: theme.spacing(20, 0, 8)
	},
	breadcrumps: {
		margin: theme.spacing(0, 0, 4)
	}
}));

// Profile Component
const Profile = props => {
	// define classes
	const classes = useStyles();

	// load authContext
	const authContext = useContext(AuthContext);
	const { user } = authContext;

	// profile state
	const [ profileState, setprofileState ] = useState({
		location: 'offers',
		redirect: false
	});

	// on page load
	useEffect(() => {
		// reset profile state
		setprofileState({ location: 'offers', redirect: false });
		// scroll to top
		window.scrollTo(0, 0);
	}, []);

	// set location
	useEffect(
		() => {
			const location = props.history.location.search.split('=')[1];
			if (location === 'offers' || location === 'bookings' || location === 'messages') {
				setprofileState({ ...profileState, location: location });
			} else {
				setprofileState({ ...profileState, redirect: true });
			}
		},
		[ props.history.location.search ]
	);

	return (
		<div className={classes.profile}>
			<Container maxWidth='xl'>
				<Breadcrumbs className={classes.breadcrumps}>
					<Link component={RouterLink} to='/' color='inherit'>
						Home
					</Link>
					<Typography color='textPrimary'>{user ? user.username + "'s Profile" : 'Profile'}</Typography>
				</Breadcrumbs>
				hallo
			</Container>
			{profileState.redirect && <Redirect to='/profile?tab=offers' />}
		</div>
	);
};

// export Profile Component
export default withRouter(Profile);
