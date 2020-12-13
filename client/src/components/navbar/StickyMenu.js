// Node Modules
import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Divider, Container } from '@material-ui/core';
import {} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
// Context
import NavbarContext from '../../context/navbar/navbarContext';

// define styles
const useStyles = makeStyles(theme => ({
	stickyMenu: {
		transition: '0.4s ease-in-out',
		position: 'fixed',
		top: 0,
		zIndex: 1200,
		width: '100%',
		margin: theme.spacing(8, 0, 2),
		padding: theme.spacing(2, 0)
	},
	bgDark: {
		backgroundColor: theme.palette.background.default
	}
}));

// StickyMenu Component
const StickyMenu = () => {
	// define styles
	const classes = useStyles();

	// load navbarContext
	const navbarContext = useContext(NavbarContext);
	const { scrolled, setScrolled } = navbarContext;

	return (
		<div className={`${classes.stickyMenu} ${scrolled.scrolledDown ? classes.bgDark : classes.shadowFalse}`}>
			<Container maxWidth='xl'>Sticky Menu</Container>
			<Divider />
		</div>
	);
};

// export StickyMenu Component
export default StickyMenu;
