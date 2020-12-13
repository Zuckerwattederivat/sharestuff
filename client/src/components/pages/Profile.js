// Node Modules
import React, { useContext, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Breadcrumbs, Link, Typography } from '@material-ui/core';
import {} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
// Context
import AuthContext from '../../context/auth/authContext';

// define styles
const useStyles = makeStyles(theme => ({
	profile: {
		minHeight: '100vh',
		padding: theme.spacing(12, 0, 8)
	},
	breadcrumps: {
		margin: theme.spacing(0, 0, 4)
	}
}));

// Profile Component
const Profile = () => {
	// define classes
	const classes = useStyles();

	// load authContext
	const authContext = useContext(AuthContext);
	const { user } = authContext;

	// on page load
	useEffect(() => {
		// scroll to top
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className={classes.profile}>
			<Container maxWidth='xl'>
				<Breadcrumbs className={classes.breadcrumps}>
					<Link component={RouterLink} to='/' color='inherit'>
						Home
					</Link>
					<Typography color='textPrimary'>{user ? user.username + "'s Profile" : 'Profile'}</Typography>
				</Breadcrumbs>
			</Container>
		</div>
	);
};

// export Profile Component
export default Profile;
