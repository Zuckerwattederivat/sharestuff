// Node Modules
import React, { useEffect, useContext } from 'react';
import { Box, Container, Typography, Grid } from '@material-ui/core';
import { ArrowRight as ArrowRightIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
// Context
import AuthContext from '../../context/auth/authContext';
import QueryContext from '../../context/query/queryContext';
// Components
import Hero from '../layout/Hero';
import CardMediaV1 from '../layout/CardMediaV1';
import CardMediaV2 from '../layout/CardMediaV2';
// Assets
import LoadingGif from '../../assets/loading-transparent.gif';
import EmptySvg from '../../assets/undraw/empty.svg';

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
	}
}));

// Home Component
const Home = () => {
	// define classes
	const classes = useStyles();

	// load auth context
	const authContext = useContext(AuthContext);
	// load query context
	const queryContext = useContext(QueryContext);
	// destructure query context
	const { loading, categories, offers, setHomeState, clearQueryState } = queryContext;

	// load user && assets
	useEffect(() => {
		// clear query context
		clearQueryState();

		// load user
		if (localStorage.token) {
			authContext.loadUser();
		}
		// set home state
		setHomeState();
		// eslint-disable-next-line
	}, []);

	return (
		<div className={classes.home}>
			<Hero />
			<Container className={classes.categories} maxWidth='lg'>
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
							{categories[0] ? (
								<Grid container width='100%' spacing={4}>
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
								<Box width='100%' textAlign='center'>
									<img className={classes.emptySvg} src={EmptySvg} alt='Empty' />
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
								<Grid container width='100%' spacing={4}>
									<Grid key={offers[0]._id} item xs={12} md={6}>
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
												price={`Daily Price: ${offers[0].price} ${offers[1].currency}`}
												link={`/offers/offer?id=${offers[0]._id}`}
												image={`${offers[0].images[0]}`}
												title={offers[0].title}
												btnname='View'
												btnicon={<ArrowRightIcon />}
											>
												<Typography className={classes.cardParagraph} variant='body1'>
													{offers[0].description.join(' ').length > 500 ? (
														offers[0].description.join(' ').substring(0, 500) + '...'
													) : (
														offers[0].description.join(' ')
													)}
												</Typography>
											</CardMediaV2>
										</motion.div>
									</Grid>
									<Grid key={offers[1]._id} item xs={12} md={3}>
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
												price={`Daily Price: ${offers[1].price} ${offers[1].currency}`}
												link={`/offers/offer/id=${offers[1]._id}`}
												image={`${offers[1].images[0]}`}
												title={offers[1].title}
												btnname='View'
												btnicon={<ArrowRightIcon />}
											>
												<Typography className={classes.cardParagraph} variant='body1'>
													{offers[1].description.join(' ').length > 150 ? (
														offers[1].description.join(' ').substring(0, 150) + '...'
													) : (
														offers[1].description.join(' ')
													)}
												</Typography>
											</CardMediaV2>
										</motion.div>
									</Grid>
									<Grid key={offers[2]._id} item xs={12} md={3}>
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
												price={`Daily Price: ${offers[2].price} ${offers[2].currency}`}
												link={`/offers/offer?id=${offers[2]._id}`}
												image={`${offers[2].images[0]}`}
												title={offers[2].title}
												btnname='View'
												btnicon={<ArrowRightIcon />}
											>
												<Typography className={classes.cardParagraph} variant='body1'>
													{offers[2].description.join(' ').length > 150 ? (
														offers[2].description.join(' ').substring(0, 150) + '...'
													) : (
														offers[2].description.join(' ')
													)}
												</Typography>
											</CardMediaV2>
										</motion.div>
									</Grid>
								</Grid>
							) : (
								<Box width='100%' textAlign='center'>
									<img className={classes.emptySvg} src={EmptySvg} alt='Empty' />
									<Typography variant='body1'>Sorry there aren't any offers yet...</Typography>
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
