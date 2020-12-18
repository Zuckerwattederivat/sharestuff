// Node Modules
import React, { useContext } from 'react';
import { Modal, Backdrop, Box, Typography, Button } from '@material-ui/core';
import { Delete as DeleteIcon, Cancel as CancelIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
// Context
import ProfileContext from '../../context/profile/profileContext';
// Assets
import WarningSvg from '../../assets/undraw/warning.svg';

// define styles
const useStyles = makeStyles(theme => ({
	profileModal: {
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
		padding: theme.spacing(2, 3),
		[theme.breakpoints.up('sm')]: {
			width: '540px'
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
		'& h3': {
			textAlign: 'center',
			fontSize: '1.5rem',
			fontWeight: 700,
			margin: theme.spacing(4, 0, 1.5)
		},
		'& p': {
			textAlign: 'center'
		}
	},
	messageSvg: {
		maxHeight: '450px',
		maxWidth: '100%',
		[theme.breakpoints.up('sm')]: {
			maxHeight: '250px'
		}
	},
	btn1: {
		marginRight: theme.spacing(1)
	}
}));

// ModalProfile Component
const ModalProfile = props => {
	// styling classes
	const classes = useStyles();

	// load profile context
	const profileContext = useContext(ProfileContext);
	const { modalOpen, action, offer, setModal } = profileContext;

	return (
		<Modal
			className={classes.profileModal}
			aria-labelledby='login-modal-title'
			aria-describedby='login-modal-description'
			open={modalOpen}
			onClose={() => setModal(false)}
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
				{action === 'add' && <div>{action}</div>}
				{action === 'edit' && <div>{action}</div>}
				{action === 'delete' && (
					<Box width='100%' className={classes.responseContainer}>
						<img className={classes.messageSvg} src={WarningSvg} alt='warning' />
						<Typography variant='h3' color='secondary'>
							Please Confirm
						</Typography>
						<Typography variant='body1'>Do you really want to delete this offer?</Typography>
						<Box width='100%' display='flex' justifyContent='flex-end' marginTop={4}>
							<Button
								className={classes.btn1}
								variant='outlined'
								color='inherit'
								startIcon={<CancelIcon />}
								onClick={() => setModal(false)}
							>
								Cancel
							</Button>
							<Button
								variant='contained'
								color='secondary'
								startIcon={<DeleteIcon />}
								// onClick={() => handleModalClose()}
							>
								Delete
							</Button>
						</Box>
					</Box>
				)}
			</motion.div>
		</Modal>
	);
};

// export ModalProfile Component
export default ModalProfile;
