// Node Modules
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, TextField, Grid } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ArrowForward as ArrowForwardIcon, ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
// Context
import AuthContext from '../../context/auth/authContext';
// utils
import countries from '../../utils/countries';

// define styles
const useStyles = makeStyles(theme => ({
	registerUserDetails: {
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
	nextButton: {
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

// country to flag
const countryToFlag = isoCode => {
	return typeof String.fromCodePoint !== 'undefined'
		? isoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))
		: isoCode;
};

// RegisterPersonalData Component
const RegisterPersonalData = props => {
	// styling classes
	const classes = useStyles();

	// load auth context
	const authContext = useContext(AuthContext);
	// destructure auth context
	const {
		loading,
		firstnameErr,
		lastnameErr,
		addressErr,
		countryErr,
		countryAuto,
		countryLabel,
		phoneErr,
		zipCodeErr,
		cityErr,
		setState,
		clearErrors,
		validatePersonalData
	} = authContext;

	// destructure props
	const { values, handleInputChange, nextStep, prevStep } = props;

	// watch errors & loading
	useEffect(
		() => {
			if (!loading && !firstnameErr && !lastnameErr && !countryErr && !phoneErr && !addressErr && !zipCodeErr) {
				// change country label state based on state of countryAuto
				setState('SET_COUNTRY_LABEL', countryAuto.label);
				// set loading to true
				setState('SET_LOADING', true);
				// go to next page
				nextStep();
			}
		},
		// eslint-disable-next-line
		[ loading, firstnameErr, lastnameErr, countryErr, phoneErr, addressErr, zipCodeErr ]
	);

	// continue form
	const continueForm = (input, countryAuto) => {
		// add countryAuto to input
		input.countryAuto = countryAuto;
		//console.log(input);
		// clear errors
		clearErrors();
		// validate form
		validatePersonalData(input);
	};

	return (
		<Box className={classes.registerUserDetails} width='100%'>
			<Typography className={classes.description} variant='subtitle1'>
				Please enter your personal details.
			</Typography>
			<Grid className={classes.grid} width='100%' container spacing={2}>
				<Grid item xs={12} md={6} className={classes.gridItem}>
					<TextField
						id='firstname'
						name='firstname'
						className={classes.textfield}
						variant='outlined'
						label={firstnameErr ? firstnameErr : 'First Name'}
						placeholder='John'
						type='text'
						error={firstnameErr ? true : false}
						onChange={handleInputChange('firstname')}
						defaultValue={values.firstname}
					/>
				</Grid>
				<Grid item xs={12} md={6} className={classes.gridItem}>
					<TextField
						id='lastname'
						name='lastname'
						className={classes.textfield}
						variant='outlined'
						label={lastnameErr ? lastnameErr : 'Last Name'}
						placeholder='Doe'
						type='text'
						error={lastnameErr ? true : false}
						onChange={handleInputChange('lastname')}
						defaultValue={values.lastname}
					/>
				</Grid>
				<Grid item xs={12} md={4} className={classes.gridItem}>
					<Autocomplete
						id='country'
						name='country'
						onChange={(e, newCountryAuto) => setState('SET_COUNTRY_AUTO', newCountryAuto)}
						onInput={handleInputChange('country')}
						className={classes.countrySelect}
						options={countries}
						classes={{
							option: classes.option
						}}
						autoHighlight
						getOptionLabel={option => option.label}
						renderOption={option => (
							<React.Fragment>
								<span>{countryToFlag(option.code)}</span>
								{option.label} ({option.code}) +{option.phone}
							</React.Fragment>
						)}
						renderInput={params => (
							<TextField
								{...params}
								required={false}
								error={countryErr ? true : false}
								label={countryErr ? countryErr : 'Country'}
								variant='outlined'
								placeholder={countryLabel ? countryLabel : 'Germany'}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12} md={8} className={classes.gridItem}>
					<TextField
						id='phone'
						name='phone'
						className={classes.textfield}
						variant='outlined'
						label={phoneErr ? phoneErr : 'Phone Number'}
						placeholder='1767777777'
						type='number'
						error={phoneErr ? true : false}
						onChange={handleInputChange('phone')}
						defaultValue={values.phone}
					/>
				</Grid>
				<Grid item xs={12} md={5} className={classes.gridItem}>
					<TextField
						id='address'
						name='address'
						className={classes.textfield}
						variant='outlined'
						label={addressErr ? addressErr : 'Address'}
						placeholder='Heiligengeistfeld 15'
						type='text'
						error={addressErr ? true : false}
						onChange={handleInputChange('address')}
						defaultValue={values.address}
					/>
				</Grid>
				<Grid item xs={6} md={3} className={classes.gridItem}>
					<TextField
						id='zipCode'
						name='zipCode'
						className={classes.textfield}
						variant='outlined'
						label={zipCodeErr ? zipCodeErr : 'Zip Code'}
						placeholder='20359'
						type='number'
						error={zipCodeErr ? true : false}
						onChange={handleInputChange('zipCode')}
						defaultValue={values.zipCode}
					/>
				</Grid>
				<Grid item xs={6} md={4} className={classes.gridItem}>
					<TextField
						id='city'
						name='city'
						className={classes.textfield}
						variant='outlined'
						label={cityErr ? cityErr : 'City'}
						placeholder='Hamburg'
						type='text'
						error={cityErr ? true : false}
						onChange={handleInputChange('city')}
						defaultValue={values.city}
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
					className={classes.nextButton}
					width='100%'
					variant='outlined'
					color='primary'
					endIcon={<ArrowForwardIcon className={classes.buttonIcon} />}
					size='large'
					onClick={() => continueForm(values, countryAuto)}
				>
					Continue
				</Button>
			</Box>
		</Box>
	);
};

// PropTypes
RegisterPersonalData.propTypes = {
	prevStep: PropTypes.func.isRequired,
	nextStep: PropTypes.func.isRequired,
	handleInputChange: PropTypes.func.isRequired,
	values: PropTypes.object.isRequired
};

// export RegisterPersonalData Component
export default RegisterPersonalData;
