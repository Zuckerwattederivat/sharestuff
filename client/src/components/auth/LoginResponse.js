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
// Assets
import LoadingGif from '../../assets/loading-transparent.gif';
import WelcomeSvg from '../../assets/undraw/welcome.svg';
import ErrorSvg from '../../assets/undraw/cancel.svg';

// define styles
const useStyles = makeStyles(theme => ({
	LoginResponse: {
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

// LoginResponse Component
const LoginResponse = props => {
	// styling classes
	const classes = useStyles();

	// load auth context
	const authContext = useContext(AuthContext);
	// destructure auth context
	const { user, loading, error, isAuthenticated, clearErrors } = authContext;

	// load alert context
	const alertContext = useContext(AlertContext);
	// destructure alert context
	const { setAlert, removeAllAlerts } = alertContext;

	// destructure props
	const { setParentState, prevStep, closeLogin } = props;

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

		// close login
		const close = () => {
			// clear auth errors
			clearErrors();
			// remove alerts
			removeAllAlerts();
			// close login
			closeLogin();
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
								<img className={classes.messageSvg} src={WelcomeSvg} alt='Add User Drawing' />
								<Typography className={classes.response} variant='h5' color='primary'>
									Welcome back {user && user.username}!
								</Typography>
								<Box width='100%' display='flex' justifyContent='flex-end'>
									<Button
										className={classes.closeButton}
										width='100%'
										variant='outlined'
										startIcon={<CloseIcon className={classes.buttonIcon} />}
										size='large'
										onClick={() => close()}
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
										Something went wrong :(
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
										onClick={() => close()}
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
		<Box className={classes.LoginResponse} width='100%' height='100%'>
			<RenderResponse loading={loading} setParentState={setParentState} prevStep={prevStep} />
		</Box>
	);
};

// PropTypes
LoginResponse.propTypes = {
	values: PropTypes.object.isRequired,
	setParentState: PropTypes.func.isRequired,
	closeLogin: PropTypes.func.isRequired,
	prevStep: PropTypes.func.isRequired
};

// export LoginResponse
export default LoginResponse;
