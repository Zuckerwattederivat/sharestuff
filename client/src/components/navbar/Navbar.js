// Node Modules
import React, { Fragment, useContext } from 'react';
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
import NavbarContext from '../../context/navbar/navbarContext';
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
		padding: '0.3em 0',
		boxShadow: 'none',
		[theme.breakpoints.up('xl')]: {
			backgroundColor: theme.palette.background.default
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
		maxWidth: '34px',
		height: 'auto',
		marginRight: '1em'
	},
	title: {
		letterSpacing: theme.spacing(0.2),
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
	},
	itemsResponsivePosition: {
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	}
}));

// Navbar Component
const Navbar = () => {
	// styling classes
	const classes = useStyles();

	// load auth context
	const authContext = useContext(AuthContext);
	// destructure auth context
	const { isAuthenticated } = authContext;

	// load navbar context
	const navbarContext = useContext(NavbarContext);
	// destructure context
	const { handleUserMenuOpen } = navbarContext;

	// user menu id
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
								<IconButton className={classes.itemsResponsivePosition} aria-label='show new messages' color='inherit'>
									<Badge badgeContent={4} color='secondary'>
										<MailIcon />
									</Badge>
								</IconButton>
								<IconButton
									className={classes.itemsResponsivePosition}
									aria-label='show new notifications'
									color='inherit'
								>
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
			<UserMenu menuId={menuId} />
		</div>
	);
};

// export Navbar Component
export default Navbar;
