// Node Modules
import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { makeStyles, Grid, TextField, CircularProgress, IconButton } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
// Assets

// define styles
const useStyles = makeStyles(theme => ({
	textfield: {
		minWidth: '100%',
		background: theme.palette.background.custom,
		color: theme.palette.primary.main
	},
	buttonContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	button: {
		// height: '100%'
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

// MainSearch Component
const MainSearch = () => {
	// define classes
	const classes = useStyles();

	// open & options state
	const [ open, setOpen ] = useState(false);
	const [ options, setOptions ] = useState([]);
	const loading = open && options.length === 0;
	// input state
	const [ searchParams, setSearchParams ] = useState({
		item: '',
		location: '',
		locationAuto: null
	});

	// on input change
	const handleInputChange = input => e => setSearchParams({ ...searchParams, [input]: e.target.value });

	// fetch location
	useEffect(
		() => {
			let active = true;

			if (searchParams.location !== '') {
				(async () => {
					const response = await axios.get(
						`https://app.geocodeapi.io/api/v1/autocomplete?text=${searchParams.location}&apikey=${geoCodeApiKey}`
					);

					if (active && response) {
						const locations = response.data.features;
						setOptions(Object.keys(locations).map(key => locations[key].properties));
					}
				})();
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

	return (
		<Grid container spacing={1} width='100%' className={classes.grid}>
			<Grid item xs={6} sm={7}>
				<TextField
					id='product'
					name='product'
					className={classes.textfield}
					variant='outlined'
					label='Item'
					placeholder='vacum cleaner'
					type='text'
					onChange={handleInputChange('item')}
				/>
			</Grid>
			<Grid item xs={4} sm={4}>
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
					onChange={(e, option) => setSearchParams({ ...searchParams, locationAuto: option })}
					getOptionSelected={(option, value) => option.label === value.label}
					getOptionLabel={option => option.label}
					options={options}
					loading={loading}
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
			</Grid>
			<Grid item xs={2} sm={1} className={classes.buttonContainer}>
				<IconButton
					className={classes.button}
					width='100%'
					variant='contained'
					// onClick={search}
				>
					<SearchIcon className={classes.buttonIcon} />
				</IconButton>
			</Grid>
		</Grid>
	);
};

// export MainSearch
export default MainSearch;
