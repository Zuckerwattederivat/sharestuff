// Node Modules
import React, { useState, useContext } from 'react';
import { Modal, Backdrop, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
// Components
import LoginCurrent from './LoginCurrent';
// Context
import AuthValidationContext from '../../context/auth/authValidationContext';
import AuthContext from '../../context/auth/authContext';
import NavbarContext from '../../context/navbar/navbarContext';
import AlertContext from '../../context/alert/alertContext';

// define styles
const useStyles = makeStyles(theme => ({
	loginModal: {
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
	loginHeading: {
		padding: theme.spacing(2)
	},
	title: {
		textAlign: 'center',
		fontWeight: '500'
	},
	titleSpan2: {
		color: theme.palette.primary.main
	},
	loginForm: {
		padding: theme.spacing(2)
	}
}));

// Login Component
const Login = () => {
	// styling classes
	const classes = useStyles();

	// load navbar context
	const navbarContext = useContext(NavbarContext);
	// destructure navbar context
	const { loginOpen, setLoginOpen } = navbarContext;

	// load auth context
	const authContext = useContext(AuthContext);

	// load authValidation context
	const authValidationContext = useContext(AuthValidationContext);
	// destructure authValidation context
	const { clearInputErrors } = authValidationContext;

	// load alert context
	const alertContext = useContext(AlertContext);

	// use state
	const [ user, setUser ] = useState({
		step: 1,
		email: '',
		password: ''
	});
	// destructure state
	const { step, email, password } = user;

	// state values for components
	const values = {
		step,
		email,
		password
	};

	// proceed to next step
	const nextStep = () => setUser({ ...user, step: step + 1 });
	// go back to previous step
	const prevStep = () => setUser({ ...user, step: step - 1 });
	// on input change
	const handleInputChange = input => e => setUser({ ...user, [input]: e.target.value });
	// set state
	const setParentState = (state, value) => setUser({ ...user, [state]: value });

	// close login
	const closeLogin = () => {
		// remove all alerts
		alertContext.removeAllAlerts();
		// clear input errors
		clearInputErrors();
		// clear auth errors
		authContext.clearErrors();
		// set step to 1
		setParentState('step', 1);
		// close modal
		setLoginOpen(false);
	};

	return (
		<Modal
			className={classes.loginModal}
			aria-labelledby='login-modal-title'
			aria-describedby='login-modal-description'
			open={loginOpen}
			onClose={() => closeLogin()}
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
				<div className={classes.loginHeading}>
					<Typography id='login-modal-title' className={classes.title} variant='h5'>
						<span className={classes.titleSpan1}>Account</span> <span className={classes.titleSpan2}>Login</span>
					</Typography>
				</div>
				<Divider className={classes.topDivider} />
				<LoginCurrent
					step={step}
					values={values}
					prevStep={prevStep}
					nextStep={nextStep}
					handleInputChange={handleInputChange}
					setParentState={setParentState}
				/>
			</motion.div>
		</Modal>
	);
};

// export Login Component
export default Login;
