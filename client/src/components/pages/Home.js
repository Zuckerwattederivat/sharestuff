// Node Modules
import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid } from '@material-ui/core';
import { ArrowRight as ArrowRightIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import axios from 'axios';
// Components
import Hero from '../layout/Hero';
import CardMediaV1 from '../cards/CardMediaV1';
import CardMediaV2 from '../cards/CardMediaV2';
// Assets
import LoadingGif from '../../assets/loading-transparent.gif';
import EmptySvg from '../../assets/undraw/empty.svg';
import NotFoundSvg from '../../assets/undraw/not-found.svg';

// define styles
const useStyles = makeStyles(theme => ({
	home: {
		padding: theme.spacing(0, 0, 8)
	},
	h2: {
		fontSize: '1.7rem',
		fontWeight: 700,
		margin: theme.spacing(6, 0, 3)
	},
	textPrimary: {
		color: theme.palette.primary.main
	},
	loadingGif: {
		height: '20vh'
	},
	emptySvg: {
		height: '200px',
		marginBottom: theme.spacing(2)
	},
	motionDiv: {
		height: '100%'
	},
	cardParagraph: {
		minHeight: '1rem'
	},
	notFoundContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		'& h3': {
			textAlign: 'center',
			fontSize: '1.5rem',
			fontWeight: 700,
			color: theme.palette.primary.main,
			margin: theme.spacing(1.5, 0)
		},
		'& p': {
			textAlign: 'center'
		}
	}
}));

// Home Component
const Home = () => {
	// define classes
	const classes = useStyles();

	// define home state
	const [ homeState, setHomeState ] = useState({
		loading: true,
		categories: [],
		offers: []
	});
	// destructure state
	const { loading, categories, offers } = homeState;

	// use effect
	useEffect(() => {
		// scroll to top
		window.scrollTo(0, 0);

		(async () => {
			// get catgeories with params
			const resCategories = await axios.get('/api/categories/get', { params: { rand: true, limit: 4 } });
			// get offers with params
			const resOffers = await axios.get('/api/offers/get', { params: { sort: 'desc', limit: 6 } });

			// set state
			if (resCategories && resOffers) {
				setHomeState({ loading: false, categories: resCategories.data, offers: resOffers.data });
			}
		})();

		// eslint-disable-next-line
	}, []);

	return (
		<div className={classes.home}>
			<Hero />
			<Container className={classes.categories} maxWidth='xl'>
				{loading ? (
					<Box width='100%' textAlign='center'>
						<img className={classes.loadingGif} src={LoadingGif} alt='loading...' />
					</Box>
				) : (
					[
						<Box key='categories-box' width='100%'>
							<Typography className={classes.h2} variant='h2'>
								Featured <span className={classes.textPrimary}>Categories</span>
							</Typography>
							{categories ? (
								<Grid container width='100%' spacing={3}>
									{categories.map(category => {
										return (
											<Grid key={category._id} item xs={12} sm={6} md={3}>
												<motion.div
													className={classes.motionDiv}
													transition={{
														duration: 1,
														type: 'tween'
													}}
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
												>
													<CardMediaV1
														link={`/offers?cat_id=${category._id}`}
														image={category.image}
														title={category.title}
														btnname='Explorer'
														btnicon={<ArrowRightIcon />}
													>
														<Typography className={classes.cardParagraph} variant='body1'>
															{category.description}
														</Typography>
													</CardMediaV1>
												</motion.div>
											</Grid>
										);
									})}
								</Grid>
							) : (
								<Box className={classes.notFoundContainer} width='100%' textAlign='center'>
									<img className={classes.emptySvg} src={EmptySvg} alt='Empty' />
									<Typography variant='h3'>No categories found</Typography>
									<Typography variant='body1'>Sorry there aren't any categories yet...</Typography>
								</Box>
							)}
						</Box>,
						<br key='break-1' />,
						<Box key='offers-box' width='100%'>
							<Typography className={classes.h2} variant='h2'>
								Newest <span className={classes.textPrimary}>Offers</span>
							</Typography>
							{offers[0] ? (
								<Grid container width='100%' spacing={3}>
									{offers.map((el, i) => {
										return (
											<Grid
												key={el._id}
												item
												xs={12}
												sm={i === 0 || i === 5 ? 12 : 6}
												md={6}
												lg={i === 0 || i === 5 ? 6 : 3}
											>
												<motion.div
													className={classes.motionDiv}
													transition={{
														duration: 1,
														type: 'tween'
													}}
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
												>
													<CardMediaV2
														location={el.location.label}
														price={`${el.price} ${el.currency} daily`}
														link={`/offers/offer?id=${el._id}`}
														image={`${el.images[0]}`}
														title={el.title}
														btnName='View'
														btnIcon={<ArrowRightIcon />}
													>
														<Typography className={classes.cardParagraph} variant='body1'>
															{el.description.join(' ').length > 500 ? (
																el.description.join(' ').substring(0, 500) + '...'
															) : (
																el.description.join(' ')
															)}
														</Typography>
													</CardMediaV2>
												</motion.div>
											</Grid>
										);
									})}
								</Grid>
							) : (
								<Box className={classes.notFoundContainer} width='100%' textAlign='center'>
									<img className={classes.emptySvg} src={NotFoundSvg} alt='Not found' />
									<Typography variant='h3'>No offer was found</Typography>
									<Typography variant='body1'>Sorry there aren't any offers yet</Typography>
								</Box>
							)}
						</Box>
					]
				)}
			</Container>
		</div>
	);
};

// export Home Component
export default Home;
