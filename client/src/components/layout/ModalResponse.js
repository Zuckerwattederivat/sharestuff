// Node Modules
import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Modal, Backdrop, Box, Typography, Button } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
// Context
import AlertContext from '../../context/alert/alertContext';
// Components
import Alerts from './Alerts';
// Assets
import LoadingGif from '../../assets/loading-transparent.gif';
import ConfirmedSvg from '../../assets/undraw/confirmed.svg';
import ErrorSvg from '../../assets/undraw/cancel.svg';

// define styles
const useStyles = makeStyles(theme => ({
	responseModal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	paper: {
		backgroundColor: theme.palette.background.custom,
		boxShadow: theme.shadows[5],
		outline: 'none',
		borderRadius: '10px',
		color: '#fff',
		width: '90%',
		padding: theme.spacing(3, 4),
		[theme.breakpoints.up('sm')]: {
			width: '540px'
		}
	},
	loadingGif: {
		maxHeight: '450px',
		maxWidth: '100%',
		[theme.breakpoints.up('sm')]: {
			maxHeight: '250px'
		}
	},
	messageSvg: {
		maxHeight: '450px',
		maxWidth: '100%',
		[theme.breakpoints.up('sm')]: {
			maxHeight: '250px'
		}
	},
	responseContainer: {
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

// ModalResponse Component
const ModalResponse = props => {
	// styling classes
	const classes = useStyles();

	// load alert context
	const alertContext = useContext(AlertContext);
	// destructure alert context
	const { setAlert, removeAllAlerts } = alertContext;

	// set alerts if errors occure
	useEffect(
		() => {
			props.errors &&
				props.errors.map(error => {
					return setAlert(error, 'error', 'unlimited');
				});
		},
		// eslint-disable-next-line
		[ props.errors ]
	);

	const handleModalClose = () => {
		// remove alerts
		removeAllAlerts();
		// close modal
		props.setModalOpen(false);
	};

	return (
		<div>
			<Modal
				className={classes.responseModal}
				aria-labelledby='response-modal-title'
				aria-describedby='response-modal-description'
				open={props.modalOpen}
				onClose={() => handleModalClose()}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}
			>
				<motion.div
					className={classes.paper}
					transition={{
						duration: 0.6,
						type: 'spring',
						damping: 10,
						stiffness: 70
					}}
					initial={{ y: '100vh' }}
					animate={{ y: 0 }}
				>
					{props.loading ? (
						<Box width='100%' display='flex' justifyContent='center' alignItems='center'>
							<img className={classes.loadingGif} src={props.loadingGif} alt='loading' />
						</Box>
					) : props.errors[0] ? (
						<Box width='100%' className={classes.responseContainer}>
							<img className={classes.messageSvg} src={props.errorSvg} alt='errors' />
							<Typography variant='h3'>{props.errorHeading}</Typography>
							<Typography variant='body1'>{props.errorText}</Typography>
							<Alerts />
							<Box width='100%' display='flex' justifyContent='flex-end' marginTop={4}>
								<Button
									variant='outlined'
									color='inherit'
									startIcon={<CloseIcon className={classes.buttonIcon} />}
									onClick={() => handleModalClose()}
								>
									Close
								</Button>
							</Box>
						</Box>
					) : (
						<Box width='100%' className={classes.responseContainer}>
							<img className={classes.messageSvg} src={props.successSvg} alt='success' />
							<Typography variant='h3'>{props.successHeading}</Typography>
							<Typography variant='body1'>{props.successText}</Typography>
							<Box width='100%' display='flex' justifyContent='flex-end' marginTop={4}>
								<Button
									variant='outlined'
									color='inherit'
									startIcon={<CloseIcon className={classes.buttonIcon} />}
									onClick={() => handleModalClose()}
								>
									Close
								</Button>
							</Box>
						</Box>
					)}
				</motion.div>
			</Modal>
		</div>
	);
};

// PropTypes
ModalResponse.propTypes = {
	setModalOpen: PropTypes.func.isRequired,
	modalOpen: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	errors: PropTypes.array.isRequired,
	loadingGif: PropTypes.string.isRequired,
	successSvg: PropTypes.string.isRequired,
	errorSvg: PropTypes.string.isRequired
};

// default props
ModalResponse.defaultProps = {
	loading: true,
	errors: [],
	errorHeading: 'Something went wrong',
	errorText: 'Please try again',
	successHeading: 'You booked the offer successfully',
	successText: 'Go to your messages to contact the vendor',
	loadingGif: LoadingGif,
	successSvg: ConfirmedSvg,
	errorSvg: ErrorSvg
};

// export ModalResponse
export default ModalResponse;
