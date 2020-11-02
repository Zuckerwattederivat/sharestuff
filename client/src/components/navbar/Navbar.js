// Node Modules
import React, { Fragment, useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Link, IconButton, Badge, Toolbar, Typography } from '@material-ui/core';
import {
	Menu as MenuIcon,
	Mail as MailIcon,
	Notifications as NotificationsIcon,
	AccountCircle as AccountCircleIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
// Components
import UserMenu from './UserMenu';
// Context
import AuthContext from '../../context/auth/authContext';
// Assets
import logoWhite from '../../assets/logo/logo-white.svg';
import logoPrimary from '../../assets/logo/logo-primary.svg';
import logoBlack from '../../assets/logo/logo-black.svg';

// define styles
const useStyles = makeStyles(theme => ({
	grow: {
		flexGrow: 1
	},
	navbar: {
		padding: '0.2em 1em',
		background: theme.palette.background.default,
		[theme.breakpoints.up('sm')]: {
			padding: '0.5em 2em'
		}
	},
	logoCont: {
		display: 'flex',
		alignItems: 'center',
		'&:hover': {
			textDecoration: 'none'
		}
	},
	logo: {
		maxWidth: '20px',
		height: 'auto',
		marginRight: '1em'
	},
	title: {
		letterSpacing: '0.05em',
		fontWeight: 900,
		fontSize: '1.5rem',
		color: 'white',
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	},
	titleSpan1: {
		color: theme.palette.primary.main
	},
	sectionUser: {
		color: '#fff'
	},
	menuButton: {
		marginLeft: '0.7em',
		color: '#fff'
	}
}));

// Navbar Component
const Navbar = props => {
	// styling classes
	const classes = useStyles();

	// auth context
	const authContext = useContext(AuthContext);
	// destructure auth context
	const { isAuthenticated } = authContext;

	// anchor state
	const [ anchorEl, setAnchorEl ] = useState(null);

	// menus open?
	const isUserMenuOpen = Boolean(anchorEl);
	const isMenuOpen = Boolean(anchorEl);

	// handle menus open/ close
	const handleUserMenuOpen = e => setAnchorEl(e.currentTarget);
	const handleMenuClose = () => setAnchorEl(null);

	// menu id
	const menuId = 'primary-user-account-menu';

	return (
		<div className={classes.grow}>
			<AppBar className={classes.navbar} color='transparent' position='fixed'>
				<Toolbar>
					<Link className={classes.logoCont} component={RouterLink} to='/'>
						<img className={classes.logo} src={logoPrimary} alt='logo' />
						<Typography className={classes.title} variant='h6' noWrap>
							<span className={classes.titleSpan1}>Share</span>
							<span className={classes.titleSpan2}>Stuff</span>
						</Typography>
					</Link>
					<div className={classes.grow} />
					<div className={classes.sectionUser}>
						{isAuthenticated && (
							<Fragment>
								<IconButton aria-label='show new messages' color='inherit'>
									<Badge badgeContent={4} color='secondary'>
										<MailIcon />
									</Badge>
								</IconButton>
								<IconButton aria-label='show new notifications' color='inherit'>
									<Badge badgeContent={17} color='secondary'>
										<NotificationsIcon />
									</Badge>
								</IconButton>
							</Fragment>
						)}
						<IconButton
							edge='end'
							aria-label='account of current user'
							aria-controls={menuId}
							aria-haspopup='true'
							onClick={handleUserMenuOpen}
							color='inherit'
						>
							<AccountCircleIcon />
						</IconButton>
						<IconButton edge='end' className={classes.menuButton} color='inherit' aria-label='open drawer'>
							<MenuIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			<UserMenu isUserMenuOpen={isUserMenuOpen} handleMenuClose={handleMenuClose} anchorEl={anchorEl} />
		</div>
	);
};

// export Navbar Component
export default Navbar;
