// Node Modules
import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Modal, Backdrop, Box, Typography, Button } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
// Components
import Alerts from './Alerts';
// Assets
import LoadingGif from '../../assets/loading-transparent.gif';
import CheckMarkGif from '../../assets/check-mark-transparent.gif';
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
		padding: theme.spacing(4, 4),
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
			margin: theme.spacing(4, 0, 1.5)
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

	const handleModalClose = () => {
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
				<div className={classes.paper}>
					{props.loading ? (
						<Box width='100%' display='flex' justifyContent='center' alignItems='center'>
							<img className={classes.loadingGif} src={props.loadingGif} alt='loading' />
						</Box>
					) : props.error ? (
						<Box width='100%' className={classes.responseContainer}>
							<img className={classes.messageSvg} src={props.errorSvg} alt='errors' />
							<Typography variant='h3' color='secondary'>
								{props.errorHeading}
							</Typography>
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
							<Typography variant='h3' color='primary'>
								{props.successHeading}
							</Typography>
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
				</div>
			</Modal>
		</div>
	);
};

// PropTypes
ModalResponse.propTypes = {
	setModalOpen: PropTypes.func.isRequired,
	modalOpen: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	loadingGif: PropTypes.string.isRequired,
	successSvg: PropTypes.string.isRequired,
	errorSvg: PropTypes.string.isRequired,
	error: PropTypes.string
};

// default props
ModalResponse.defaultProps = {
	loading: true,
	error: null,
	errorHeading: 'Something went wrong',
	errorText: 'Please try again',
	successHeading: 'You booked the offer successfully',
	successText: 'Go to your messages to contact the vendor',
	loadingGif: LoadingGif,
	successSvg: CheckMarkGif,
	errorSvg: ErrorSvg
};

// export ModalResponse
export default ModalResponse;
