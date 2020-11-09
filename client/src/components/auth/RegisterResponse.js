// Node Modules
import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, Grid } from '@material-ui/core';
import { Close as CloseIcon, ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
// Context
import AuthContext from '../../context/auth/authContext';
import NavbarContext from '../../context/navbar/navbarContext';
// Assets
import LoadingGif from '../../assets/loading-transparent.gif';
import ConfirmedSvg from '../../assets/undraw/confirmed.svg';
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
		textAlign: 'center',
		width: '100%',
		margin: theme.spacing(3, 0, 3)
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
	const { loading, error, isAuthenticated, setState } = authContext;

	// load navbar context
	const navbarContext = useContext(NavbarContext);
	// destructure context
	const { setRegisterOpen } = navbarContext;

	// destructure props
	const { setParentState, prevStep } = props;

	// RenderResponse
	const RenderResponse = props => {
		// destructure props
		const { loading, error, prevStep } = props;

		// close register
		const closeRegister = () => {
			setParentState('step', 1);
			setState('SET_LOADING', true);
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
								<img className={classes.messageSvg} src={ConfirmedSvg} alt='Add User Drawing' />
								<Typography className={classes.response} variant='h5'>
									Your account has been created successfully!
								</Typography>
								<Box className={classes.buttonContainer} width='100%' display='flex' justifyContent='flex-end'>
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
								<Grid className={classes.response} width='100%' container spacing={1}>
									{error.errors.map(err => {
										return (
											<Grid key={`error-item-${err.param}`} item xs={12}>
												<Alert key={`error-alert-${err.param}`} severity='error'>
													{err.msg}
												</Alert>
											</Grid>
										);
									})}
								</Grid>
								<Box className={classes.buttonContainer} width='100%' display='flex' justifyContent='flex-end'>
									<Button
										className={classes.prevButton}
										width='100%'
										variant='outlined'
										startIcon={<ArrowBackIcon className={classes.buttonIcon} />}
										size='large'
										onClick={prevStep}
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
			<RenderResponse loading={loading} error={error} setParentState={setParentState} prevStep={prevStep} />
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
