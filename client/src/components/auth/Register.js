// Node Modules
import React, { useState, useContext } from 'react';
import { Modal, Backdrop, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
// Components
import RegisterCurrent from './RegisterCurrent';
// Context
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import AuthValidationContext from '../../context/auth/authValidationContext';
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

	// load navbar context
	const navbarContext = useContext(NavbarContext);
	// destructure navbar context
	const { registerOpen, setRegisterOpen } = navbarContext;

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
		firstname: '',
		lastname: '',
		address: '',
		zipCode: '',
		city: '',
		country: '',
		countryAuto: '',
		phone: '',
		email: '',
		username: '',
		password: '',
		passwordConfirm: ''
	});
	// destructure state
	const {
		step,
		firstname,
		lastname,
		address,
		zipCode,
		city,
		country,
		countryAuto,
		phone,
		email,
		username,
		password,
		passwordConfirm
	} = user;

	// state values for components
	const values = {
		step,
		firstname,
		lastname,
		address,
		zipCode,
		city,
		country,
		countryAuto,
		phone,
		email,
		username,
		password,
		passwordConfirm
	};

	// proceed to next step
	const nextStep = () => setUser({ ...user, step: step + 1 });
	// go back to previous step
	const prevStep = () => setUser({ ...user, step: step - 1 });
	// on input change
	const handleInputChange = input => e => setUser({ ...user, [input]: e.target.value });
	// set state
	const setParentState = (state, value) => setUser({ ...user, [state]: value });

	// close register
	const closeRegister = () => {
		// reset state
		setUser({
			step: 1,
			firstname: '',
			lastname: '',
			address: '',
			zipCode: '',
			city: '',
			country: '',
			countryAuto: '',
			phone: '',
			email: '',
			username: '',
			password: '',
			passwordConfirm: ''
		});
		// remove all alerts
		alertContext.removeAllAlerts();
		// clear input errors
		clearInputErrors();
		// clear auth errors
		authContext.clearErrors();
		// close modal
		setRegisterOpen(false);
	};

	return (
		<Modal
			className={classes.registerModal}
			aria-labelledby='register-modal-title'
			aria-describedby='register-modal-description'
			open={registerOpen}
			onClose={() => closeRegister()}
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
				<RegisterCurrent
					step={step}
					values={values}
					prevStep={prevStep}
					nextStep={nextStep}
					handleInputChange={handleInputChange}
					setParentState={setParentState}
					closeRegister={closeRegister}
				/>
			</motion.div>
		</Modal>
	);
};

// export Register Component
export default Register;
