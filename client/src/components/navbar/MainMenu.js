// Node Modules
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Divider, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// Context
import NavbarContext from '../../context/navbar/navbarContext';

// define styles
const useStyles = makeStyles(theme => ({
	drawerContainer: {
		width: theme.drawer.width
	},
	drawerHeading: {
		padding: theme.spacing(2)
	},
	topDivider: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
	titleSpan1: {
		color: theme.palette.primary.main
	}
}));

// MainMenu Component
const MainMenu = props => {
	// styling classes
	const classes = useStyles();

	// load navbar context
	const navbarContext = useContext(NavbarContext);
	// destructure context
	const { mainMenuOpen, toggleMainMenu } = navbarContext;

	// ListItem
	const MenuItem = props => {
		return (
			<ListItem
				onClick={() => toggleMainMenu(false)}
				className={classes.menuItem}
				key={props.id}
				button
				component={Link}
				to={props.href}
			>
				<ListItemIcon>{props.icon}</ListItemIcon>
				<ListItemText primary={props.linkName} />
			</ListItem>
		);
	};

	return (
		<SwipeableDrawer
			className={classes.drawer}
			anchor={props.anchor}
			open={mainMenuOpen}
			onClose={() => toggleMainMenu(false)}
			onOpen={() => toggleMainMenu(true)}
			variant='temporary'
		>
			<div className={classes.drawerContainer}>
				<div className={classes.drawerHeading}>
					<Typography className={classes.lead} variant='h6'>
						<span className={classes.titleSpan1}>{props.title1}</span>
						<span className={classes.titleSpan2}>{props.title2}</span>
					</Typography>
					<Typography className={classes.lead} variant='subtitle2'>
						v{props.version}
					</Typography>
				</div>
				<Divider className={classes.topDivider} />
				<List className={classes.menuList}>
					{props.links.map(link => {
						return <MenuItem key={link.id} href={link.href} icon={link.icon} linkName={link.linkName} />;
					})}
				</List>
			</div>
		</SwipeableDrawer>
	);
};

// PropTypes
MainMenu.propTypes = {
	anchor: PropTypes.string.isRequired,
	title1: PropTypes.string.isRequired,
	title2: PropTypes.string.isRequired,
	version: PropTypes.string.isRequired,
	links: PropTypes.array.isRequired
};

// Default Props
MainMenu.defaultProps = {
	anchor: 'right',
	version: '1.0.0'
};

// export MainMenu Compinent
export default MainMenu;
