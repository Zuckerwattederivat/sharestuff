// Node Modules
import React, { Fragment } from 'react';
import { Container, makeStyles, Typography, Box } from '@material-ui/core';
import { motion } from 'framer-motion';
// Components
import MainSearch from '../search/MainSearch';
// Assets
import HeroImage from '../../assets/hero/hero-2.jpg';

// define styles
const useStyles = makeStyles(theme => ({
	hero: {
		height: '85vh',
		backgroundImage: `url(${HeroImage})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: '50% 45%',
		filter: 'blur(2px)'
	},
	overlay: {
		background: 'rgba(0, 0, 0, 0.65)',
		position: 'relative',
		zIndex: 10,
		left: 0,
		top: 0,
		minWidth: '100%',
		minHeight: '85vh'
	},
	container: {
		position: 'absolute',
		zIndex: 20,
		top: '25%',
		display: 'flex',
		justifyContent: 'center',
		width: '100%'
	},
	title: {
		maxWidth: '770px',
		fontWeight: '600',
		fontSize: theme.typography.h4.fontSize,
		color: '#fff',
		lineHeight: theme.spacing(0.2),
		marginBottom: theme.spacing(3)
	},
	titleChild2: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'inline'
		}
	},
	textPrimary: {
		color: theme.palette.primary.main
	},
	shape: {
		position: 'relative',
		zIndex: 30,
		top: '-50px',
		bottom: '10px',
		left: 0,
		width: '100%',
		overflow: 'hidden',
		lineHeight: 0
	},
	svg: {
		position: 'relative',
		display: 'block',
		width: 'calc(144% + 1.3px)',
		height: '60px'
	},
	shapeFill: {
		fill: theme.palette.background.custom
	}
}));

// Hero Component
const Hero = () => {
	// styling classes
	const classes = useStyles();

	return (
		<Fragment>
			<div className={classes.hero}>
				<div className={classes.overlay} />
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
			<Container className={classes.container} maxWidth='xl'>
				<Box width='800px'>
					<motion.div
						transition={{
							duration: 0.6,
							type: 'tween'
						}}
						initial={{ y: '-40%', opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
					>
						<Typography className={classes.title} variant='h1'>
							<span className={classes.titleChild1}>
								<span className={classes.textPrimary}>Rent</span> tools or other
								<span className={classes.textPrimary}> items</span> from people near you.
							</span>
							<span className={classes.titleChild2}>
								{' '}
								Start working on your home projects
								<span className={classes.textPrimary}> today</span>.
							</span>
						</Typography>
					</motion.div>
					<motion.div
						transition={{
							duration: 0.6,
							type: 'tween'
						}}
						initial={{ y: '-40%', opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
					>
						<MainSearch />
					</motion.div>
				</Box>
			</Container>
		</Fragment>
	);
};

// export Hero Component
export default Hero;
