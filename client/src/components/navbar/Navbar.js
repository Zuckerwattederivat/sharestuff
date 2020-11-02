// Node Modules
import React, { Fragment, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Link, IconButton, Badge, Toolbar, Typography } from '@material-ui/core';
import {
	Menu as MenuIcon,
	Mail as MailIcon,
	Notifications as NotificationsIcon,
	AccountCircle
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
// Assets
import logoWhite from '../../assets/logo/logo-white.svg';
import logoPrimary from '../../assets/logo/logo-primary.svg';
import logoBlack from '../../assets/logo/logo-black.svg';

// use styles
const useStyles = makeStyles(theme => ({
	grow: {
		flexGrow: 1
	},
	navbar: {
		padding: '1.5em 1em',
		boxShadow: 'none',
		[theme.breakpoints.up('sm')]: {
			padding: '1em 2em'
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
const Navbar = () => {
	// styling classes
	const classes = useStyles();

	// state
	const [ isAuthenticated, setAuthenticated ] = useState(true);

	return (
		<div className={classes.grow}>
			<AppBar className={classes.navbar} color='transparent' position='sticky'>
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
							// aria-controls={menuId}
							aria-haspopup='true'
							// onClick={handleProfileMenuOpen}
							color='inherit'
						>
							<AccountCircle />
						</IconButton>
						<IconButton edge='end' className={classes.menuButton} color='inherit' aria-label='open drawer'>
							<MenuIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
};

// export Navbar Component
export default Navbar;
