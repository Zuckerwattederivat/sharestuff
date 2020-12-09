// Node Modules
import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { Container, Breadcrumbs, Link, Typography, Grid, Box } from '@material-ui/core';
import {} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
// Context
import QueryContext from '../../context/query/queryContext';
// Components
import ModalImage from '../layout/ModalImage';
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
	carousel: {
		cursor: 'pointer'
	},
	carouselSlide: {
		height: '400px',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		[theme.breakpoints.up('lg')]: {
			height: '500px'
		}
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

	// image modal state
	const [ modalOpen, setModalOpen ] = useState(false);

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

	// handle carousel click
	const handleCarouselClick = () => setModalOpen(true);

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
								<Carousel className={classes.carousel} onClickItem={() => handleCarouselClick()} showThumbs={false}>
									{offer.images.map((image, index) => {
										return (
											<div
												key={`slide-${index}`}
												className={classes.carouselSlide}
												style={{ backgroundImage: `url(/${image})` }}
											/>
										);
									})}
								</Carousel>
							</Grid>
						)}
					</Grid>
				)}
			</Container>
			{offer && <ModalImage modalOpen={modalOpen} setModalOpen={setModalOpen} images={offer.images} />}
		</div>
	);
};

// export Offer Component
export default Offer;
