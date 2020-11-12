// Node Modules
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Typography, Divider, Box } from '@material-ui/core';
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
	userMenu: {},
	usernameContainer: {
		padding: theme.spacing(1, 2.6)
	},
	loggedInAs: {
		fontSize: 'small'
	},
	username: {
		fontWeight: 'bold'
	},
	divider: {
		margin: theme.spacing(1, 0),
		width: '100%'
	},
	dropdownIcons: {
		marginRight: '0.3em'
	},
	itemsResponsivePosition: {
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	secondaryText: {
		color: theme.palette.error.main
	},
	fontAwesomeIcon: {
		margin: theme.spacing(0, 1.2, 0, 0)
	}
}));

// UserMenu Component
const UserMenu = props => {
	// styling classes
	const classes = useStyles();

	// laod auth context
	const authContext = useContext(AuthContext);
	// destructure auth context
	const { isAuthenticated, logout, user } = authContext;

	// load navbar context
	const navbarContext = useContext(NavbarContext);
	// destructure context
	const { anchorEl, handleUserMenuClose, setRegisterOpen, setLoginOpen } = navbarContext;

	// user menu open?
	const isUserMenuOpen = Boolean(anchorEl);

	return (
		<Menu
			className={classes.userMenu}
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
					<Box key='welcome-message' className={classes.usernameContainer}>
						<Typography className={classes.loggedInAs}>Logged in as:</Typography>
						<Typography className={classes.username}>{user && user.username}</Typography>
					</Box>,
					<Divider key='divider-top' className={classes.divider} />,
					<MenuItem key='messages' className={classes.itemsResponsivePosition} onClick={handleUserMenuClose}>
						<MessageIcon fontSize='small' className={classes.dropdownIcons} /> Messages
					</MenuItem>,
					<MenuItem key='notifications' className={classes.itemsResponsivePosition} onClick={handleUserMenuClose}>
						<NotificationsIcon fontSize='small' className={classes.dropdownIcons} /> Notifications
					</MenuItem>,
					<MenuItem key='profile' onClick={handleUserMenuClose}>
						<PersonIcon fontSize='small' className={classes.dropdownIcons} /> Profile
					</MenuItem>,
					<MenuItem key='account' onClick={handleUserMenuClose}>
						<SettingsIcon fontSize='small' className={classes.dropdownIcons} /> Settings
					</MenuItem>,
					<MenuItem
						key='logout'
						className={classes.secondaryText}
						onClick={() => {
							handleUserMenuClose();
							logout();
						}}
					>
						<LockIcon fontSize='small' className={classes.dropdownIcons} /> Logout
					</MenuItem>,
					user &&
					user.admin === true && [
						<Divider key='divider-bottom' className={classes.divider} />,
						<MenuItem
							component={Link}
							to='/admin'
							key='admin'
							onClick={() => {
								handleUserMenuClose();
								logout();
							}}
						>
							<i className={`fas fa-tools ${classes.fontAwesomeIcon}`} /> Admin Panel
						</MenuItem>
					]
				]
			) : (
				[
					<MenuItem
						key='login'
						onClick={() => {
							handleUserMenuClose();
							setLoginOpen(true);
						}}
					>
						<LockOpenIcon fontSize='small' className={classes.dropdownIcons} /> Login
					</MenuItem>,
					<MenuItem
						key='register'
						onClick={() => {
							handleUserMenuClose();
							setRegisterOpen(true);
						}}
					>
						<PersonAddIcon fontSize='small' className={classes.dropdownIcons} /> Register
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
