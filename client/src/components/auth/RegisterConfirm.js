// Node Modules
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, TextField, Grid } from '@material-ui/core';
import { PersonAdd as PersonAddIcon, ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
// Context
import AuthContext from '../../context/auth/authContext';
import AuthValidationContext from '../../context/auth/authValidationContext';

// define styles
const useStyles = makeStyles(theme => ({
	registerConfirm: {
		padding: theme.spacing(3, 4)
	},
	description: {
		textAlign: 'center',
		margin: theme.spacing(0, 0, 3)
	},
	grid: {
		marginBottom: theme.spacing(3)
	},
	gridItem: {},
	textfield: {
		width: '100%'
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
	registerButton: {
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

// RegisterConfirm Component
const RegisterConfirm = props => {
	// styling classes
	const classes = useStyles();

	// load auth context
	const authContext = useContext(AuthContext);

	// load authvalidation context
	const authValidationContext = useContext(AuthValidationContext);
	// destructure auth context
	const {
		usernameErr,
		emailErr,
		firstnameErr,
		lastnameErr,
		countryErr,
		phoneErr,
		addressErr,
		zipCodeErr,
		cityErr,
		clearInputErrors,
		countryAuto
	} = authValidationContext;

	// destructure props
	const { values, nextStep, prevStep } = props;

	// continue form
	const continueForm = input => {
		//console.log(input);
		// clear errors
		clearInputErrors();
		// validate form
		nextStep();
		// register
		authContext.register({
			username: input.username,
			email: input.email,
			password: input.password,
			firstname: input.firstname,
			lastname: input.lastname,
			country: countryAuto,
			phone: input.phone,
			address: input.address,
			city: input.city,
			zipCode: input.zipCode
		});
	};

	return (
		<Box className={classes.registerConfirm} width='100%'>
			<Typography className={classes.description} variant='subtitle1'>
				Please confirm your data.
			</Typography>
			<Grid className={classes.grid} width='100%' container spacing={2}>
				<Grid item xs={12} md={6} className={classes.gridItem}>
					<TextField
						id='username'
						name='username'
						className={classes.textfield}
						size='small'
						variant='outlined'
						label={usernameErr ? usernameErr : 'Username'}
						placeholder='toolsmaster'
						type='text'
						error={usernameErr ? true : false}
						defaultValue={values.username}
						disabled={true}
					/>
				</Grid>
				<Grid item xs={12} md={6} className={classes.gridItem}>
					<TextField
						id='email'
						name='email'
						className={classes.textfield}
						size='small'
						variant='outlined'
						label={emailErr ? emailErr : 'Email'}
						placeholder='john.doe@gmail.com'
						type='email'
						error={emailErr ? true : false}
						defaultValue={values.email}
						disabled={true}
					/>
				</Grid>
				<Grid item xs={12} md={6} className={classes.gridItem}>
					<TextField
						id='firstname'
						name='firstname'
						className={classes.textfield}
						size='small'
						variant='outlined'
						label={firstnameErr ? firstnameErr : 'First Name'}
						placeholder='John'
						type='text'
						error={firstnameErr ? true : false}
						defaultValue={values.firstname}
						disabled={true}
					/>
				</Grid>
				<Grid item xs={12} md={6} className={classes.gridItem}>
					<TextField
						id='lastname'
						name='lastname'
						className={classes.textfield}
						size='small'
						variant='outlined'
						label={lastnameErr ? lastnameErr : 'Last Name'}
						placeholder='Doe'
						type='text'
						error={lastnameErr ? true : false}
						defaultValue={values.lastname}
						disabled={true}
					/>
				</Grid>
				<Grid item xs={12} md={4} className={classes.gridItem}>
					<TextField
						id='country'
						name='country'
						className={classes.textfield}
						size='small'
						variant='outlined'
						label={countryErr ? countryErr : 'Country'}
						placeholder='Germany'
						type='text'
						error={countryErr ? true : false}
						defaultValue={countryAuto.label}
						disabled={true}
					/>
				</Grid>
				<Grid item xs={12} md={8} className={classes.gridItem}>
					<TextField
						id='phone'
						name='phone'
						className={classes.textfield}
						size='small'
						variant='outlined'
						label={phoneErr ? phoneErr : 'Phone Number'}
						placeholder='1767777777'
						type='number'
						error={phoneErr ? true : false}
						defaultValue={values.phone}
						disabled={true}
					/>
				</Grid>
				<Grid item xs={12} md={5} className={classes.gridItem}>
					<TextField
						id='address'
						name='address'
						className={classes.textfield}
						size='small'
						variant='outlined'
						label={addressErr ? addressErr : 'Address'}
						placeholder='Heiligengeistfeld 15'
						type='text'
						error={addressErr ? true : false}
						defaultValue={values.address}
						disabled={true}
					/>
				</Grid>
				<Grid item xs={6} md={3} className={classes.gridItem}>
					<TextField
						id='zipCode'
						name='zipCode'
						className={classes.textfield}
						size='small'
						variant='outlined'
						label={zipCodeErr ? zipCodeErr : 'Zip Code'}
						placeholder='20359'
						type='number'
						error={zipCodeErr ? true : false}
						defaultValue={values.zipCode}
						disabled={true}
					/>
				</Grid>
				<Grid item xs={6} md={4} className={classes.gridItem}>
					<TextField
						id='city'
						name='city'
						className={classes.textfield}
						size='small'
						variant='outlined'
						label={cityErr ? cityErr : 'City'}
						placeholder='Heiligengeistfeld 15'
						type='text'
						error={cityErr ? true : false}
						defaultValue={values.city}
						disabled={true}
					/>
				</Grid>
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
					className={classes.registerButton}
					width='100%'
					variant='outlined'
					color='primary'
					startIcon={<PersonAddIcon className={classes.buttonIcon} />}
					size='large'
					onClick={() => continueForm(values)}
				>
					Register
				</Button>
			</Box>
		</Box>
	);
};

// PropTypes
RegisterConfirm.propTypes = {
	prevStep: PropTypes.func.isRequired,
	nextStep: PropTypes.func.isRequired,
	values: PropTypes.object.isRequired
};

// export RegisterConfirm Component
export default RegisterConfirm;
