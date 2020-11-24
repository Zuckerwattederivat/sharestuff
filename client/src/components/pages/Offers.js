// Node Modules
import React, { useEffect, useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { Container, Breadcrumbs, Link, Typography } from '@material-ui/core';
import {} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
// Context
import AuthContext from '../../context/auth/authContext';
import QueryState from '../../context/query/queryContext';
// Components
import OffersSearch from '../search/OffersSearch';
// Assets

// define styles
const useStyles = makeStyles(theme => ({
	offers: {
		minHeight: '100vh',
		padding: theme.spacing(12, 0, 8)
	}
}));

const Offers = () => {
	// define classes
	const classes = useStyles();

	// load auth context
	const authContext = useContext(AuthContext);

	// load search context
	const querystate = useContext(QueryState);

	// offers state
	const [ offerState, setOfferState ] = useState({
		loading: true,
		categories: null,
		offers: null
	});
	// destructure offer state
	const { loading, categories, offers } = offerState;

	// useffect on render
	useEffect(() => {
		// load user
		if (localStorage.token) {
			authContext.loadUser();
		}

		// get url params
		const urlParams = new URLSearchParams(window.location.search);

		// set search context
		// if (urlParams.get('cat_id')) {
		// 	searchContext.setSearchState('SET_CATEGORY', urlParams.get('cat_id'));
		// }
		// if (urlParams.get('product')) {
		// 	searchContext.setSearchState('SET_PRODUCT', urlParams.get('product'));
		// }
		// if (urlParams.get('location_id')) {
		// 	searchContext.setSearchState('SET_LOCATION', urlParams.get('location_id'));
		// }

		// eslint-disable-next-line
	}, []);

	return (
		<div className={classes.offers}>
			<Container maxWidth='lg'>
				<Breadcrumbs>
					<Link component={RouterLink} to='/'>
						Home
					</Link>
					<Typography color='textPrimary'>Find Offers</Typography>
				</Breadcrumbs>
				<OffersSearch />
			</Container>
		</div>
	);
};

export default Offers;
