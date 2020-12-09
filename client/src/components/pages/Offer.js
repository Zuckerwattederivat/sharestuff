// Node Modules
import React, { useState, useContext, useEffect } from 'react';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import { Container, Breadcrumbs, Link, Typography, Grid, Box } from '@material-ui/core';
import { ArrowRight as ArrowRightIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
// Context
import QueryContext from '../../context/query/queryContext';
// Components
import ModalImage from '../layout/ModalImage';
import CardMediaSm from '../cards/CardMediaSm';
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
	},
	otherOffersHeading: {
		fontSize: '1.15rem',
		fontWeight: 500,
		margin: theme.spacing(2, 0, 1, 1)
	},
	spanPrimary: {
		color: theme.palette.primary.main
	},
	noOffersContainer: {
		height: '70vh',
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
		height: '200px'
	}
}));

// Offer Component
const Offer = props => {
	// define classes
	const classes = useStyles();

	// load query context
	const queryContext = useContext(QueryContext);
	// destructure query context
	const { errors, loading, categories, offers, offer, creator, searchCached, setOfferState } = queryContext;

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

	// handle cards click
	const handleCardsClick = elId => {
		// scroll to top
		window.scrollTo(0, 0);

		// update url param
		props.history.push(`/offers/offer?id=${elId}`);
		// get url params
		const urlParams = new URLSearchParams(window.location.search);
		// set search params
		const id = urlParams.get('id');

		// set offer state
		setOfferState(id);
	};

	return (
		<div className={classes.offer}>
			<Container className={classes.container} maxWidth='xl'>
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
				) : offer ? (
					<Grid container className={classes.contentBox} width='100%' spacing={3}>
						<Grid item xs={12} md={7} lg={8}>
							<Carousel className={classes.carousel} onClickItem={() => setModalOpen(true)} showThumbs={false}>
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
						<Grid item md={5} lg={4}>
							{offers &&
							creator && (
								<Grid container width='100%' spacing={2}>
									<Grid item xs={12}>
										<CardMediaSm
											className={classes.sideCards}
											image={creator.avatar}
											title={creator.username}
											location={creator.city}
											link={`/user?id=${creator._id}`}
										>
											{creator.bio ? creator.bio : 'No Bio...'}
										</CardMediaSm>
									</Grid>
									<Typography className={classes.otherOffersHeading} variant='h3'>
										More Offers by <span className={classes.spanPrimary}>{creator.username}</span>
									</Typography>
									{offers.map((el, index) => {
										return (
											<Grid item xs={12} key={`user-offers-${index}`}>
												<CardMediaSm
													className={classes.sideCards}
													image={`/${el.imagesThumb[0]}`}
													title={el.title}
													onClick={() => handleCardsClick(el._id)}
													price={`${el.price} ${el.currency} daily`}
													location={el.location.label}
													btnName='View'
													btnIcon={<ArrowRightIcon />}
													creator={creator.username}
												>
													{el.description.join(' ').length > 50 ? (
														el.description.join(' ').substring(0, 50) + '...'
													) : (
														el.description.join(' ')
													)}
												</CardMediaSm>
											</Grid>
										);
									})}
								</Grid>
							)}
						</Grid>
					</Grid>
				) : (
					<Box className={classes.noOffersContainer} width='100%' height='100%'>
						<img className={classes.notFoundSvg} src={NotFoundSvg} alt='Empty' />
						<Typography variant='h3'>{errors && errors}</Typography>
						<Typography variant='body1'>Sorry something went wrong, please make sure the offer exists.</Typography>
					</Box>
				)}
			</Container>
			{offer && <ModalImage modalOpen={modalOpen} setModalOpen={setModalOpen} images={offer.images} />}
		</div>
	);
};

// export Offer Component
export default withRouter(Offer);
