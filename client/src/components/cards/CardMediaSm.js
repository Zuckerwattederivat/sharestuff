// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Typography, CardActionArea, Card } from '@material-ui/core';
import { LocalOffer as LocalOfferIcon, LocationOn as LocationIcon } from '@material-ui/icons';
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
		width: 128,
		height: 128
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%'
	},
	priceAndLocation: {
		fontSize: '0.92rem'
	}
}));

// CardMediaSm Component
const CardMediaSm = props => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			{props.link ? (
				<CardActionArea className={classes.paper} component={Link} to={props.link}>
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
										by {props.creator}
									</Typography>
									<Typography variant='body2' color='textSecondary'>
										{props.children}
									</Typography>
								</Grid>
								<Grid item>
									<Grid container spacing={1}>
										<Grid item>
											<LocalOfferIcon color='primary' size='small' />
										</Grid>
										<Grid item>
											<Typography className={classes.priceAndLocation} color='primary' variant='subtitle1'>
												{props.price}
											</Typography>
										</Grid>
									</Grid>
									<Grid container spacing={1}>
										<Grid item>
											<LocationIcon color='primary' size='small' />
										</Grid>
										<Grid item>
											<Typography className={classes.priceAndLocation} color='primary' variant='subtitle1'>
												{props.location}
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</CardActionArea>
			) : (
				<CardActionArea className={classes.paper} onClick={props.onClick}>
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
										by {props.creator}
									</Typography>
									<Typography variant='body2' color='textSecondary'>
										{props.children}
									</Typography>
								</Grid>
								<Grid item>
									<Grid container spacing={1}>
										<Grid item>
											<LocalOfferIcon color='primary' size='small' />
										</Grid>
										<Grid item>
											<Typography className={classes.priceAndLocation} color='primary' variant='subtitle1'>
												{props.price}
											</Typography>
										</Grid>
									</Grid>
									<Grid container spacing={1}>
										<Grid item>
											<LocationIcon color='primary' size='small' />
										</Grid>
										<Grid item>
											<Typography className={classes.priceAndLocation} color='primary' variant='subtitle1'>
												{props.location}
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</CardActionArea>
			)}
		</Card>
	);
};

// Proptypes
CardMediaSm.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	link: PropTypes.string,
	price: PropTypes.string.isRequired,
	location: PropTypes.string.isRequired,
	creator: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

// export CardMediaSm Component
export default CardMediaSm;
