// Node Modules
import React, { useContext } from 'react';
import { Modal, Backdrop, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
// Context
import NavbarContext from '../../context/navbar/navbarContext';

// define styles
const useStyles = makeStyles(theme => ({
	registerModal: {
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
		}
	},
	registerHeading: {
		padding: theme.spacing(2)
	},
	title: {
		textAlign: 'center',
		fontWeight: '500'
	},
	titleSpan2: {
		color: theme.palette.primary.main
	},
	registerForm: {
		padding: theme.spacing(2)
	}
}));

// Register Component
const Register = () => {
	// styling classes
	const classes = useStyles();

	// load avbar context
	const navbarContext = useContext(NavbarContext);
	// destructure navbar context
	const { registerOpen, setRegisterOpen } = navbarContext;

	return (
		<Modal
			className={classes.registerModal}
			aria-labelledby='register-modal-title'
			aria-describedby='register-modal-description'
			open={registerOpen}
			onClose={() => setRegisterOpen(false)}
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
				<div className={classes.registerHeading}>
					<Typography id='register-modal-title' className={classes.title} variant='h5'>
						<span className={classes.titleSpan1}>Account</span> <span className={classes.titleSpan2}>Register</span>
					</Typography>
				</div>
				<Divider className={classes.topDivider} />
				<form className={classes.registerForm}>hello</form>
			</motion.div>
		</Modal>
	);
};

// export Register Component
export default Register;
