// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Grid, Link, Box, Divider } from '@material-ui/core';
import { PermContactCalendar as ContactIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

// define styles
const useStyles = makeStyles(theme => ({
	footer: {
		background: theme.palette.background.default,
		flexGrow: 1,
		padding: theme.spacing(4, 0)
	},
	title1: {
		fontWeight: 'bold',
		fontSize: theme.typography.h5.fontSize,
		color: theme.palette.primary.main
	},
	title2: {
		fontWeight: 'bold',
		fontSize: theme.typography.h5.fontSize
	},
	address: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	dividerVertical: {
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	},
	contactLink: {
		display: 'flex',
		alignItems: 'center'
	}
}));

// Footer Component
const Footer = props => {
	// styling classes
	const classes = useStyles();

	// destructure props
	const { title1, title2, address, number } = props;

	return (
		<footer className={classes.footer}>
			<Container width='xl'>
				<Grid container spacing={2}>
					<Grid className={classes.address} item xs={12}>
						<Link href='https://goo.gl/maps/MTKdHYFwViSQUrYP9' color='inherit'>
							{address}
						</Link>
						<Divider className={classes.dividerVertical} orientation='vertical' />
						<Link href={`tel:${number}`} color='inherit'>
							{number}
						</Link>
						<Divider className={classes.dividerVertical} orientation='vertical' />
						<Link className={classes.contactLink} component={RouterLink} to='/help' color='inherit'>
							<ContactIcon fontSize='small' /> Contact
						</Link>
					</Grid>
				</Grid>
			</Container>
		</footer>
	);
};

// PropTypes
Footer.protoTypes = {
	title1: PropTypes.string.isRequired,
	title2: PropTypes.string.isRequired,
	address: PropTypes.string.isRequired,
	number: PropTypes.string.isRequired
};

// Default Props
Footer.defaultProps = {
	title1: 'Share',
	title2: 'Stuff',
	address: 'Heiligengeistfeld 66, 20359 Hamburg - Germany',
	number: '+493477394894'
};

// export Footer Component
export default Footer;
