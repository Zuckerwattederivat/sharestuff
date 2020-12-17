// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia as CardImage, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// Utils
import utils from '../../utils/helpers';

// define styles
const useStyles = makeStyles(theme => ({
	root: {
		[theme.breakpoints.down('xs')]: {
			height: 300
		},
		width: '100%',
		height: '100%',
		'& button': {
			height: '100%'
		}
	},
	active: {
		borderBottom: `2px solid ${theme.palette.primary.main}`
	},
	media: {
		minHeight: '100%'
	},
	titleContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontWeight: 500,
		'& svg': {
			marginRight: theme.spacing(1)
		}
	},
	cardContent: {
		position: 'absolute',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		top: 0,
		zIndex: 10,
		width: '100%',
		height: '100%',
		background: 'rgba(0, 0, 0, 0.4)'
	}
}));
// CardPictureV2 Component
const CardPictureV2 = props => {
	// define classes
	const classes = useStyles();

	return (
		<Card className={props.active ? classes.active : classes.root}>
			{props.link && (
				<CardActionArea minHeight='100%' className={classes.cardActionArea} component={Link} to={props.link}>
					<CardImage className={classes.media} image={props.image} title={props.title} />
					<CardContent className={classes.cardContent}>
						<Typography className={classes.titleContainer} gutterBottom variant='h5' component='h2'>
							{props.icon}
							{utils.capitalizeFirstLetter(props.title)}
						</Typography>
						{props.children}
					</CardContent>
				</CardActionArea>
			)}
			{props.onClick && (
				<CardActionArea className={classes.cardActionArea} onClick={props.onClick}>
					<CardImage className={classes.media} image={props.image} title={props.title} />
					<CardContent className={classes.cardContent}>
						<Typography className={classes.titleContainer} gutterBottom variant='h5' component='h2'>
							{props.icon}
							{utils.capitalizeFirstLetter(props.title)}
						</Typography>
						{props.children}
					</CardContent>
				</CardActionArea>
			)}
		</Card>
	);
};

// Proptypes
CardPictureV2.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	active: PropTypes.bool.isRequired,
	icon: PropTypes.object,
	link: PropTypes.string,
	onClick: PropTypes.func
};

// export CardPictureV2 Component
export default CardPictureV2;
