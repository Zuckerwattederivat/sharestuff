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
		alignItems: 'space-between',
		padding: theme.spacing(1, 1, 1)
	},
	price: {
		color: theme.palette.primary.main,
		margin: 0,
		padding: theme.spacing(1)
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
				{props.price && <Typography className={classes.price}>{props.price}</Typography>}
				<Button size='small' color='primary' endIcon={props.btnicon} component={Link} to={props.link}>
					{props.btnname}
				</Button>
			</CardActions>
		</Card>
	);
};

// Proptypes
CardMediaV2.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	btnicon: PropTypes.object.isRequired,
	btnname: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	price: PropTypes.string
};

// export CardMediaV2 Component
export default CardMediaV2;
