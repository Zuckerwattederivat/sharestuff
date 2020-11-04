// Node Modules
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Divider } from '@material-ui/core';
import {
	Message as MessageIcon,
	Notifications as NotificationsIcon,
	Person as PersonIcon,
	Settings as SettingsIcon,
	Lock as LockIcon,
	LockOpen as LockOpenIcon,
	PersonAdd as PersonAddIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
// Context
import AuthContext from '../../context/auth/authContext';
import NavbarContext from '../../context/navbar/navbarContext';

// define styles
const useStyles = makeStyles(theme => ({
	userMenu: {
		top: '40px'
	},
	divider: {
		margin: '0.3em'
	},
	dropdownIcons: {
		marginRight: '0.3em'
	},
	itemsResponsivePosition: {
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	}
}));

// UserMenu Component
const UserMenu = props => {
	// styling classes
	const classes = useStyles();

	// laod auth context
	const authContext = useContext(AuthContext);
	// destructure auth context
	const { isAuthenticated } = authContext;

	// load navbar context
	const navbarContext = useContext(NavbarContext);
	// destructure context
	const { anchorEl, handleUserMenuClose } = navbarContext;

	// user menu open?
	const isUserMenuOpen = Boolean(anchorEl);

	return (
		<Menu
			className='userMenu'
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			getContentAnchorEl={null}
			id={props.menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isUserMenuOpen}
			onClose={handleUserMenuClose}
		>
			{isAuthenticated ? (
				[
					<MenuItem className={classes.itemsResponsivePosition} key='messages' onClick={handleUserMenuClose}>
						<MessageIcon fontSize='small' className={classes.dropdownIcons} /> Messages
					</MenuItem>,
					<MenuItem className={classes.itemsResponsivePosition} key='notifications' onClick={handleUserMenuClose}>
						<NotificationsIcon fontSize='small' className={classes.dropdownIcons} /> Notifications
					</MenuItem>,
					<MenuItem key='profile' onClick={handleUserMenuClose}>
						<PersonIcon fontSize='small' className={classes.dropdownIcons} /> Profile
					</MenuItem>,
					<MenuItem key='account' onClick={handleUserMenuClose}>
						<SettingsIcon fontSize='small' className={classes.dropdownIcons} /> Settings
					</MenuItem>,
					<Divider key='divider' className={classes.divider} variant='middle' />,
					<MenuItem key='logout' color='secondary' onClick={handleUserMenuClose}>
						<LockIcon fontSize='small' className={classes.dropdownIcons} /> Logout
					</MenuItem>
				]
			) : (
				[
					<MenuItem key='register' onClick={handleUserMenuClose}>
						<PersonAddIcon fontSize='small' className={classes.dropdownIcons} /> Register
					</MenuItem>,
					<MenuItem key='login' onClick={handleUserMenuClose}>
						<LockOpenIcon fontSize='small' className={classes.dropdownIcons} /> Login
					</MenuItem>
				]
			)}
		</Menu>
	);
};

// Proptypes
UserMenu.propTypes = {
	menuId: PropTypes.string.isRequired
};

// export UserMenu Component
export default UserMenu;
