// Node Modules
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, FormControlLabel, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

// Home Component
const Home = () => {
	return (
		<div>
			<br />
			<TextField
				id='date'
				variant='outlined'
				color='primary'
				type='date'
				label='Birthday'
				value={Date()}
				InputLabelProps={{
					shrink: true
				}}
			/>
			<br />
			<ButtonGroup>
				<Button variant='contained' color='primary' startIcon={<SaveIcon />}>
					Save
				</Button>
				<Button variant='contained' color='secondary' startIcon={<DeleteIcon />}>
					Discard
				</Button>
			</ButtonGroup>
		</div>
	);
};

// export Home Component
export default Home;
