// Node Modules
import React, { useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Breadcrumbs, Link, Typography } from '@material-ui/core';
import {} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
// Context
import AuthContext from '../../context/auth/authContext';
import QueryContext from '../../context/query/queryContext';
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

	// load query context
	const queryContext = useContext(QueryContext);
	// destructure query context
	const { categories, category, offers, setOffersState } = queryContext;

	// useffect on render
	useEffect(() => {
		// load user
		if (localStorage.token) {
			authContext.loadUser();
		}

		// scroll to top
		window.scrollTo(0, 0);

		// get url params
		const urlParams = new URLSearchParams(window.location.search);
		const searchParams = {
			catId: urlParams.get('cat_id'),
			location: urlParams.get('location'),
			product: urlParams.get('product')
		};

		// filter
		const filter = {
			product: false,
			tags: false,
			price: false,
			createdBy: false,
			categoryId: false,
			location: false,
			sorted: 'desc'
		};
		// set filter
		searchParams.catId ? (filter.categoryId = true) : (filter.categoryId = false);
		searchParams.location ? (filter.location = true) : (filter.location = false);
		searchParams.product ? (filter.product = true) : (filter.product = false);
		// add filter to searchParams
		searchParams.filter = filter;

		// set offer sate
		setOffersState(searchParams);

		// eslint-disable-next-line
	}, []);

	return (
		<div className={classes.offers}>
			<Container maxWidth='lg'>
				<Breadcrumbs>
					<Link component={RouterLink} to='/' color='inherit'>
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
