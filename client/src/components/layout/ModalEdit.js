// Node Modules
import React, { useContext, useState, useEffect, Fragment } from 'react';
import {
	Modal,
	Backdrop,
	Box,
	Typography,
	Divider,
	Grid,
	TextField,
	Button,
	CircularProgress,
	FormControl,
	InputLabel,
	Select,
	MenuItem
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {
	Cancel as CancelIcon,
	AddCircle as AddCircleIcon,
	ArrowBack as ArrowBackIcon,
	Close as CloseIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import MultiImageInput from 'react-multiple-image-input';
// Components
import Alerts from '../layout/Alerts';
// Context
import ProfileContext from '../../context/profile/profileContext';
import AlertContext from '../../context/alert/alertContext';
import QueryContext from '../../context/query/queryContext';
// Assets
import LoadingGif from '../../assets/loading-transparent.gif';
import WarningSvg from '../../assets/undraw/warning.svg';
import SuccessGif from '../../assets/check-mark-transparent.gif';
// util
import utils from '../../utils/helpers';
import currencies from '../../utils/currencies';

// define styles
const useStyles = makeStyles(theme => ({
	editModal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	scrollable: {
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
	bigMargins: {
		padding: theme.spacing(60, 0, 4),
		[theme.breakpoints.up('sm')]: {
			padding: theme.spacing(38, 0, 4)
		},
		[theme.breakpoints.up('xl')]: {
			padding: theme.spacing(4, 0, 4)
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
	editContainer: {
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
	formControl: {
		width: '100%',
		background: theme.palette.background.custom
	},
	inputLabel: {
		padding: theme.spacing(0, 1, 0, 0.5),
		background: theme.palette.background.custom
	},
	btcIcon: {
		color: '#F79414',
		marginRight: '3px'
	},
	imagesNoErr: {
		display: 'none'
	},
	imagesErr: {
		paddingLeft: theme.spacing(1),
		fontSize: '1.025rem',
		display: 'block',
		color: '#F34436'
	},
	buttonContainer: {
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'space-between'
		}
	},
	button1: {
		[theme.breakpoints.down('xs')]: {
			width: '47%'
		},
		marginRight: theme.spacing(1)
	},
	button2: {
		[theme.breakpoints.down('xs')]: {
			width: '47%'
		}
	},
	buttonIcon: {
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	loadingContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column'
	},
	messageSvg: {
		maxHeight: '450px',
		maxWidth: '100%',
		[theme.breakpoints.up('sm')]: {
			maxHeight: '250px'
		}
	},
	h3: {
		textAlign: 'center',
		fontSize: '1.5rem',
		fontWeight: 700,
		margin: theme.spacing(4, 0, 3)
	},
	btnContainer: {
		width: '100%',
		display: 'flex',
		marginTop: theme.spacing(4),
		justifyContent: 'flex-end',
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'space-between'
		}
	}
}));

// geoCodeApiKey
let geoCodeApiKey;
// set geoCodeApiKey
if (process.env.NODE_ENV !== 'production') {
	geoCodeApiKey = process.env.REACT_APP_GEOCODE_API_KEY;
} else {
	geoCodeApiKey = process.env.GEOCODE_API_KEY;
}

// ModalEdit Component
const ModalEdit = () => {
	// styling classes
	const classes = useStyles();

	// load profile context
	const profileContext = useContext(ProfileContext);
	const {
		categories,
		offer,
		modalEdit,
		success,
		loading,
		serverErrors,
		setModal,
		setCategories,
		editOffer,
		resetErrors
	} = profileContext;

	// load query context
	const queryContext = useContext(QueryContext);
	const { getUserOffers } = queryContext;

	// load alert context
	const alertContext = useContext(AlertContext);
	const { setAlert, removeAllAlerts } = alertContext;

	// open & options state
	const [ open, setOpen ] = useState(false);
	const [ options, setOptions ] = useState([]);
	const autoCompleteLoading = open && options.length === 0;

	// input
	const [ input, setInput ] = useState({
		title: '',
		product: '',
		category: '',
		price: '',
		currencyAuto: '',
		currencyInput: '',
		tagsArray: null,
		tagsInput: '',
		locationAuto: null,
		location: '',
		description: ''
	});

	// fill inputs with offer data
	useEffect(
		() => {
			if (offer) {
				// format description
				let descriptionFormatted = [];
				offer.description.forEach(el => {
					if (el === '') {
						descriptionFormatted.push('\n');
					} else {
						descriptionFormatted.push(el);
					}
				});
				// fill input with offer data
				setInput({
					...input,
					title: offer.title,
					product: offer.product,
					category: offer.categoryId,
					price: offer.price,
					tagsInput: offer.tags.join(' '),
					description: descriptionFormatted.join('\n')
				});
			}
		},
		// eslint-disable-next-line
		[ offer ]
	);

	// images upload
	const [ images, setImages ] = useState({});

	// errors
	const [ errors, setErrors ] = useState({
		title: null,
		product: null,
		category: null,
		price: null,
		currency: null,
		tags: null,
		location: null,
		description: null,
		images: null
	});

	// set alerts if errors occure
	useEffect(
		() => {
			serverErrors &&
				serverErrors.map(error => {
					return setAlert(error.msg, 'error', 'unlimited');
				});
		},
		// eslint-disable-next-line
		[ serverErrors ]
	);

	// set tag array
	useEffect(
		() => {
			if (!input.tagsInput) {
				setInput({ ...input, tagsArray: null });
			} else if (input.tagsInput.includes(',')) {
				let tags = input.tagsInput.split(', ');
				let i = tags.length;
				while (i--) !/\S/.test(tags[i]) && tags.splice(i, 1);
				setInput({ ...input, tagsArray: tags });
			} else if (input.tagsInput.includes(';')) {
				let tags = input.tagsInput.split('; ');
				let i = tags.length;
				while (i--) !/\S/.test(tags[i]) && tags.splice(i, 1);
				setInput({ ...input, tagsArray: tags });
			} else {
				let tags = input.tagsInput.split(' ');
				let i = tags.length;
				while (i--) !/\S/.test(tags[i]) && tags.splice(i, 1);
				setInput({ ...input, tagsArray: tags });
			}
		},
		// eslint-disable-next-line
		[ input.tagsInput ]
	);

	// fetch categories on render
	useEffect(() => {
		setCategories();
		// eslint-disable-next-line
	}, []);

	// fetch location
	useEffect(
		() => {
			let active = true;

			if (input.location !== '') {
				fetch(`https://app.geocodeapi.io/api/v1/autocomplete?text=${input.location}&apikey=${geoCodeApiKey}`)
					.then(resolve => {
						return resolve.json();
					})
					.then(resolve => {
						if (active) {
							const locations = resolve.features;
							setOptions(Object.keys(locations).map(key => locations[key].properties));
						}
					})
					.catch(err => {
						console.error(err);
					});
			}

			return () => {
				active = false;
			};
		},
		[ autoCompleteLoading, input.location ]
	);

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

	// crop for image upload
	const crop = {
		unit: '%',
		aspect: 4 / 3,
		width: '100'
	};

	// handle input change
	const handleInputChange = state => e => setInput({ ...input, [state]: e.target.value });

	// submit offer
	const submitOffer = e => {
		// prevent default
		e.preventDefault();

		// check if input is not empty
		if (
			input.title &&
			input.product &&
			input.category &&
			input.currencyAuto &&
			input.tagsArray &&
			input.locationAuto &&
			input.description &&
			images[0]
		) {
			// create offer data
			const offerData = {
				id: offer._id,
				title: input.title,
				product: input.product,
				categoryId: input.category,
				price: input.price,
				currency: input.currencyAuto,
				tags: input.tagsArray,
				location: input.locationAuto,
				description: input.description,
				images: images,
				imagesOld: offer.images,
				imagesThumbOld: offer.imagesThumb
			};
			// edit offer
			editOffer(offerData);
		} else {
			// set errors
			setErrors({
				...errors,
				title: !input.title ? 'Enter a title' : null,
				product: !input.product ? 'Enter a product name' : null,
				category: !input.category ? 'Choose a category' : null,
				price: !input.price ? 'Enter a price' : null,
				currency: !input.currencyAuto ? 'Choose a currency' : null,
				tags: !input.tagsArray ? 'Enter tags so people can find your offer' : null,
				location: !input.locationAuto ? 'Enter the location of your offer' : null,
				description: !input.description ? 'Enter the details of your offer' : null,
				images: !images[0] ? 'Add at least 1 image' : null
			});
		}
	};

	// go back
	const goBack = () => {
		resetErrors();
		removeAllAlerts();
	};

	// close modal
	const closeModal = () => {
		// reset validation errors
		setErrors({
			title: null,
			product: null,
			category: null,
			price: null,
			currency: null,
			tags: null,
			location: null,
			description: null,
			images: null
		});
		// reset server errrors
		resetErrors();
		// remove alerts
		removeAllAlerts();
		// close modal
		setModal('edit', false);
		// get offers new
		if (success) getUserOffers();
	};

	return (
		<Modal
			className={`${classes.editModal} ${!loading && !serverErrors && !success && classes.scrollable}`}
			aria-labelledby='edit-modal'
			aria-describedby='edit-modal-description'
			open={modalEdit}
			onClose={closeModal}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{ timeout: 500 }}
		>
			<motion.div
				className={`${classes.paper} ${!loading && !serverErrors && !success && classes.bigMargins}`}
				transition={{
					duration: 0.6,
					type: 'spring',
					damping: 10,
					stiffness: 70
				}}
				initial={{ x: '-100vw' }}
				animate={{ x: 0 }}
			>
				{!success &&
				!loading &&
				!serverErrors && (
					<Box width='100%' height='100%'>
						<Typography id='register-modal-title' className={classes.title} variant='h5'>
							<span className={classes.titleSpan2}>Edit</span> <span className={classes.titleSpan1}>Offer</span>
						</Typography>
						<Divider className={classes.topDivider} />
						<Box width='100%' className={classes.editContainer}>
							<Typography className={classes.description} variant='subtitle1'>
								Edit the selected offer.
							</Typography>
							<form onSubmit={submitOffer}>
								<Grid className={classes.grid} width='100%' container spacing={2}>
									<Grid item xs={12}>
										<TextField
											id='title'
											name='title'
											className={classes.textfield}
											variant='outlined'
											label={errors.title ? errors.title : 'Title'}
											placeholder='Rent my Macbook Pro 2015 weekly'
											type='text'
											error={errors.title ? true : false}
											onChange={handleInputChange('title')}
											defaultValue={input.title}
										/>
									</Grid>
									<Grid item xs={12} md={8}>
										<TextField
											id='product'
											name='product'
											className={classes.textfield}
											variant='outlined'
											label={errors.product ? errors.product : 'Product'}
											placeholder='Macbook Pro 2015'
											type='text'
											error={errors.product ? true : false}
											onChange={handleInputChange('product')}
											defaultValue={input.product}
										/>
									</Grid>
									<Grid item xs={12} md={4}>
										<FormControl
											variant='outlined'
											className={classes.formControl}
											error={errors.category ? true : false}
										>
											<InputLabel id='category-label' className={classes.inputLabel}>
												{errors.category ? errors.category : 'Category'}
											</InputLabel>
											<Select
												labelId='category-label'
												label='Category'
												id='category'
												name='category'
												value={input.category}
												onChange={handleInputChange('category')}
											>
												{categories[0] ? (
													categories.map(el => {
														return (
															<MenuItem key={el._id} value={el._id}>
																{utils.capitalizeFirstLetter(el.title)}
															</MenuItem>
														);
													})
												) : (
													<MenuItem value=''>{categories}</MenuItem>
												)}
											</Select>
										</FormControl>
									</Grid>
									<Grid item xs={6} sm={8} md={3}>
										<TextField
											id='price'
											name='price'
											className={classes.textfield}
											variant='outlined'
											label={errors.price ? errors.price : 'Daily Price'}
											placeholder='40'
											type='number'
											error={errors.price ? true : false}
											onChange={handleInputChange('price')}
											defaultValue={input.price}
										/>
									</Grid>
									<Grid item xs={6} sm={4} md={3}>
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
													label={errors.currency ? errors.currency : 'Currency'}
													variant='outlined'
													error={errors.currency ? true : false}
													placeholder='EUR'
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Autocomplete
											id='location'
											name='location'
											open={open}
											onOpen={() => {
												setOpen(true);
											}}
											onClose={() => {
												setOpen(false);
											}}
											onChange={(e, option) => setInput({ ...input, locationAuto: option })}
											getOptionSelected={(option, value) => option.label === value.label}
											getOptionLabel={option => option.label}
											options={options}
											loading={autoCompleteLoading}
											renderInput={params => (
												<TextField
													{...params}
													onChange={handleInputChange('location')}
													className={classes.textfield}
													label={errors.location ? errors.location : 'Location'}
													error={errors.location ? true : false}
													variant='outlined'
													placeholder='Fifth Ave, New York'
													InputProps={{
														...params.InputProps,
														endAdornment: (
															<Fragment>
																{autoCompleteLoading ? <CircularProgress color='inherit' size={20} /> : null}
																{params.InputProps.endAdornment}
															</Fragment>
														)
													}}
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12} sm={6} md={12}>
										<TextField
											id='tags'
											name='tags'
											className={classes.textfield}
											variant='outlined'
											label={errors.tags ? errors.tags : 'Tags'}
											placeholder='#apple #macbook #productivity'
											type='text'
											error={errors.tags ? true : false}
											onChange={handleInputChange('tagsInput')}
											defaultValue={input.tagsInput}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											id='description'
											name='description'
											className={classes.textfield}
											variant='outlined'
											label={errors.description ? errors.description : 'Description'}
											error={errors.description ? true : false}
											placeholder='You can rent my Macbook Pro 2015 on a weekly or daily basis...'
											multiline
											rows={7}
											type='text'
											// error={firstnameErr ? true : false}
											onChange={handleInputChange('description')}
											defaultValue={input.description}
										/>
									</Grid>
									<Grid item xs={12}>
										<MultiImageInput
											theme={{
												background: '#111111',
												outlineColor: errors.images ? '#F34436' : '#545454'
											}}
											max={4}
											images={images}
											setImages={setImages}
											cropConfig={{ crop, ruleOfThirds: true }}
											allowCrop={false}
										/>
										<div className={errors.images ? classes.imagesErr : classes.imagesNoErr}>{errors.images}</div>
									</Grid>
								</Grid>
								<Box className={classes.buttonContainer} width='100%' display='flex' justifyContent='flex-end'>
									<Button
										className={classes.button1}
										width='100%'
										variant='outlined'
										startIcon={<CancelIcon className={classes.buttonIcon} />}
										size='large'
										onClick={closeModal}
									>
										Cancel
									</Button>
									<Button
										className={classes.button2}
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
				{!serverErrors &&
				loading && (
					<Box width='100%' height='70vh'>
						<Typography id='register-modal-title' className={classes.title} variant='h5'>
							<span className={classes.titleSpan2}>New</span> <span className={classes.titleSpan1}>Offer</span>
						</Typography>
						<Divider className={classes.topDivider} />
						<Box width='100%' className={classes.loadingContainer}>
							<img className={classes.messageSvg} src={LoadingGif} alt='loading' />
						</Box>
					</Box>
				)}
				{serverErrors &&
				!loading && (
					<Box width='100%' height='100%'>
						<Typography id='register-modal-title' className={classes.title} variant='h5'>
							<span className={classes.titleSpan2}>New</span> <span className={classes.titleSpan1}>Offer</span>
						</Typography>
						<Divider className={classes.topDivider} />
						<Box width='100%' display='flex' justifyContent='center' alignItems='center' padding={4}>
							<img src={WarningSvg} alt='warning' className={classes.messageSvg} />
						</Box>
						<Box width='100%' display='flex' flexDirection='column' justifyContent='space-between' padding={4}>
							<Typography variant='h3' color='secondary' className={classes.h3}>
								Something went wrong...
							</Typography>
							<Alerts />
							<Box width='100%' className={classes.btnContainer}>
								<Button
									className={classes.button1}
									size='large'
									variant='outlined'
									color='inherit'
									startIcon={<ArrowBackIcon className={classes.buttonIcon} />}
									onClick={goBack}
								>
									Back
								</Button>
								<Button
									size='large'
									className={classes.button2}
									variant='outlined'
									color='secondary'
									startIcon={<CloseIcon className={classes.buttonIcon} />}
									onClick={closeModal}
								>
									Close
								</Button>
							</Box>
						</Box>
					</Box>
				)}
				{success &&
				!loading && (
					<Box width='100%' height='70vh'>
						<Typography id='register-modal-title' className={classes.title} variant='h5'>
							<span className={classes.titleSpan2}>New</span> <span className={classes.titleSpan1}>Offer</span>
						</Typography>
						<Divider className={classes.topDivider} />
						<Box width='100%' className={classes.loadingContainer}>
							<img className={classes.messageSvg} src={SuccessGif} alt='success' />
						</Box>
						<Box width='100%' display='flex' flexDirection='column' justifyContent='space-between' padding={4}>
							<Typography variant='h3' color='primary' className={classes.h3}>
								{success}
							</Typography>
							<Box width='100%' className={classes.btnContainer}>
								<Button
									size='large'
									className={classes.button2}
									variant='outlined'
									color='inherit'
									startIcon={<CloseIcon className={classes.buttonIcon} />}
									onClick={closeModal}
								>
									Close
								</Button>
							</Box>
						</Box>
					</Box>
				)}
			</motion.div>
		</Modal>
	);
};

// export ModalEdit Component
export default ModalEdit;
