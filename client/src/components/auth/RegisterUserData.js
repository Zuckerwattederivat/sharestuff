// Node Modules
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, TextField } from '@material-ui/core';
import { ArrowForward as ArrowForwardIcon, Search } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
// Context
import AuthContext from '../../context/auth/authContext';

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
	const { usernameErr, emailErr, passwordErr, passwordConfirmErr, checkForDuplicateUser, clearErrors } = authContext;

	// destructure values from props
	const { values, handleInputChange, nextStep } = props;

	// continue form
	const continueForm = e => {
		e.preventDefault();

		// validate
		if (values.username === '') {
			console.log('Please choose a username');
		}
		if (!values.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
			// emailErr = 'Please enter a valid email';
		}
		if (values.password === '') {
			// passwordErr = 'Please choose a password';
		}
		if (values.passwordConfirm === '') {
			// passwordConfirmErr = 'Please confirm your password';
		}
		if (values.password !== values.passwordConfirm) {
			// passwordErr = 'Passwords do not match';
			// passwordConfirmErr = 'Passwords do not match';
		}
		if (values.password.length < 6 || values.passwordConfirm.length < 6) {
			// passwordErr = 'Passwords must be at least 6 characters long';
			// passwordConfirmErr = 'Passwords must be at least 6 characters long';
		}
	};

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
