// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia as CardImage,
	Button,
	Typography
} from '@material-ui/core';
import { LocalOffer as LocalOfferIcon, LocationOn as LocationIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
// Utils
import utils from '../../utils/helpers';

// define styles
const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		minHeight: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column'
	},
	media: {
		height: 300
	},
	cardActions: {
		flexBasis: '10%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		padding: theme.spacing(2, 1, 1, 2)
	},
	priceAndLocation: {
		color: theme.palette.primary.main,
		fontSize: '0.92rem',
		margin: 0,
		'& span': {
			display: 'flex',
			alignItems: 'center',
			minHeight: '35px'
		}
	},
	icon: {
		margin: theme.spacing(0, 1, 0, 0)
	}
}));

// CardMediaV2 Component
const CardMediaV2 = props => {
	// define classes
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardActionArea className={classes.cardActionArea} component={Link} to={props.link}>
				<CardImage className={classes.media} image={props.image} title={props.title} />
				<CardContent>
					<Typography gutterBottom variant='h5' component='h2'>
						{utils.capitalizeFirstLetter(props.title)}
					</Typography>
					{props.children}
				</CardContent>
			</CardActionArea>
			<CardActions className={classes.cardActions}>
				<Typography className={classes.priceAndLocation}>
					<span>
						<LocalOfferIcon size='small' className={classes.icon} /> {props.price}
					</span>
					<span>
						<LocationIcon size='small' className={classes.icon} /> {props.location}
					</span>
				</Typography>
				<Button size='small' color='primary' endIcon={props.btnIcon} component={Link} to={props.link}>
					{props.btnName}
				</Button>
			</CardActions>
		</Card>
	);
};

// Proptypes
CardMediaV2.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	btnIcon: PropTypes.object.isRequired,
	btnName: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	price: PropTypes.string,
	location: PropTypes.string
};

// export CardMediaV2 Component
export default CardMediaV2;
