// Node Modules
import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { makeStyles, Grid, TextField, CircularProgress } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { STATES } from 'mongoose';
// Assets

// define styles
const useStyles = makeStyles(theme => ({
	container: {
		width: '100%'
	},
	searchField: {
		background: theme.palette.background.custom,
		color: theme.palette.primary.main
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
		product: '',
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
		<Grid container spacing={2} className={classes.container}>
			<Grid item xs={12} md={6}>
				<Autocomplete
					id='location'
					name='location'
					style={{ width: 300 }}
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
							className={classes.searchField}
							label='Where are you searching?'
							variant='outlined'
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
		</Grid>
	);
};

// export MainSearch
export default MainSearch;
