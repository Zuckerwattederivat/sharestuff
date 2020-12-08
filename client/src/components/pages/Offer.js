// Node Modules
import React, { useContext, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { Container, Breadcrumbs, Link, Typography, Box } from '@material-ui/core';
import {} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
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
		height: '400px',
		backgroundSize: 'cover',
		backgroundPosition: 'center'
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
					<Box className={classes.contentBox} width='100%'>
						<Carousel autoPlay={true} showThumbs={false}>
							{offer &&
								offer.imagesThumb.map((el, index) => {
									return (
										<div
											key={`offer-img-${index}`}
											className={classes.carouselSlide}
											style={{ backgroundImage: `url(/${el})` }}
										/>
									);
								})}
						</Carousel>
					</Box>
				)}
			</Container>
		</div>
	);
};

// export Offer Component
export default Offer;
