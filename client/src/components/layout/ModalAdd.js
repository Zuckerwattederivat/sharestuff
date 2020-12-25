// Node Modules
import React, { useContext, useState } from 'react';
import { Modal, Backdrop, Box, Typography, Divider, Grid, TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Cancel as CancelIcon, AddCircle as AddCircleIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
// Context
import ProfileContext from '../../context/profile/profileContext';
// Assets
import LoadingGif from '../../assets/loading-transparent.gif';
// util
import currencies from '../../utils/currencies';

// define styles
const useStyles = makeStyles(theme => ({
	addModal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'scroll'
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
		},
		[theme.breakpoints.up('md')]: {
			width: '800px'
		}
	},
	title: {
		padding: theme.spacing(2),
		textAlign: 'center',
		fontWeight: '500'
	},
	titleSpan2: {
		color: theme.palette.primary.main
	},
	addContainer: {
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
	buttonContainer: {
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'space-between'
		}
	},
	cancelButton: {
		[theme.breakpoints.down('xs')]: {
			width: '47%'
		},
		marginRight: theme.spacing(1)
	},
	addButton: {
		[theme.breakpoints.down('xs')]: {
			width: '47%'
		}
	},
	buttonIcon: {
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	btcIcon: {
		color: '#F79414',
		marginRight: '3px'
	}
}));

// ModalAdd Component
const ModalAdd = () => {
	// styling classes
	const classes = useStyles();

	// load profile context
	const profileContext = useContext(ProfileContext);
	const { modalAdd, success, loading, setModal } = profileContext;

	// input
	const [ input, setInput ] = useState({
		title: '',
		product: '',
		price: '',
		currencyAuto: '',
		currencyInput: ''
	});

	// country to flag
	const countryToFlag = isoCode => {
		if (isoCode === 'BTC') {
			return <i className={`fab fa-bitcoin ${classes.btcIcon}`} />;
		} else {
			return typeof String.fromCodePoint !== 'undefined'
				? isoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))
				: isoCode;
		}
	};

	// handle input change
	const handleInputChange = state => e => setInput({ ...input, [state]: e.target.value });

	// submit offer
	const submitOffer = () => {
		console.log('add offer');
	};

	return (
		<Modal
			className={classes.addModal}
			aria-labelledby='add-modal'
			aria-describedby='add-modal-description'
			open={true}
			onClose={() => setModal('add', false)}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{ timeout: 500 }}
		>
			<div
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
				{!success &&
				!loading && (
					<Box width='100%' height='100%'>
						<Typography id='register-modal-title' className={classes.title} variant='h5'>
							<span className={classes.titleSpan2}>New</span> <span className={classes.titleSpan1}>Offer</span>
						</Typography>
						<Divider className={classes.topDivider} />
						<Box width='100%' className={classes.addContainer}>
							<Typography className={classes.description} variant='subtitle1'>
								Add new offer.
							</Typography>
							<form onSubmit={submitOffer}>
								<Grid className={classes.grid} width='100%' container spacing={2}>
									<Grid item xs={12}>
										<TextField
											id='title'
											name='title'
											className={classes.textfield}
											variant='outlined'
											label={'Title'}
											placeholder='Rent my Macbook Pro 2015 weekly'
											type='text'
											// error={firstnameErr ? true : false}
											onChange={handleInputChange('title')}
											defaultValue={input.title}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											id='product'
											name='product'
											className={classes.textfield}
											variant='outlined'
											label={'Product'}
											placeholder='Macbook Pro 2015'
											type='text'
											// error={firstnameErr ? true : false}
											onChange={handleInputChange('product')}
											defaultValue={input.product}
										/>
									</Grid>
									<Grid item xs={6} md={3}>
										<TextField
											id='price'
											name='price'
											className={classes.textfield}
											variant='outlined'
											label={'Price'}
											placeholder='40'
											type='number'
											// error={firstnameErr ? true : false}
											onChange={handleInputChange('price')}
											defaultValue={input.price}
										/>
									</Grid>
									<Grid item xs={6} md={3}>
										<Autocomplete
											id='currency'
											name='currency'
											onChange={(e, newCurrencyAuto) =>
												newCurrencyAuto
													? setInput({ ...input, currencyAuto: newCurrencyAuto.label })
													: setInput({ ...input, currencyAuto: '' })}
											onInput={handleInputChange('currencyInput')}
											className={classes.textfield}
											options={currencies}
											classes={{
												option: classes.option
											}}
											autoHighlight
											getOptionLabel={option => option.label}
											renderOption={option => (
												<React.Fragment>
													<span>{countryToFlag(option.code)}</span>
													{option.label} ({option.symbol})
												</React.Fragment>
											)}
											renderInput={params => (
												<TextField
													{...params}
													required={false}
													// error={countryErr ? true : false}
													label='Currency'
													variant='outlined'
													placeholder='EUR'
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12} md={6}>
										// TODO: tags texfield multi input mit result = array of strings
									</Grid>
								</Grid>
								<Box className={classes.buttonContainer} width='100%' display='flex' justifyContent='flex-end'>
									<Button
										className={classes.cancelButton}
										width='100%'
										variant='outlined'
										startIcon={<CancelIcon className={classes.buttonIcon} />}
										size='large'
									>
										Cancel
									</Button>
									<Button
										className={classes.addButton}
										name='submit'
										type='submit'
										width='100%'
										variant='outlined'
										color='primary'
										startIcon={<AddCircleIcon className={classes.buttonIcon} />}
										size='large'
									>
										Add
									</Button>
								</Box>
							</form>
						</Box>
					</Box>
				)}
			</div>
		</Modal>
	);
};

// export ModalAdd Component
export default ModalAdd;
