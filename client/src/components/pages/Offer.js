// Node Modules
import React, { useContext, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { Container, Breadcrumbs, Link, Typography, Grid, Box } from '@material-ui/core';
import {} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import AwesomeSlider from 'react-awesome-slider';
// Styles
import CoreStyles from 'react-awesome-slider/src/core/styles.scss';
import AnimationStyles from 'react-awesome-slider/src/styled/scale-out-animation/scale-out-animation.scss';
// Context
import QueryContext from '../../context/query/queryContext';
// Assets
import LoadingGif from '../../assets/loading-transparent.gif';
import NotFoundSvg from '../../assets/undraw/not-found.svg';

// define styles
const useStyles = makeStyles(theme => ({
	textPrimary: {
		color: theme.palette.primary.main
	},
	offer: {
		minHeight: '100vh',
		padding: theme.spacing(12, 0, 8)
	},
	contentBox: {
		marginTop: theme.spacing(2)
	},
	loadingGif: {
		height: '20vh'
	},
	carouselSlide: {
		height: '400px'
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
					<Typography color='textPrimary'>{offer ? offer.title : 'Offer'}</Typography>
				</Breadcrumbs>
				{loading ? (
					<Box className={classes.contentBox} width='100%' textAlign='center'>
						<img className={classes.loadingGif} src={LoadingGif} alt='loading...' />
					</Box>
				) : (
					<Grid container className={classes.contentBox} width='100%' spacing={3}>
						{offer && (
							<Grid item xs={12} md={7} lg={8}>
								<AwesomeSlider
									className={classes.carousel}
									name='offer-carousel'
									organicArrows={true}
									bullets={false}
									loading={false}
									animation='scaleOutAnimation'
									mobileTouch={true}
									cssModule={[ CoreStyles, AnimationStyles ]}
								>
									{offer.images.map((el, i) => {
										return <div className={classes.carouselSlide} data-src={`/${el}`} key={`image-${i}`} />;
									})}
								</AwesomeSlider>
							</Grid>
						)}
					</Grid>
				)}
			</Container>
		</div>
	);
};

// export Offer Component
export default Offer;
