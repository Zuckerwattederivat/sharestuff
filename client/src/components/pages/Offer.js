// Node Modules
import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import {} from '@material-ui/core';
import {} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';

// define styles
const useStyles = makeStyles(theme => ({}));

// Offer Component
const Offer = props => {
	// define classes
	const classes = useStyles();

	// load auth context
	const authContext = useContext(AuthContext);

	// load query context
	const queryContext = useContext(QueryContext);

	return <div>Offer here </div>;
};

// export Offer Component
export default Offer;
