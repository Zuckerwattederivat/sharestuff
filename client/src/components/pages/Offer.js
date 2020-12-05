// Node Modules
import React, { useContext, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { Container, Breadcrumbs, Link, Typography } from '@material-ui/core';
import {} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
// Context
import QueryContext from '../../context/query/queryContext';

// define styles
const useStyles = makeStyles(theme => ({
	textPrimary: {
		color: theme.palette.primary.main
	},
	offer: {
		minHeight: '100vh',
		padding: theme.spacing(12, 0, 8)
	}
}));

// Offer Component
const Offer = props => {
	// define classes
	const classes = useStyles();

	// load query context
	const queryContext = useContext(QueryContext);
	// destructure query context
	const { errors, loading, categories, offer, searchCached, setOfferState } = queryContext;

	// on render
	useEffect(() => {
		// scroll to top
		window.scrollTo(0, 0);

		// get url params
		const urlParams = new URLSearchParams(window.location.search);

		// set search params
		const id = urlParams.get('id');

		// set offer state
		setOfferState(id);

		// eslint-disable-next-line
	}, []);

	return (
		<div className={classes.offer}>
			<Container maxWidth='xl'>
				<Breadcrumbs className={classes.breadcrumps}>
					<Link component={RouterLink} to='/' color='inherit'>
						Home
					</Link>
					<Link component={RouterLink} to={searchCached ? searchCached : '/offers'} color='inherit'>
						Find Offers
					</Link>
					<Typography color='textPrimary'>{offer && offer.title}</Typography>
				</Breadcrumbs>
			</Container>
		</div>
	);
};

// export Offer Component
export default Offer;
