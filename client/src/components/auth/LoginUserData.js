// NodeM Modules
import React, { useContext, useEffect } from 'react';
import { Typography, Box, Grid, TextField, Button } from '@material-ui/core';
import { LockOpen as LockOpenIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
// Context
import AuthContext from '../../context/auth/authContext';
import AuthValidationContext from '../../context/auth/authValidationContext';

// define styles
const useStyles = makeStyles(theme => ({
	loginModal: {
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
		[theme.breakpoints.up('sm')]: {
			width: '540px'
		}
	},
	loginHeading: {
		padding: theme.spacing(2)
	},
	title: {
		textAlign: 'center',
		fontWeight: '500'
	},
	titleSpan2: {
		color: theme.palette.primary.main
	},
	loginUserData: {
		padding: theme.spacing(3, 4)
	},
	description: {
		textAlign: 'center',
		margin: theme.spacing(0, 0, 3)
	},
	grid: {
		marginBottom: theme.spacing(3)
	},
	textfield: {
		width: '100%'
	},
	buttonIcon: {
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	}
}));

// Login Component
const Login = props => {
	// styling classes
	const classes = useStyles();

	// load authValidation context
	const authValidationContext = useContext(AuthValidationContext);
	// destructure authValidation context
	const {
		login,
		inputAuth,
		emailErr,
		passwordErr,
		clearInputErrors,
		validateLoginData,
		setInputState
	} = authValidationContext;

	// load auth context
	const authContext = useContext(AuthContext);

	// destructure props
	const { values, handleInputChange, nextStep } = props;

	// watch errors & inputAuth
	useEffect(
		() => {
			if (login && inputAuth && !emailErr && !passwordErr) {
				// set auth loading for smoother response transition
				authContext.setAuthState('SET_LOADING', true);
				// set inputAuth to true
				setInputState('INPUT_AUTH', false);
				// login user
				authContext.login({
					email: values.email,
					password: values.password
				});
				// next step
				nextStep();
			}
		},
		// eslint-disable-next-line
		[ login, inputAuth, emailErr, passwordErr ]
	);

	// continue form
	const continueForm = input => {
		//console.log(input);
		// clear errors
		clearInputErrors();
		// validate form
		validateLoginData(input);
	};

	return (
		<Box className={classes.loginUserData} width='100%'>
			<Typography className={classes.description} variant='subtitle1'>
				Please enter your user details.
			</Typography>
			<Grid className={classes.grid} width='100%' container spacing={2}>
				<Grid item xs={12} className={classes.gridItem}>
					<TextField
						id='email'
						name='email'
						className={classes.textfield}
						variant='outlined'
						label={emailErr ? emailErr : 'Email'}
						placeholder='john.doe@gmail.com'
						type='email'
						error={emailErr ? true : false}
						onChange={handleInputChange('email')}
						defaultValue={values.email}
					/>
				</Grid>
				<Grid item xs={12} className={classes.gridItem}>
					<TextField
						id='password'
						name='password'
						className={classes.textfield}
						variant='outlined'
						label={passwordErr ? passwordErr : 'Password'}
						type='password'
						error={passwordErr ? true : false}
						onChange={handleInputChange('password')}
						defaultValue={values.password}
					/>
				</Grid>
			</Grid>
			<Box width='100%' display='flex' justifyContent='flex-end'>
				<Button
					className={classes.nextButton}
					width='100%'
					variant='outlined'
					color='primary'
					startIcon={<LockOpenIcon className={classes.buttonIcon} />}
					size='large'
					onClick={() => continueForm(values)}
				>
					Login
				</Button>
			</Box>
		</Box>
	);
};

// export Login Component
export default Login;
