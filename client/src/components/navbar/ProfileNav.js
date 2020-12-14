// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { MenuBook as MenuBookIcon, Bookmark as BookmarkIcon, Message as MessageIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';

// define styles
const useStyles = makeStyles(theme => ({
	profileNav: {
		[theme.breakpoints.down('xs')]: {
			padding: theme.spacing(8, 2.4, 0)
		},
		background: theme.palette.background.default,
		padding: theme.spacing(8, 3.4, 0),
		width: '100%'
	},
	navContainer: {
		width: '100%',
		display: 'flex',
		justifyContent: 'flex-end'
	},
	linkList: {
		display: 'flex',
		flexWrap: 'wrap',
		listStyle: 'none',
		margin: theme.spacing(2.5, 0, 0),
		padding: 0
	},
	linkItem: {
		padding: theme.spacing(0, 0, 2),
		cursor: 'pointer',
		'&:first-child': {
			marginLeft: 0
		},
		'&:nth-child(2)': {
			margin: theme.spacing(0, 2)
		},
		'&:last-child': {
			marginLeft: 0
		},
		[theme.breakpoints.up('sm')]: {
			'&:nth-child(2)': {
				margin: theme.spacing(0, 4)
			}
		}
	},
	tabActive: {
		[theme.breakpoints.up('sm')]: {
			borderBottom: `2px solid ${theme.palette.primary.main}`
		}
	},
	linkText: {
		display: 'flex',
		alignItems: 'center',
		'& svg': {
			marginRight: theme.spacing(1)
		}
	}
}));

// ProfileNav Component
const ProfileNav = props => {
	// define styles
	const classes = useStyles();

	// desrtcuture props
	const { tab, changeTab, scrolled } = props;

	return (
		<motion.div
			className={`${classes.profileNav}`}
			transition={{
				duration: 0.1,
				type: 'ease'
			}}
			initial={{ y: 0 }}
			animate={scrolled.scrolledDown ? { y: -60, position: 'fixed' } : { y: 0 }}
		>
			<nav className={classes.navContainer}>
				<ul className={classes.linkList}>
					<li
						onClick={() => changeTab('offers')}
						className={tab === 'offers' ? `${classes.linkItem} ${classes.tabActive}` : classes.linkItem}
					>
						<Typography className={classes.linkText} variant='body2' color={tab === 'offers' ? 'primary' : 'inherit'}>
							<MenuBookIcon fontSize='small' /> Offers
						</Typography>
					</li>
					<li
						onClick={() => changeTab('bookings')}
						className={tab === 'bookings' ? `${classes.linkItem} ${classes.tabActive}` : classes.linkItem}
					>
						<Typography className={classes.linkText} variant='body2' color={tab === 'bookings' ? 'primary' : 'inherit'}>
							<BookmarkIcon fontSize='small' /> Bookings
						</Typography>
					</li>
					<li
						onClick={() => changeTab('messages')}
						className={tab === 'messages' ? `${classes.linkItem} ${classes.tabActive}` : classes.linkItem}
					>
						<Typography className={classes.linkText} variant='body2' color={tab === 'messages' ? 'primary' : 'inherit'}>
							<MessageIcon fontSize='small' /> Messages
						</Typography>
					</li>
				</ul>
			</nav>
		</motion.div>
	);
};

ProfileNav.propTypes = {
	tab: PropTypes.string.isRequired,
	changeTab: PropTypes.func.isRequired,
	scrolled: PropTypes.object.isRequired
};

// export ProfileNav Component
export default ProfileNav;
