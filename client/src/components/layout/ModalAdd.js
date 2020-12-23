// Node Modules
import React, { useContext } from 'react';
import { Modal, Backdrop, Box, Typography, Divider, Grid, TextField, Button } from '@material-ui/core';
import { Cancel as CancelIcon, AddCircle as AddCircleIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
// Context
import ProfileContext from '../../context/profile/profileContext';
// Assets
import LoadingGif from '../../assets/loading-transparent.gif';

// define styles
const useStyles = makeStyles(theme => ({
	addModal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	paper: {
		backgroundColor: theme.palette.background.custom,
		boxShadow: theme.shadows[5],
		outline: 'none',
		borderRadius: '10px',
		color: '#fff',
		width: '90%',
		[theme.breakpoints.up('sm')]: {
			width: '540px'
		},
		[theme.breakpoints.up('md')]: {
			width: '800px'
		}
	},
	title: {
		padding: theme.spacing(2),
		textAlign: 'center',
		fontWeight: '500'
	},
	titleSpan2: {
		color: theme.palette.primary.main
	},
	addContainer: {
		padding: theme.spacing(3, 4)
	},
	description: {
		textAlign: 'center',
		margin: theme.spacing(0, 0, 3)
	},
	grid: {
		marginBottom: theme.spacing(3)
	},
	textfield: {
		width: '100%'
	},
	buttonContainer: {
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'space-between'
		}
	},
	cancelButton: {
		[theme.breakpoints.down('xs')]: {
			width: '47%'
		},
		marginRight: theme.spacing(1)
	},
	addButton: {
		[theme.breakpoints.down('xs')]: {
			width: '47%'
		}
	},
	buttonIcon: {
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	}
}));

// ModalDelete Component
const ModalDelete = () => {
	// styling classes
	const classes = useStyles();

	// load profile context
	const profileContext = useContext(ProfileContext);
	const { modalAdd, success, loading, setModal } = profileContext;

	// submit offer
	const submitOffer = () => {
		console.log('add offer');
	};

	return (
		<Modal
			className={classes.addModal}
			aria-labelledby='add-modal'
			aria-describedby='add-modal-description'
			open={true}
			onClose={() => setModal('add', false)}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{ timeout: 500 }}
		>
			<div
				className={classes.paper}
				transition={{
					duration: 0.6,
					type: 'spring',
					damping: 10,
					stiffness: 70
				}}
				initial={{ y: '100vh' }}
				animate={{ y: 0 }}
			>
				{!success &&
				!loading && (
					<Box width='100%' height='100%'>
						<Typography id='register-modal-title' className={classes.title} variant='h5'>
							<span className={classes.titleSpan2}>New</span> <span className={classes.titleSpan1}>Offer</span>
						</Typography>
						<Divider className={classes.topDivider} />
						<Box width='100%' className={classes.addContainer}>
							<Typography className={classes.description} variant='subtitle1'>
								Add a new offer.
							</Typography>
							<form onSubmit={submitOffer}>
								<Grid className={classes.grid} width='100%' container spacing={2}>
									<Grid item xs={6}>
										hello
									</Grid>
								</Grid>
								<Box className={classes.buttonContainer} width='100%' display='flex' justifyContent='flex-end'>
									<Button
										className={classes.cancelButton}
										width='100%'
										variant='outlined'
										startIcon={<CancelIcon className={classes.buttonIcon} />}
										size='large'
									>
										Cancel
									</Button>
									<Button
										className={classes.addButton}
										name='submit'
										type='submit'
										width='100%'
										variant='outlined'
										color='primary'
										startIcon={<AddCircleIcon className={classes.buttonIcon} />}
										size='large'
									>
										Add
									</Button>
								</Box>
							</form>
						</Box>
					</Box>
				)}
			</div>
		</Modal>
	);
};

// export ModalDelete Component
export default ModalDelete;
