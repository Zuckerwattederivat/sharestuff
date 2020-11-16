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

// define styles
const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 600,
		minHeight: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column'
	},
	media: {
		height: 200
	},
	cardActions: {
		flexBasis: '10%',
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		padding: theme.spacing(1, 1, 1)
	}
}));

// CardMedia Component
const CardMedia = props => {
	// define classes
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardActionArea className={classes.actionArea} component={Link} to={props.link}>
				<CardImage className={classes.media} image={props.image} title={props.title} />
				<CardContent>
					<Typography gutterBottom variant='h5' component='h2'>
						{props.title.toUpperCase()}
					</Typography>
					<Typography variant='body1'>{props.children}</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions className={classes.cardActions}>
				<Button size='small' color='primary' endIcon={props.btnicon} component={Link} to={props.link}>
					{props.btnname}
				</Button>
			</CardActions>
		</Card>
	);
};

// Proptypes
CardMedia.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	btnicon: PropTypes.object.isRequired,
	btnname: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired
};

// export CardMedia Component
export default CardMedia;
