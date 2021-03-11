// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Container, IconButton, Link, Divider, Box, Typography, Grid } from '@material-ui/core';
import { ArrowUpward as ArrowUpwardIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

// define styles
const useStyles = makeStyles(theme => ({
	footer: {
		background: theme.palette.background.default,
		padding: theme.spacing(4, 0)
	},
	container: {
		[theme.breakpoints.up('lg')]: {
			padding: theme.spacing(0, 13)
		},
		[theme.breakpoints.up('xl')]: {
			padding: theme.spacing(0, 19)
		}
	},
	upButton: {
		position: 'fixed',
		right: theme.spacing(1.6),
		bottom: theme.spacing(1.6),
		zIndex: 1500
	},
	title1: {
		fontWeight: 'bold',
		fontSize: '0.9rem',
		color: theme.palette.primary.main
	},
	title2: {
		fontWeight: 'bold',
		fontSize: '0.9rem'
	},
	title: {
		fontSize: '1rem',
		fontWeight: 'bold',
		color: theme.palette.primary.main
	},
	gridItem: {
		[theme.breakpoints.up('md')]: {
			display: 'flex',
			justifyContent: 'center'
		}
	},
	list: {
		listStyle: 'none',
		padding: 0,
		'& a': {
			lineHeight: '2rem'
		}
	}
}));

// Footer Component
const Footer = props => {
	// styling classes
	const classes = useStyles();

	return (
		<footer className={classes.footer}>
			<Container className={classes.container} maxWidth='xl'>
				<IconButton className={classes.upButton} color='inherit' variant='filled' onClick={() => window.scrollTo(0, 0)}>
					<ArrowUpwardIcon />
				</IconButton>
				<Grid container spacing={4} className={classes.footer0}>
					<Grid className={classes.gridItem} item xs={12} md={7}>
						<Box>
							<Typography variant='h6' className={classes.title}>
								About
							</Typography>
							<p className={classes.aboutText}>
								ShareStuff is a rent and let platform for everyday items like technical equipment, kitchen appliances,
								tools or entertainment technology. Users are able to rent these items from and to people near them. The
								mission of ShareStuff is to make renting items in a neighbourly manner as easy as buying something from
								an online retailer.
							</p>
						</Box>
					</Grid>
					<Grid className={classes.gridItem} item xs={7} md={3}>
						<Box>
							<Typography variant='h6' className={classes.title}>
								Contact
							</Typography>
							<ul className={classes.list}>
								<li>
									<Link href={`tel:${props.number}`} color='inherit'>
										Phone: {props.number} <i className='fas fa-external-link-alt' />
									</Link>
								</li>
								<li>
									<Link href={props.locationLink} color='inherit'>
										Address: {props.street} <br />
										{props.zipAndCity + ' ' + props.country} <i className='fas fa-external-link-alt' />
									</Link>
								</li>
							</ul>
						</Box>
					</Grid>
					<Grid className={classes.gridItem} item xs={5} md={2}>
						<Box>
							<Typography variant='h6' className={classes.title}>
								Quick Links
							</Typography>
							<ul className={classes.list}>
								<li>
									<Link component={RouterLink} to='/' color='inherit'>
										Home
									</Link>
								</li>
								<li>
									<Link component={RouterLink} color='inherit' to='/offers'>
										Find Offers
									</Link>
								</li>
								{/* <li>
									<Link component={RouterLink} color='inherit' to='/local'>
										Near You
									</Link>
								</li>
								<li>
									<Link component={RouterLink} color='inherit' to='/help'>
										FAQ
									</Link>
								</li>
								<li>
									<Link component={RouterLink} color='inherit' to='/about'>
										About
									</Link>
								</li> */}
							</ul>
						</Box>
					</Grid>
				</Grid>
				<Divider />
				<Box>
					<p className={classes.copyrightContainer}>
						Copyright © {props.year} All Rights Reserved by <span className={classes.title1}>{props.title1}</span>
						<span className={classes.title2}>{props.title2} </span>
						{props.incorporation}
						<br />
						Version: {props.version}
					</p>
				</Box>
			</Container>
		</footer>
	);
};

// PropTypes
Footer.propTypes = {
	title1: PropTypes.string.isRequired,
	title2: PropTypes.string.isRequired,
	street: PropTypes.string.isRequired,
	zipAndCity: PropTypes.string.isRequired,
	country: PropTypes.string.isRequired,
	number: PropTypes.string.isRequired,
	version: PropTypes.string.isRequired,
	year: PropTypes.string.isRequired,
	locationLink: PropTypes.string.isRequired
};

// export Footer Component
export default Footer;
