// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Pagination as PaginationMaterial } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

// define styles
const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			marginTop: theme.spacing(2)
		}
	},
	pagination: {
		margin: theme.spacing(6, 0, 0)
	}
}));

// Pagination Component
const Pagination = props => {
	// define classes
	const classes = useStyles();

	return (
		<div className={`${classes.root} ${classes.pagination}`}>
			<PaginationMaterial count={props.pageCount} page={props.page} onChange={props.onChange} />
		</div>
	);
};

// PropTypes
Pagination.propTypes = {
	pageCount: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired
};

// export Pagination Component
export default Pagination;
