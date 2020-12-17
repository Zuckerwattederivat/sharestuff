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
	Box,
	Typography
} from '@material-ui/core';
import { LocalOffer as LocalOfferIcon, LocationOn as LocationIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
// Utils
import utils from '../../utils/helpers';

// define styles
const useStyles = makeStyles(theme => ({
	textPrimary: {
		color: theme.palette.primary.main
	},
	textEdit: {
		color: theme.palette.edit.main
	},
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

// CardMediaV3 Component
const CardMediaV3 = props => {
	// define classes
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardActionArea className={classes.cardActionArea}>
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
				{props.button1 && (
					<Box
						className={props.button1.colorExtra === 'edit' && classes.textEdit}
						display='flex'
						flexDirection='column'
					>
						<Button
							size={props.button1.size && props.button1.size}
							variant={props.button1.variant && props.button1.variant}
							color={props.button1.color && props.button1.color}
							startIcon={props.button1.startIcon && props.button1.startIcon}
							endIcon={props.button1.endIcon && props.button1.endIcon}
							onClick={props.button1.onClick && props.button1.onClick}
						>
							{props.button1.name}
						</Button>
						{props.button2 && (
							<Button
								size={props.button2.size && props.button2.size}
								variant={props.button2.variant && props.button2.variant}
								color={props.button2.color && props.button2.color}
								startIcon={props.button2.startIcon && props.button2.startIcon}
								endIcon={props.button2.endIcon && props.button2.endIcon}
								onClick={props.button2.onClick && props.button2.onClick}
							>
								{props.button2.name}
							</Button>
						)}
					</Box>
				)}
			</CardActions>
		</Card>
	);
};

// Proptypes
CardMediaV3.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	button1: PropTypes.object,
	button2: PropTypes.object,
	price: PropTypes.string,
	location: PropTypes.string
};

// export CardMediaV3 Component
export default CardMediaV3;
