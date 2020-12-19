// Node Modules
import React, { useContext } from 'react';
import { Modal, Backdrop, Box, Typography, Button, Divider } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
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
	}
}));

// ModalDelete Component
const ModalDelete = () => {
	// styling classes
	const classes = useStyles();

	// load profile context
	const profileContext = useContext(ProfileContext);
	const { modalAdd, success, loading, setModal } = profileContext;

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
					</Box>
				)}
			</div>
		</Modal>
	);
};

// export ModalDelete Component
export default ModalDelete;
