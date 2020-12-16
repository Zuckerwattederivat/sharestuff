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

	// load query context
	const queryContext = useContext(QueryContext);

	// profile state
	const [ profileState, setprofileState ] = useState({
		tabLocation: 'offers',
		redirect: false
	});

	// on page load
	useEffect(() => {
		// reset profile state
		setprofileState({ tabLocation: 'offers', redirect: false });
		// scroll to top
		window.scrollTo(0, 0);
	}, []);

	// set tabLocation
	useEffect(
		() => {
			const tabLocation = props.history.location.search.split('=')[1];
			if (tabLocation === 'offers' || tabLocation === 'bookings' || tabLocation === 'messages') {
				setprofileState({ ...profileState, tabLocation: tabLocation });
			} else {
				setprofileState({ ...profileState, redirect: true });
			}
		},
		// eslint-disable-next-line
		[ props.history.location.search ]
	);

	// query content on tab change
	useEffect(
		() => {
			// TODO QUERY CONTENT
			console.log('execute query');
		},
		[ profileState.tabLocation ]
	);

	// tab location ellements
	const TabLocation = () => {
		switch (profileState.tabLocation) {
			case 'offers':
				return <div>Offers</div>;
			case 'bookings':
				return <div>Bookings</div>;
			case 'messages':
				return <div>Messages</div>;
		}
	};

	return (
		<div className={classes.profile}>
			<Container maxWidth='xl'>
				<TabLocation />
			</Container>
			{profileState.redirect && <Redirect to='/profile?tab=offers' />}
		</div>
	);
};

// export Profile Component
export default withRouter(Profile);
