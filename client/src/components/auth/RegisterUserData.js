// Node Modules
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, TextField } from '@material-ui/core';
import { ArrowForward as ArrowForwardIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
// Context
import AuthContext from '../../context/auth/authContext';
import { USERNAME_ERROR, EMAIL_ERROR, PASSWORD_ERROR, PASSWORD_CONFIRM_ERROR } from '../../context/types';

// define styles
const useStyles = makeStyles(theme => ({
	registerUserData: {
		padding: theme.spacing(3, 4)
	},
	description: {
		textAlign: 'center',
		margin: theme.spacing(0, 0, 3)
	},
	textfield: {
		width: '100%',
		marginBottom: theme.spacing(3)
	},
	nextButton: {
		width: '100%'
	}
}));

// RegisterUserData Component
const RegisterUserData = props => {
	// styling classes
	const classes = useStyles();

	// load auth context
	const authContext = useContext(AuthContext);
	// destructure auth context
	const {
		loading,
		usernameErr,
		emailErr,
		passwordErr,
		passwordConfirmErr,
		checkForDuplicateUser,
		setState,
		clearErrors
	} = authContext;

	// destructure props
	const { values, handleInputChange, nextStep } = props;

	// continue form
	const continueForm = e => {
		// prevent default and clear remaining errors
		e.preventDefault();
		clearErrors();

		// validate
		if (values.username === '') {
			setState(USERNAME_ERROR, 'Please choose a username');
		} else {
			checkForDuplicateUser(values.username, null, USERNAME_ERROR, 'Username is already taken');
		}
		if (!values.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
			setState(EMAIL_ERROR, 'Please enter a valid email');
		} else {
			checkForDuplicateUser(null, values.email, EMAIL_ERROR, 'Email already exists');
		}
		if (values.password === '') {
			setState(PASSWORD_ERROR, 'Please choose a password');
		}
		if (values.passwordConfirm === '') {
			setState(PASSWORD_CONFIRM_ERROR, 'Please confirm your password');
		} else if (values.password !== values.passwordConfirm) {
			setState(PASSWORD_ERROR, 'Passwords do not match');
			setState(PASSWORD_CONFIRM_ERROR, 'Passwords do not match');
		} else if (values.password.length < 6 || values.passwordConfirm.length < 6) {
			setState(PASSWORD_ERROR, 'Password must be at least 6 characters long');
			setState(PASSWORD_CONFIRM_ERROR, 'Password must be at least 6 characters long');
		}
	};

	useEffect(
		() => {
			if (!loading && !usernameErr && !emailErr && !passwordErr && !passwordConfirmErr) {
				nextStep();
			}
		},
		[ loading, usernameErr, emailErr, passwordErr, passwordConfirmErr ]
	);

	return (
		<Box className={classes.registerUserData} width='100%'>
			<Typography className={classes.description} variant='subtitle1'>
				Please enter your user details.
			</Typography>
			<TextField
				className={classes.textfield}
				variant='outlined'
				label={usernameErr ? usernameErr : 'Username'}
				placeholder='Toolsmaster121'
				type='username'
				error={usernameErr ? true : false}
				onChange={handleInputChange('username')}
				defaultValue={values.username}
			/>
			<TextField
				className={classes.textfield}
				name='email'
				variant='outlined'
				label={emailErr ? emailErr : 'Email'}
				placeholder='john.doe@gmail.com'
				type='email'
				error={emailErr ? true : false}
				onChange={handleInputChange('email')}
				defaultValue={values.email}
			/>
			<TextField
				className={classes.textfield}
				name='password'
				variant='outlined'
				label={passwordErr ? passwordErr : 'Password'}
				type='password'
				error={passwordErr ? true : false}
				onChange={handleInputChange('password')}
				defaultValue={values.password}
			/>
			<TextField
				className={classes.textfield}
				name='passwordConfirm'
				variant='outlined'
				label={passwordConfirmErr ? passwordConfirmErr : 'Confirm Password'}
				type='password'
				error={passwordConfirmErr ? true : false}
				onChange={handleInputChange('passwordConfirm')}
				defaultValue={values.passwordConfirm}
			/>
			<Button
				className={classes.nextButton}
				width='100%'
				variant='outlined'
				color='primary'
				endIcon={<ArrowForwardIcon />}
				onClick={continueForm}
				size='large'
			>
				Next
			</Button>
		</Box>
	);
};

// PropTypes
RegisterUserData.propTypes = {
	nextStep: PropTypes.func.isRequired,
	handleInputChange: PropTypes.func.isRequired,
	values: PropTypes.object.isRequired
};

// export RegisterUserData Component
export default RegisterUserData;
