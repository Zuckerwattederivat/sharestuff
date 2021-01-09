// Node Modules
import React, { useContext, useEffect, Fragment } from 'react';
import { Link as RouterLink, withRouter, Redirect } from 'react-router-dom';
import { Container, Box, Breadcrumbs, Link, Grid, Typography, Button } from '@material-ui/core';
import { Build as BuildIcon, Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
// Context
import AuthContext from '../../context/auth/authContext';
import QueryContext from '../../context/query/queryContext';
import ProfileContext from '../../context/profile/profileContext';
// Components
import CardMediaV3 from '../cards/CardMediaV3';
import CardPictureV2 from '../cards/CardPictureV2';
import Pagination from '../layout/Pagination';
import ModalDelete from '../layout/ModalDelete';
import ModalAdd from '../layout/ModalAdd';
import ModalEdit from '../layout/ModalEdit';
// Assets
import LoadingGif from '../../assets/loading-transparent.gif';
import EmptySvg from '../../assets/undraw/empty.svg';
import AddOfferBackground from '../../assets/site/add-offer.jpg';

// define styles
const useStyles = makeStyles(theme => ({
	textPrimary: {
		color: theme.palette.primary.main
	},
	profile: {
		minHeight: '100vh',
		padding: theme.spacing(20, 0, 8)
	},
	breadcrumps: {
		margin: theme.spacing(0, 0, 4)
	},
	contentBox: {
		marginTop: theme.spacing(2)
	},
	loadingGif: {
		height: '20vh'
	},
	title: {
		fontSize: '1.7rem',
		fontWeight: 700,
		margin: theme.spacing(0, 0, 3)
	},
	noOffersContainer: {
		marginTop: theme.spacing(12),
		minHeight: '50vh',
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
	},
	emptySvg: {
		height: '200px'
	},
	offersCard: {
		height: '100%'
	},
	btnOpenModal: {
		marginTop: theme.spacing(2)
	}
}));

// Profile Component
const Profile = props => {
	// define classes
	const classes = useStyles();

	// load authContext
	const authContext = useContext(AuthContext);
	const { user } = authContext;

	// load query context
	const queryContext = useContext(QueryContext);
	const { errors, loading, page, pageCount, offers, getUserOffers, getUserBookings, setPage } = queryContext;

	// load profile context
	const profileContext = useContext(ProfileContext);
	const { tabLocation, redirect, setModal, setTabLocation, setRedirect } = profileContext;

	// on page load
	useEffect(() => {
		// scroll to top
		window.scrollTo(0, 0);
		// eslint-disable-next-line
	}, []);

	// set tabLocation
	useEffect(
		() => {
			const tabLocation = props.history.location.search.split('=')[1];
			if (tabLocation === 'offers' || tabLocation === 'bookings' || tabLocation === 'messages') {
				setTabLocation(tabLocation);
			} else {
				setRedirect(true);
			}
		},
		// eslint-disable-next-line
		[ props.history.location.search ]
	);

	// query content on tab change
	useEffect(
		() => {
			if (tabLocation === 'offers') getUserOffers();
			if (tabLocation === 'bookings') getUserBookings();
			if (tabLocation === 'messages') console.log('messages query');
		},
		// eslint-disable-next-line
		[ tabLocation ]
	);

	// handle pagination
	const handlePagination = (e, value) => {
		// scroll to top of results
		window.scroll(0, 0);
		// set page
		setPage(value);
	};

	return (
		<div className={classes.profile}>
			<Container maxWidth='xl'>
				<Breadcrumbs className={classes.breadcrumps}>
					<Link component={RouterLink} to='/' color='inherit'>
						Home
					</Link>
					<Typography color='textPrimary'>
						{user && tabLocation ? (
							`${user.username}'s ${tabLocation.charAt(0).toUpperCase() + tabLocation.slice(1)}`
						) : (
							'Profile'
						)}
					</Typography>
				</Breadcrumbs>
				{tabLocation === 'offers' &&
					(loading ? (
						<Box className={classes.contentBox} width='100%' textAlign='center'>
							<img className={classes.loadingGif} src={LoadingGif} alt='loading...' />
						</Box>
					) : offers[0] ? (
						<Fragment>
							<Typography className={classes.title} width='100%' variant='h2'>
								Your <span className={classes.textPrimary}>Offers</span>
							</Typography>
							<Grid className={classes.offersGrid} container width='100%' spacing={3}>
								<Grid item xs={12} sm={6} md={4}>
									<motion.div
										className={classes.offersCard}
										transition={{
											duration: 1,
											type: 'tween'
										}}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
									>
										<CardPictureV2
											image={AddOfferBackground}
											title='New'
											active={false}
											onClick={() => setModal('add', true)}
											icon={<AddIcon fontSize='large' />}
										/>
									</motion.div>
								</Grid>
								{offers.map(el => {
									return (
										<Grid key={el._id} item xs={12} sm={6} md={4}>
											<motion.div
												className={classes.offersCard}
												transition={{
													duration: 1,
													type: 'tween'
												}}
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
											>
												<CardMediaV3
													price={`${el.price} ${el.currency} daily`}
													link={`/profile/offer/edit?id=${el._id}`}
													image={`${el.imagesThumb[0]}`}
													title={el.title}
													button1={{
														name: 'Edit',
														colorExtra: 'edit',
														size: 'small',
														variant: 'contained',
														color: 'inherit',
														startIcon: <BuildIcon />,
														onClick: () => setModal('edit', true, el)
													}}
													button2={{
														name: 'Delete',
														size: 'small',
														variant: 'contained',
														color: 'secondary',
														startIcon: <DeleteIcon />,
														onClick: () => setModal('delete', true, el)
													}}
													location={el.location.label}
												>
													<Typography className={classes.cardParagraph} variant='body1'>
														{el.description.join(' ').length > 150 ? (
															el.description.join(' ').substring(0, 150) + '...'
														) : (
															el.description.join(' ')
														)}
													</Typography>
												</CardMediaV3>
											</motion.div>
										</Grid>
									);
								})}
							</Grid>
							<Pagination page={page} pageCount={pageCount} onChange={handlePagination} />
						</Fragment>
					) : (
						<Box className={classes.noOffersContainer} width='100%' height='100%'>
							<img className={classes.emptySvg} src={EmptySvg} alt='Empty' />
							<Typography variant='h3'>{errors}</Typography>
							<Typography variant='body1'>You can see your offers here after you created one.</Typography>
							<Button
								className={classes.btnOpenModal}
								size='large'
								variant='outlined'
								color='primary'
								onClick={() => setModal(true, null, 'add')}
								startIcon={<AddIcon />}
							>
								Create Offer
							</Button>
						</Box>
					))}
				{tabLocation === 'bookings' &&
					(loading ? (
						<Box className={classes.contentBox} width='100%' textAlign='center'>
							<img className={classes.loadingGif} src={LoadingGif} alt='loading...' />
						</Box>
					) : (
						<div>Bookings</div>
					))}
				{tabLocation === 'messages' &&
					(loading ? (
						<Box className={classes.contentBox} width='100%' textAlign='center'>
							<img className={classes.loadingGif} src={LoadingGif} alt='loading...' />
						</Box>
					) : (
						<div>Messages</div>
					))}
			</Container>
			<ModalDelete />
			<ModalAdd />
			<ModalEdit />
			{redirect && <Redirect to='/profile?tab=offers' />}
		</div>
	);
};

// export Profile Component
export default withRouter(Profile);
