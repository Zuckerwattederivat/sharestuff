// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Typography, CardActionArea, Card, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// Utils

// define styles
const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: 500,
		background: theme.palette.background.paper
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
	}
}));

// CardMediaSm Component
const CardMediaSm = props => {
	const classes = useStyles();

	const returnContent = () => {
		return (
			<Grid container spacing={2}>
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
							<Typography variant='body2' gutterBottom>
								{props.subtitle}
							</Typography>
							<Typography variant='body2' color='textSecondary'>
								{props.children}
							</Typography>
						</Grid>
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
		);
	};

	return (
		<Card className={classes.root}>
			{props.link ? (
				<CardActionArea className={classes.paper} component={Link} to={props.link}>
					{returnContent()}
				</CardActionArea>
			) : (
				<CardActionArea className={classes.paper} onClick={props.onClick}>
					{returnContent()}
				</CardActionArea>
			)}
		</Card>
	);
};

// Proptypes
CardMediaSm.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	link: PropTypes.string,
	onClick: PropTypes.func,
	iconText0: PropTypes.array,
	iconText1: PropTypes.array,
	iconText2: PropTypes.array
};

// export CardMediaSm Component
export default CardMediaSm;
