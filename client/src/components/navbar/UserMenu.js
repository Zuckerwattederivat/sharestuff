// Node Modules
import React, { useContext, useState } from 'react';
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

	// auth context
	const authContext = useContext(AuthContext);
	// destructure auth context
	const { isAuthenticated } = authContext;

	// menu id
	const menuId = 'primary-user-account-menu';

	return (
		<Menu
			className='userMenu'
			anchorEl={props.anchorEl}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			getContentAnchorEl={null}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={props.isUserMenuOpen}
			onClose={props.handleMenuClose}
		>
			{isAuthenticated ? (
				[
					<MenuItem className={classes.itemsResponsivePosition} key='messages' onClick={props.handleMenuClose}>
						<MessageIcon fontSize='small' className={classes.dropdownIcons} /> Messages
					</MenuItem>,
					<MenuItem className={classes.itemsResponsivePosition} key='notifications' onClick={props.handleMenuClose}>
						<NotificationsIcon fontSize='small' className={classes.dropdownIcons} /> Notifications
					</MenuItem>,
					<MenuItem key='profile' onClick={props.handleMenuClose}>
						<PersonIcon fontSize='small' className={classes.dropdownIcons} /> Profile
					</MenuItem>,
					<MenuItem key='account' onClick={props.handleMenuClose}>
						<SettingsIcon fontSize='small' className={classes.dropdownIcons} /> Settings
					</MenuItem>,
					<Divider key='divider' className={classes.divider} variant='middle' />,
					<MenuItem key='logout' color='secondary' onClick={props.handleMenuClose}>
						<LockIcon fontSize='small' className={classes.dropdownIcons} /> Logout
					</MenuItem>
				]
			) : (
				[
					<MenuItem key='register' onClick={props.handleMenuClose}>
						<PersonAddIcon fontSize='small' className={classes.dropdownIcons} /> Register
					</MenuItem>,
					<MenuItem key='login' onClick={props.handleMenuClose}>
						<LockOpenIcon fontSize='small' className={classes.dropdownIcons} /> Login
					</MenuItem>
				]
			)}
		</Menu>
	);
};

// export UserMenu Component
export default UserMenu;
