// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Card, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// define styles
const useStyles = makeStyles(theme => ({
	card: {
		padding: theme.spacing(2),
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	cardContent: {
		marginBottom: theme.spacing(1)
	},
	image: {
		marginTop: theme.spacing(1),
		height: 156,
		[theme.breakpoints.up('sm')]: {
			width: 128,
			height: 128
		}
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%'
	},
	iconTextContainer: {
		fontSize: '0.82rem'
	},
	icon: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: theme.spacing(0, 1, 0.5, 0)
	},
	text: {
		fontSize: '0.82rem'
	},
	btnContainer: {
		color: theme.palette.edit.main,
		display: 'flex',
		justifyContent: 'flex-end'
	}
}));

// CardBookings Component
const CardBookings = props => {
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			<Grid className={classes.cardContent} container spacing={2}>
				<Grid item>
					<div className={classes.image}>
						<img className={classes.img} alt='product' src={props.image} />
					</div>
				</Grid>
				<Grid item xs={12} sm container>
					<Grid item xs container direction='column' spacing={2}>
						<Grid item xs>
							<Typography gutterBottom variant='subtitle1'>
								{props.title}
							</Typography>
							<Grid item>
								{props.iconText0 && (
									<Box display='flex' alignItems='center' className={classes.iconTextContainer}>
										<Typography color={props.iconText0[2]} className={classes.icon}>
											{props.iconText0[0]}
										</Typography>
										<Typography color={props.iconText0[2]} className={classes.text}>
											{props.iconText0[1]}
										</Typography>
									</Box>
								)}
								{props.iconText1 && (
									<Box display='flex' alignItems='center' className={classes.iconTextContainer}>
										<Typography color={props.iconText1[2]} className={classes.icon}>
											{props.iconText1[0]}
										</Typography>
										<Typography color={props.iconText1[2]} className={classes.text}>
											{props.iconText1[1]}
										</Typography>
									</Box>
								)}
								{props.iconText2 && (
									<Box display='flex' alignItems='center' spacing={1} className={classes.iconTextContainer}>
										<Typography color={props.iconText2[2]} className={classes.icon}>
											{props.iconText2[0]}
										</Typography>
										<Typography color={props.iconText2[2]} className={classes.text}>
											{props.iconText2[1]}
										</Typography>
									</Box>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<div className={classes.btnContainer}>{props.button}</div>
		</Card>
	);
};

// Proptypes
CardBookings.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	button: PropTypes.object.isRequired,
	iconText0: PropTypes.array,
	iconText1: PropTypes.array,
	iconText2: PropTypes.array
};

// export CardBookings Component
export default CardBookings;
