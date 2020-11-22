// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Link, Divider, Box, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// define styles
const useStyles = makeStyles(theme => ({
	footer1: {
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
	brand1: {
		fontWeight: 'bold',
		fontSize: '0.9rem',
		color: theme.palette.primary.main
	},
	brand2: {
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
		<footer className={classes.footer1}>
			<Container className={classes.container} maxWidth='xl'>
				<Grid container spacing={4} className={classes.footer0}>
					<Grid className={classes.gridItem} item xs={12} md={7}>
						<Box>
							<Typography variant='h6' className={classes.title}>
								About
							</Typography>
							<p className={classes.aboutText}>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, maxime. Enim officia magni aspernatur
								repellat, distinctio ut porro repudiandae esse cupiditate consequuntur similique assumenda repellendus
								quaerat quasi cumque? Sed, optio? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus
								officiis nulla harum corrupti esse beatae obcaecati assumenda, ratione ea, unde eaque minima nobis
								repellat illo eos, vero ipsam at debitis.
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
									<Link href='https://goo.gl/maps/az5hgf9Y58V29TL6A' color='inherit'>
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
								<li>
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
								</li>
							</ul>
						</Box>
					</Grid>
				</Grid>
				<Divider />
				<Box className={classes.footer2}>
					<p className={classes.copyrightContainer}>
						Copyright © {props.year} All Rights Reserved by <span className={classes.brand1}>{props.brand1}</span>
						<span className={classes.brand2}>{props.brand2} </span>
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
Footer.protoTypes = {
	brand1: PropTypes.string.isRequired,
	brand2: PropTypes.string.isRequired,
	street: PropTypes.string.isRequired,
	zipAndCity: PropTypes.string.isRequired,
	country: PropTypes.string.isRequired,
	number: PropTypes.string.isRequired,
	version: PropTypes.string.isRequired,
	year: PropTypes.string.isRequired
};

// Default Props
Footer.defaultProps = {
	brand1: 'Share',
	brand2: 'Stuff',
	version: '1.0.0',
	year: '2020',
	incorporation: 'GmbH',
	street: 'Heiligengeistfeld 66',
	zipAndCity: '20359 Hamburg',
	country: 'Germany',
	number: '+493477394894'
};

// export Footer Component
export default Footer;
