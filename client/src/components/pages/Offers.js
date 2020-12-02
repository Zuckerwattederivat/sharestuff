// Node Modules
import React, { useEffect, useContext, Fragment } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { Container, Breadcrumbs, Link, Typography, Box, Grid, Button } from '@material-ui/core';
import { ArrowRight as ArrowRightIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
// Context
import AuthContext from '../../context/auth/authContext';
import QueryContext from '../../context/query/queryContext';
// Components
import OffersSearch from '../search/OffersSearch';
import CardPicture from '../cards/CardPicture';
// Assets
import LoadingGif from '../../assets/loading-transparent.gif';
import NotFoundSvg from '../../assets/undraw/not-found.svg';

// define styles
const useStyles = makeStyles(theme => ({
	textPrimary: {
		color: theme.palette.primary.main
	},
	offers: {
		minHeight: '100vh',
		padding: theme.spacing(12, 0, 0)
	},
	breadcrumps: {
		margin: theme.spacing(0, 0, 4)
	},

	categoryContainer: {
		minHeight: '80px',
		margin: theme.spacing(2, 0),
		[theme.breakpoints.up('sm')]: {
			minHeight: '320px'
		},
		[theme.breakpoints.up('md')]: {
			minHeight: '150px'
		},
		[theme.breakpoints.up('xl')]: {
			minHeight: '220px'
		}
	},
	categoryCards: {
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	categoryButtons: {
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	categoryButton: {
		width: '100%'
	},
	searchTitle: {
		fontSize: '1.7rem',
		fontWeight: 700,
		margin: theme.spacing(5, 0, 3)
	},
	loadingGif: {
		height: '20vh'
	},
	noOffersContainer: {
		minHeight: '50vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		'& h3': {
			fontSize: '1.5rem',
			fontWeight: 700,
			color: theme.palette.primary.main,
			margin: theme.spacing(1.5, 0)
		}
	},
	notFoundSvg: {
		height: '200px',
		marginBottom: theme.spacing(2)
	}
}));

const Offers = props => {
	// define classes
	const classes = useStyles();

	// load auth context
	const authContext = useContext(AuthContext);

	// load query context
	const queryContext = useContext(QueryContext);
	// destructure query context
	const { errors, loading, categories, category, offers, setOffersState } = queryContext;

	// set search params & filter
	const setParamsAndFilter = (delCat = false, delLoc = false, delProd = false) => {
		// get url params
		const urlParams = new URLSearchParams(window.location.search);

		// delete url params
		if (delCat) urlParams.delete('cat_id');
		if (delLoc) urlParams.delete('location');
		if (delProd) urlParams.delete('product');

		// set search params
		const searchParams = {
			categoryId: urlParams.get('cat_id'),
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
		searchParams.categoryId ? (filter.categoryId = true) : (filter.categoryId = false);
		searchParams.location ? (filter.location = true) : (filter.location = false);
		searchParams.product ? (filter.product = true) : (filter.product = false);
		// add filter to searchParams
		searchParams.filter = filter;

		return searchParams;
	};

	// set url history
	const setUrlParams = searchParams => {
		let product;
		let location;
		let categoryId;

		// set vars
		searchParams.product ? (product = `product=${searchParams.product}&`) : (product = '');
		searchParams.location ? (location = `location=${searchParams.location}&`) : (location = '');
		searchParams.categoryId ? (categoryId = `cat_id=${searchParams.categoryId}`) : (categoryId = '');

		// set url
		props.history.push(`/offers?${product}${location}${categoryId}`);
	};

	// useffect on render
	useEffect(() => {
		// load user
		if (localStorage.token) {
			authContext.loadUser();
		}

		// scroll to top
		window.scrollTo(0, 0);

		// set search params
		const searchParams = setParamsAndFilter();

		// set offer sate
		setOffersState(searchParams);

		// eslint-disable-next-line
	}, []);

	// cards handleClick
	const handleCategoryCards = categoryId => {
		// if category is not selected
		if (categoryId !== category._id) {
			// set search params
			const searchParams = setParamsAndFilter();
			// change categoryId
			searchParams.categoryId = categoryId;
			searchParams.filter.categoryId = true;

			// push categoryId to url
			setUrlParams(searchParams);

			// set offer sate
			setOffersState(searchParams);

			// if category is selected clear
		} else {
			// remove category from url params
			const searchParams = setParamsAndFilter(true);

			// push to url
			setUrlParams(searchParams);

			// set offer sate
			setOffersState(searchParams);
		}
	};

	// clear all
	const handleClearAll = () => {
		// remove all from params and filter
		const searchParams = setParamsAndFilter(true, true, true);

		// push to url
		setUrlParams(searchParams);

		// set offer sate
		setOffersState(searchParams);
	};

	return (
		<div className={classes.offers}>
			<Container maxWidth='xl'>
				<Breadcrumbs className={classes.breadcrumps}>
					<Link component={RouterLink} to='/' color='inherit'>
						Home
					</Link>
					<Typography color='textPrimary'>Find Offers</Typography>
				</Breadcrumbs>
				<OffersSearch
					setUrl={setUrlParams}
					setSearch={setParamsAndFilter}
					setParentState={setOffersState}
					clearAll={handleClearAll}
				/>
				<Box className={classes.categoryContainer} key='categories-box' width='100%'>
					{categories && (
						<Grid container width='100%' spacing={2}>
							{categories.map(el => {
								return (
									<Fragment key={`cont-${el._id}`}>
										<Grid className={classes.categoryCards} key={`card-${el._id}`} item sm={6} md={3}>
											<motion.div
												transition={{
													duration: 1,
													type: 'tween'
												}}
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
											>
												<CardPicture
													onClick={() => handleCategoryCards(el._id)}
													image={el.image}
													title={el.title}
													btnname='Explorer'
													btnicon={<ArrowRightIcon />}
													active={el._id === category._id ? true : false}
												>
													<Typography className={classes.cardParagraph} variant='body1' />
												</CardPicture>
											</motion.div>
										</Grid>
										<Grid className={classes.categoryButtons} key={`button-${el._id}`} item xs={6} md={4}>
											<motion.div
												transition={{
													duration: 1,
													type: 'tween'
												}}
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
											>
												<Button
													onClick={() => handleCategoryCards(el._id)}
													name='categoryButton'
													className={classes.categoryButton}
													width='100%'
													variant={el._id === category._id ? 'contained' : 'outlined'}
													color='default'
													size='small'
												>
													{el.title}
												</Button>
											</motion.div>
										</Grid>
									</Fragment>
								);
							})}
						</Grid>
					)}
				</Box>
				{loading ? (
					<Box width='100%' textAlign='center'>
						<img className={classes.loadingGif} src={LoadingGif} alt='loading...' />
					</Box>
				) : offers[0] ? (
					<Fragment>
						<Typography className={classes.searchTitle} width='100%' variant='h2'>
							Search <span className={classes.textPrimary}>Results</span>
						</Typography>
						<p>TODO: offers with pagination</p>
					</Fragment>
				) : (
					<Box className={classes.noOffersContainer} width='100%' height='100%'>
						<img className={classes.notFoundSvg} src={NotFoundSvg} alt='Empty' />
						<Typography variant='h3'>{errors.msg}</Typography>
						<Typography variant='body1'>Sorry your search returned no results.</Typography>
					</Box>
				)}
			</Container>
		</div>
	);
};

export default withRouter(Offers);
