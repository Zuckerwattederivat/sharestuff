// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardContent, Button, Typography, Box } from '@material-ui/core';
import { ArrowRight as ArrowRightIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
// Utils
import utils from '../../utils/helpers';

// define styles
const useStyles = makeStyles(theme => ({
	root: {
		minWidth: 275,
		width: '100%',
		minHeight: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'column'
	},
	cardActions: {
		flexBasis: '10%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		padding: theme.spacing(2, 1, 1, 2)
	},
	iconTextContainer: {
		fontSize: '0.92rem',
		margin: theme.spacing(0, 0, 0.5, 0.5)
	},
	icon: {
		fontSize: '0.92rem',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: theme.spacing(0, 1, 0.5, 0)
	},
	text: {
		fontSize: '0.92rem'
	},
	button: {
		margin: theme.spacing(0, 0.5, 0.5, 0)
	}
}));

// CardText Component
const CardText = props => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography gutterBottom variant='h5' component='h2'>
					{utils.capitalizeFirstLetter(props.title)}
				</Typography>
				<br />
				{props.children.map((string, index) => {
					if (string) {
						return (
							<Typography variant='body1' key={index}>
								{string}
							</Typography>
						);
					} else {
						return <br key={index} />;
					}
				})}
			</CardContent>
			<CardActions className={classes.cardActions}>
				<Box display='flex' flexDirection='column'>
					{props.iconText0 ? (
						<Box display='flex' alignItems='center' className={classes.iconTextContainer}>
							<Typography color={props.iconText0.iconColor} className={classes.icon} variant='body1'>
								{props.iconText0.icon}
							</Typography>
							<Typography color={props.iconText0.textColor} className={classes.text} variant='body1'>
								{props.iconText0.text}
							</Typography>
						</Box>
					) : (
						<span />
					)}
					{props.iconText1 ? (
						<Box display='flex' alignItems='center' className={classes.iconTextContainer}>
							<Typography color={props.iconText1.iconColor} className={classes.icon} variant='body1'>
								{props.iconText1.icon}
							</Typography>
							<Typography color={props.iconText1.textColor} className={classes.text} variant='body1'>
								{props.iconText1.text}
							</Typography>
						</Box>
					) : (
						<span />
					)}
				</Box>
				{props.btnClick && (
					<Button
						className={classes.button}
						variant={props.btnProps.variant}
						size={props.btnProps.size}
						color={props.btnProps.color}
						startIcon={props.btnProps.startIcon}
						endIcon={props.btnProps.endIcon}
						onClick={props.btnClick}
						disabled={props.btnProps.disabled}
					>
						{props.btnName}
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

// Proptypes
CardText.propTypes = {
	title: PropTypes.string.isRequired,
	btnName: PropTypes.string.isRequired,
	btnProps: PropTypes.object.isRequired,
	btnClick: PropTypes.func.isRequired,
	iconText0: PropTypes.object,
	iconText1: PropTypes.object
};

// default props
CardText.defaultProps = {
	btnName: 'View',
	btnProps: {
		variant: 'text',
		size: 'medium',
		color: 'primary',
		endIcon: <ArrowRightIcon />,
		disabled: false
	}
};

// export CardText Component
export default CardText;
