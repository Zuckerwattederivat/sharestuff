// Node Modules
import React, { useEffect, useContext, Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Breadcrumbs, Link, Typography, Box, Grid, Button } from '@material-ui/core';
import { ArrowRight as ArrowRightIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
// Context
import AuthContext from '../../context/auth/authContext';
import QueryContext from '../../context/query/queryContext';
// Components
import OffersSearch from '../search/OffersSearch';
import MainSearch from '../search/MainSearch';
import CardPicture from '../cards/CardPicture';
// Assets
import LoadingGif from '../../assets/loading-transparent.gif';
import EmptySvg from '../../assets/undraw/empty.svg';

// define styles
const useStyles = makeStyles(theme => ({
	offers: {
		minHeight: '100vh',
		padding: theme.spacing(12, 0, 8)
	},
	breadcrumps: {
		margin: theme.spacing(0, 0, 4)
	},
	loadingGif: {
		height: '20vh'
	},
	categoryContainer: {
		margin: theme.spacing(2, 0)
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
	const { loading, categories, category, offers, setOffersState } = queryContext;

	// get url params
	const urlParams = new URLSearchParams(window.location.search);
	const searchParams = {
		categoryId: urlParams.get('cat_id'),
		location: urlParams.get('location'),
		product: urlParams.get('product')
	};

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

		// set offer sate
		setOffersState(searchParams);

		// eslint-disable-next-line
	}, []);

	// cards handleClick
	const handleCardsClick = categoryId => {
		console.log(categoryId);
	};

	return (
		<div className={classes.offers}>
			<Container maxWidth='lg'>
				<Breadcrumbs className={classes.breadcrumps}>
					<Link component={RouterLink} to='/' color='inherit'>
						Home
					</Link>
					<Typography color='textPrimary'>Find Offers</Typography>
				</Breadcrumbs>
				<MainSearch />
				{loading ? (
					<Box width='100%' textAlign='center'>
						<img className={classes.loadingGif} src={LoadingGif} alt='loading...' />
					</Box>
				) : (
					<Box className={classes.categoryContainer} key='categories-box' width='100%'>
						{categories ? (
							<Grid container width='100%' spacing={1}>
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
														onClick={() => handleCardsClick(el._id)}
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
														disabled={el._id === category._id ? true : false}
														onClick={() => handleCardsClick(el._id)}
														name='categoryButton'
														className={classes.categoryButton}
														width='100%'
														variant='outlined'
														color='primary'
														size='large'
													>
														{el.title}
													</Button>
												</motion.div>
											</Grid>
										</Fragment>
									);
								})}
							</Grid>
						) : (
							<Box width='100%' textAlign='center'>
								<img className={classes.emptySvg} src={EmptySvg} alt='Empty' />
								<Typography variant='body1'>Sorry there aren't any categories yet...</Typography>
							</Box>
						)}
					</Box>
				)}
			</Container>
		</div>
	);
};

export default Offers;
