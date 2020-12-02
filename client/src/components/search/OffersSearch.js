// Node Modules
import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, Box, TextField, CircularProgress, IconButton, Button } from '@material-ui/core';
import { Search as SearchIcon, Clear as ClearIcon } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';

// define styles
const useStyles = makeStyles(theme => ({
	searchContainer: {
		display: 'flex',
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column'
		}
	},
	textfield: {
		color: theme.palette.primary.main,
		flexBasis: '100%',
		marginBottom: theme.spacing(1),
		[theme.breakpoints.up('sm')]: {
			flexBasis: '50%',
			marginBottom: theme.spacing(0),
			marginRight: theme.spacing(2)
		}
	},
	localContainer: {
		flexBasis: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		[theme.breakpoints.up('sm')]: {
			flexBasis: '50%'
		}
	},
	locationInput: {
		flexBasis: '100%',
		[theme.breakpoints.up('sm')]: {
			flexBasis: '75%'
		},
		[theme.breakpoints.up('md')]: {
			flexBasis: '80%'
		},
		[theme.breakpoints.up('lg')]: {
			flexBasis: '85%'
		}
	},
	buttonWide: {
		flexBasis: '10%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	buttonSmall1: {
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	buttonSmall2: {
		marginTop: theme.spacing(1),
		[theme.breakpoints.up('sm')]: {
			display: 'none'
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

// OffersSearch Component
const OffersSearch = props => {
	// define classes
	const classes = useStyles();

	// open & options state
	const [ open, setOpen ] = useState(false);
	const [ options, setOptions ] = useState([]);
	const loading = open && options.length === 0;
	// input state
	const [ searchParams, setSearchParams ] = useState({
		product: '',
		location: '',
		locationAuto: null
	});

	// set search params
	const searchParamsParent = props.setSearch();

	// on input change
	const handleInputChange = input => e => setSearchParams({ ...searchParams, [input]: e.target.value });

	// fetch location
	useEffect(
		() => {
			let active = true;

			if (searchParams.location !== '') {
				fetch(`https://app.geocodeapi.io/api/v1/autocomplete?text=${searchParams.location}&apikey=${geoCodeApiKey}`)
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
		[ loading, searchParams.location ]
	);

	// reset location options if closed
	useEffect(
		() => {
			if (!open) {
				setOptions([]);
			}
		},
		[ open ]
	);

	// clear all
	const clearAll = () => {
		props.clearAll();
		setSearchParams({ product: '', location: '', locationAuto: null });
	};

	// rerender on searchParams
	useEffect(
		() => {},
		// eslint-disable-next-line
		[ searchParams.product, searchParams.location, searchParams.locationAuto ]
	);

	// on submit
	const onSubmit = e => {
		// prevent default
		e.preventDefault();

		// set search params
		const searchParamsParent = props.setSearch();

		// set parent
		searchParams.locationAuto
			? (searchParamsParent.location = searchParams.locationAuto.label)
			: (searchParamsParent.location = null);
		searchParams.product ? (searchParamsParent.product = searchParams.product) : (searchParamsParent.product = null);
		// set filter
		searchParams.locationAuto
			? (searchParamsParent.filter.location = true)
			: (searchParamsParent.filter.location = false);
		searchParams.product ? (searchParamsParent.filter.product = true) : (searchParamsParent.filter.product = false);

		// push to url
		props.setUrl(searchParamsParent);

		// set parent state
		props.setParentState(searchParamsParent);
	};

	return (
		<form onSubmit={onSubmit}>
			<Box width='100%' className={classes.searchContainer}>
				<TextField
					size='medium'
					id='product'
					name='product'
					className={classes.textfield}
					variant='outlined'
					label='Product'
					placeholder='vacum cleaner'
					type='text'
					onChange={handleInputChange('product')}
					value={searchParamsParent.product ? searchParamsParent.product : searchParams.product}
				/>
				<Box className={classes.localContainer}>
					<Autocomplete
						className={classes.locationInput}
						size='medium'
						id='location'
						name='location'
						open={open}
						onOpen={() => {
							setOpen(true);
						}}
						onClose={() => {
							setOpen(false);
						}}
						onChange={(e, option) => setSearchParams({ ...searchParams, locationAuto: option })}
						getOptionSelected={(option, value) => option.label === value.label}
						getOptionLabel={option => option.label}
						options={options}
						loading={loading}
						inputValue={!searchParams.locationAuto ? searchParams.location : searchParams.locationAuto.label}
						renderInput={params => (
							<TextField
								{...params}
								onChange={handleInputChange('location')}
								className={classes.textfield}
								label='Location'
								variant='outlined'
								placeholder='Fifth Ave, New York'
								InputProps={{
									...params.InputProps,
									endAdornment: (
										<Fragment>
											{loading ? <CircularProgress color='inherit' size={20} /> : null}
											{params.InputProps.endAdornment}
										</Fragment>
									)
								}}
							/>
						)}
					/>
					<Box className={classes.buttonWide}>
						<IconButton className={classes.buttonIcon} name='submit' type='submit' variant='contained'>
							<SearchIcon />
						</IconButton>
						<IconButton name='clear' variant='contained' onClick={clearAll}>
							<ClearIcon />
						</IconButton>
					</Box>
				</Box>
				<Button
					className={classes.buttonSmall1}
					name='submit'
					type='submit'
					size='medium'
					variant='contained'
					color='primary'
					startIcon={<SearchIcon />}
				>
					Search
				</Button>
				<Button
					onClick={clearAll}
					className={classes.buttonSmall2}
					name='clear'
					size='medium'
					variant='contained'
					color='secondary'
					startIcon={<ClearIcon />}
				>
					Clear
				</Button>
			</Box>
		</form>
	);
};

// PropTypes
OffersSearch.propTypes = {
	setUrl: PropTypes.func.isRequired,
	setSearch: PropTypes.func.isRequired,
	setParentState: PropTypes.func.isRequired,
	clearAll: PropTypes.func.isRequired
};

// export OffersSearch
export default withRouter(OffersSearch);
