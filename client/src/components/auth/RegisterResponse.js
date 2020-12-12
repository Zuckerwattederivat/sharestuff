// Node Modules
import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button } from '@material-ui/core';
import { Close as CloseIcon, ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
// Components
import Alerts from '../layout/Alerts';
// Context
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import NavbarContext from '../../context/navbar/navbarContext';
// Assets
import LoadingGif from '../../assets/loading-transparent.gif';
import CheckMarkGif from '../../assets/check-mark-transparent.gif';
import ErrorSvg from '../../assets/undraw/cancel.svg';

// define styles
const useStyles = makeStyles(theme => ({
	RegisterResponse: {
		padding: theme.spacing(3, 4),
		overflow: 'hidden'
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
	response: {
		fontSize: '1.5rem',
		fontWeight: 700,
		textAlign: 'center',
		width: '100%',
		margin: theme.spacing(1.5, 0, 3)
	},
	buttonContainer: {
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'space-between'
		}
	},
	prevButton: {
		[theme.breakpoints.down('xs')]: {
			width: '47%'
		},
		marginRight: theme.spacing(1)
	},
	closeButton: {
		[theme.breakpoints.down('xs')]: {
			width: '47%'
		}
	},
	buttonIcon: {
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	}
}));

// RegisterResponse Component
const RegisterResponse = props => {
	// styling classes
	const classes = useStyles();

	// load auth context
	const authContext = useContext(AuthContext);
	// destructure auth context
	const { loading, error, isAuthenticated, clearErrors } = authContext;

	// load alert context
	const alertContext = useContext(AlertContext);
	// destructure alert context
	const { setAlert, removeAllAlerts } = alertContext;

	// load navbar context
	const navbarContext = useContext(NavbarContext);
	// destructure context
	const { setRegisterOpen } = navbarContext;

	// destructure props
	const { setParentState, prevStep } = props;

	// set alerts if errors occure
	useEffect(
		() => {
			error &&
				error.map(error => {
					return setAlert(error.msg, 'error', 'unlimited');
				});
		},
		// eslint-disable-next-line
		[ error ]
	);

	// RenderResponse
	const RenderResponse = props => {
		// destructure props
		const { loading, prevStep } = props;

		// go back
		const goBack = () => {
			// clear auth errors
			clearErrors();
			// remove alerts
			removeAllAlerts();
			// previous step
			prevStep();
		};

		// close register
		const closeRegister = () => {
			// clear auth errors
			clearErrors();
			// remove alerts
			removeAllAlerts();
			// reset step
			setParentState('step', 1);
			// close register
			setRegisterOpen(false);
		};

		switch (loading) {
			case true:
				return (
					<Box width='100%' display='flex' justifyContent='center' className={classes.loadingContainer}>
						<img className={classes.loadingGif} src={LoadingGif} alt='Loading...' />
					</Box>
				);
			case false:
				return (
					<Box
						width='100%'
						display='flex'
						alignItems='center'
						flexDirection='column'
						className={classes.responseContainer}
					>
						{isAuthenticated ? (
							<Fragment>
								<img className={classes.messageSvg} src={CheckMarkGif} alt='Success' />
								<Typography className={classes.response} variant='h5' color='primary'>
									Your account has been created successfully!
								</Typography>
								<Box width='100%' display='flex' justifyContent='flex-end'>
									<Button
										className={classes.closeButton}
										width='100%'
										variant='outlined'
										startIcon={<CloseIcon className={classes.buttonIcon} />}
										size='large'
										onClick={() => closeRegister()}
									>
										Close
									</Button>
								</Box>
							</Fragment>
						) : (
							<Fragment>
								<img className={classes.messageSvg} src={ErrorSvg} alt='Add User Drawing' />
								<div className={classes.response}>
									<Typography className={classes.response} variant='h5' color='secondary'>
										Somethin went wrong :(
									</Typography>
									<Alerts />
								</div>
								<Box className={classes.buttonContainer} width='100%' display='flex' justifyContent='flex-end'>
									<Button
										className={classes.prevButton}
										width='100%'
										variant='outlined'
										startIcon={<ArrowBackIcon className={classes.buttonIcon} />}
										size='large'
										onClick={() => goBack()}
									>
										Go Back
									</Button>
									<Button
										className={classes.closeButton}
										width='100%'
										variant='outlined'
										color='secondary'
										startIcon={<CloseIcon className={classes.buttonIcon} />}
										size='large'
										onClick={() => closeRegister()}
									>
										Close
									</Button>
								</Box>
							</Fragment>
						)}
					</Box>
				);
			default:
				return <Box width='100%' className={classes.loadingContainer} />;
		}
	};

	return (
		<Box className={classes.RegisterResponse} width='100%' height='100%'>
			<RenderResponse loading={loading} setParentState={setParentState} prevStep={prevStep} />
		</Box>
	);
};

// PropTypes
RegisterResponse.propTypes = {
	values: PropTypes.object.isRequired,
	setParentState: PropTypes.func.isRequired,
	prevStep: PropTypes.func.isRequired
};

// export RegisterResponse Component
export default RegisterResponse;
