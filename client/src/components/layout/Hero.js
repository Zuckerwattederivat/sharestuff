// Node Modules
import React from 'react';
import { Container, makeStyles, Paper, Typography } from '@material-ui/core';
// Assets
import HeroImage from '../../assets/hero/hero-4.jpg';

// define styles
const useStyles = makeStyles(theme => ({
	hero: {
		height: '95vh',
		backgroundImage: `url(${HeroImage})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover'
	},
	overlay: {
		background: 'rgba(0, 0, 0, 0.65)',
		position: 'relative',
		zIndex: 10,
		left: 0,
		top: 0,
		minWidth: '100%',
		minHeight: '95vh'
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		height: '95vh',
		maxWidth: '700px'
	},
	title: {
		fontWeight: 'bold',
		fontSize: '2.2rem',
		color: '#fff',
		lineHeight: theme.spacing(0.19)
	},
	shape: {
		position: 'relative',
		zIndex: 20,
		top: '-50px',
		bottom: 0,
		left: 0,
		width: '100%',
		overflow: 'hidden',
		lineHeight: 0
	},
	svg: {
		position: 'relative',
		display: 'block',
		width: 'calc(144% + 1.3px)',
		height: '50px'
	},
	shapeFill: {
		fill: '#212121'
	}
}));

// Hero Component
const Hero = () => {
	// styling classes
	const classes = useStyles();

	return (
		<div className={classes.hero}>
			<div className={classes.overlay}>
				<Container className={classes.container} maxWidth='xl'>
					<Typography className={classes.title} variant='h1'>
						Rent tools for your next home project from people near you.
					</Typography>
				</Container>
			</div>
			<div className={classes.shape}>
				<svg
					className={classes.svg}
					data-name='Layer 1'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 1200 120'
					preserveAspectRatio='none'
				>
					<path
						d='M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z'
						className={classes.shapeFill}
					/>
				</svg>
			</div>
		</div>
	);
};

// export Hero Component
export default Hero;
