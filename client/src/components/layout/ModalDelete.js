// Node Modules
import React, { useContext } from 'react';
import { Modal, Backdrop, Box, Typography, Button } from '@material-ui/core';
import { Delete as DeleteIcon, Cancel as CancelIcon, Close as CloseIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
// Context
import ProfileContext from '../../context/profile/profileContext';
// Assets
import WarningSvg from '../../assets/undraw/warning.svg';
import DeletedGif from '../../assets/deleted-transparent.gif';
import LoadingGif from '../../assets/loading-transparent.gif';

// define styles
const useStyles = makeStyles(theme => ({
	textDeleted: {
		color: '#FE211F'
	},

	deleteModal: {
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
		height: '425px',
		padding: theme.spacing(2, 3),
		[theme.breakpoints.up('sm')]: {
			width: '540px',
			height: '455px'
		}
	},
	title: {
		textAlign: 'center',
		fontWeight: '500'
	},
	titleSpan2: {
		color: theme.palette.primary.main
	},
	responseContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		height: '100%',
		'& p': {
			textAlign: 'center'
		}
	},
	h3: {
		textAlign: 'center',
		fontSize: '1.5rem',
		fontWeight: 700,
		margin: theme.spacing(4, 0, 1.5)
	},
	messageSvg: {
		maxHeight: '450px',
		maxWidth: '100%',
		[theme.breakpoints.up('sm')]: {
			maxHeight: '250px'
		}
	},
	btnContainer: {
		width: '100%',
		display: 'flex',
		marginTop: theme.spacing(4),
		justifyContent: 'flex-end'
	},
	btn1: {
		marginRight: theme.spacing(1)
	}
}));

// ModalDelete Component
const ModalDelete = () => {
	// styling classes
	const classes = useStyles();

	// load profile context
	const profileContext = useContext(ProfileContext);
	const { modalDelete, success, loading, setModal, deleteOffer } = profileContext;

	return (
		<Modal
			className={classes.deleteModal}
			aria-labelledby='delete-modal'
			aria-describedby='delete-modal-description'
			open={modalDelete}
			onClose={() => setModal('delete', false)}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{ timeout: 500 }}
		>
			<motion.div
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
				{!loading && !success ? (
					<Box width='100%' className={classes.responseContainer}>
						<img className={classes.messageSvg} src={WarningSvg} alt='warning' />
						<Typography variant='h3' color='secondary' className={classes.h3}>
							Warning
						</Typography>
						<Typography variant='body1'>Do you really want to delete this offer?</Typography>
						<Box className={classes.btnContainer}>
							<Button
								size='large'
								className={classes.btn1}
								variant='outlined'
								color='primary'
								startIcon={<CancelIcon />}
								onClick={() => setModal('delete', false)}
							>
								Cancel
							</Button>
							<Button
								size='large'
								variant='contained'
								color='secondary'
								startIcon={<DeleteIcon />}
								onClick={() => deleteOffer()}
							>
								Delete
							</Button>
						</Box>
					</Box>
				) : !success ? (
					<Box width='100%' className={classes.responseContainer}>
						<img className={classes.messageSvg} src={DeletedGif} alt='deleted' />
					</Box>
				) : (
					<Box width='100%' className={classes.responseContainer}>
						<img className={classes.messageSvg} src={DeletedGif} alt='deleted' />
						<Typography variant='h3' className={`${classes.h3} ${classes.textDeleted} `}>
							Offer deleted
						</Typography>
						<Typography variant='body1'>You successfully deleted this offer.</Typography>
						<Box width='100%' className={classes.btnContainer}>
							<Button
								size='large'
								className={classes.btn1}
								variant='outlined'
								color='inherit'
								startIcon={<CloseIcon />}
								onClick={() => setModal('delete', false)}
							>
								Close
							</Button>
						</Box>
					</Box>
				)}
			</motion.div>
		</Modal>
	);
};

// export ModalDelete Component
export default ModalDelete;
