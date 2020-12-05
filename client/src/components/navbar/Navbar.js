// Node Modules
import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Link, IconButton, Badge, Toolbar, Typography } from '@material-ui/core';
import {
	Menu as MenuIcon,
	Mail as MailIcon,
	Home as HomeIcon,
	LocalMall as LocalMallIcon,
	Map as MapIcon,
	Info as InfoIcon,
	Help as HelpIcon,
	Notifications as NotificationsIcon,
	AccountCircle as AccountCircleIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
// Components
import UserMenu from './UserMenu';
import MainMenu from './MainMenu';
import Register from '../auth/Register';
import Login from '../auth/Login';
// Context
import AuthContext from '../../context/auth/authContext';
import NavbarContext from '../../context/navbar/navbarContext';
// Assets
import logoPrimary from '../../assets/logo/logo-primary.svg';

// define styles
const useStyles = makeStyles(theme => ({
	grow: {
		flexGrow: 1
	},
	bgDark: {
		backgroundColor: theme.palette.background.default,
		boxShadow: theme.shadows[12]
	},
	shadowFalse: {
		boxShadow: 'none'
	},
	navbar: {
		transition: '0.4s ease-in-out',
		padding: '0.3em 0',
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

// main menu links
const mainMenuLinks = [
	{
		id: 'home',
		href: '/',
		icon: <HomeIcon />,
		linkName: 'Home'
	},
	{
		id: 'offers',
		href: '/offers',
		icon: <LocalMallIcon />,
		linkName: 'Find Offers'
	},
	{
		id: 'local',
		href: '/local',
		icon: <MapIcon />,
		linkName: 'Near You'
	},
	{
		id: 'help',
		href: '/help',
		icon: <HelpIcon />,
		linkName: 'FAQ'
	},
	{
		id: 'about',
		href: '/about',
		icon: <InfoIcon />,
		linkName: 'About'
	}
];

// Navbar Component
const Navbar = props => {
	// styling classes
	const classes = useStyles();

	// load auth context
	const authContext = useContext(AuthContext);
	// destructure auth context
	const { isAuthenticated } = authContext;

	// load navbar context
	const navbarContext = useContext(NavbarContext);
	// destructure context
	const { setMainMenuOpen, handleUserMenuOpen, scrolled, setScrolled } = navbarContext;

	// user menu id
	const menuId = 'primary-user-account-menu';

	// set scroll state
	useEffect(() => {
		window.addEventListener('scroll', setScrolled, { passive: true });
		return () => {
			window.removeEventListener('scroll', setScrolled);
		};
		// eslint-disable-next-line
	}, []);

	return (
		<div className={classes.grow}>
			<AppBar
				className={`${classes.navbar} ${scrolled.scrolledDown ? classes.bgDark : classes.shadowFalse}`}
				color='transparent'
				position='fixed'
			>
				<Toolbar>
					<Link className={classes.logoCont} component={RouterLink} to='/'>
						<img className={classes.logo} src={logoPrimary} alt='logo' />
						<Typography className={classes.title} variant='h6' noWrap>
							<span className={classes.titleSpan1}>{props.title1}</span>
							<span className={classes.titleSpan2}>{props.title2}</span>
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
						<IconButton
							onClick={() => setMainMenuOpen(true)}
							edge='end'
							className={classes.menuButton}
							color='inherit'
							aria-label='open drawer'
						>
							<MenuIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			<UserMenu menuId={menuId} />
			<Login />
			<Register />
			<MainMenu links={mainMenuLinks} title1={props.title1} title2={props.title2} version={props.version} />
		</div>
	);
};

// PropTypes
Navbar.propTypes = {
	title1: PropTypes.string.isRequired,
	title2: PropTypes.string.isRequired,
	version: PropTypes.string.isRequired
};

// export Navbar Component
export default Navbar;
