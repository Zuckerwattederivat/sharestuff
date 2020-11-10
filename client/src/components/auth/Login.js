// NodeM Modules
import React, { useContext, useState, useEffect } from 'react';
import { Modal, Backdrop, Typography, Divider, Box, Grid, TextField, Button } from '@material-ui/core';
import { LockOpen as LockOpenIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
// Context
import AuthContext from '../../context/auth/authValidationContext';
import AuthValidationContext from '../../context/auth/authValidationContext';
import NavbarContext from '../../context/navbar/navbarContext';

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
	loginUserData: {
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
	buttonIcon: {
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	}
}));

// Login Component
const Login = () => {
	// styling classes
	const classes = useStyles();

	// user state
	const [ user, setUser ] = useState({
		email: '',
		password: ''
	});
	// destructure user state
	const { email, password } = user;

	// load navbar context
	const navbarContext = useContext(NavbarContext);
	// destructure navbar context
	const { loginOpen, setLoginOpen } = navbarContext;

	// load authValidation context
	const authValidationContext = useContext(AuthValidationContext);
	// destructure authValidation context
	const {
		login,
		inputAuth,
		emailErr,
		passwordErr,
		clearInputErrors,
		validateLoginData,
		setInputState
	} = authValidationContext;

	// load auth context
	const authContext = useContext(AuthContext);

	// on input change
	const handleInputChange = input => e => setUser({ ...user, [input]: e.target.value });

	// watch errors & inputAuth
	useEffect(
		() => {
			if (login && inputAuth && !emailErr && !passwordErr) {
				// set inputAuth to true
				setInputState('INPUT_AUTH', false);
				// login user
				authContext.login(user);
			}
		},
		// eslint-disable-next-line
		[ login, inputAuth, emailErr, passwordErr ]
	);

	// continue form
	const continueForm = input => {
		//console.log(input);
		// clear errors
		clearInputErrors();
		// validate form
		validateLoginData(input);
	};

	return (
		<Modal
			className={classes.loginModal}
			aria-labelledby='login-modal-title'
			aria-describedby='login-modal-description'
			open={loginOpen}
			onClose={() => {
				clearInputErrors();
				setLoginOpen(false);
			}}
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
				<Box className={classes.loginUserData} width='100%'>
					<Typography className={classes.description} variant='subtitle1'>
						Please enter your user details.
					</Typography>
					<Grid className={classes.grid} width='100%' container spacing={2}>
						<Grid item xs={12} className={classes.gridItem}>
							<TextField
								id='email'
								name='email'
								className={classes.textfield}
								variant='outlined'
								label={emailErr ? emailErr : 'Email'}
								placeholder='john.doe@gmail.com'
								type='email'
								error={emailErr ? true : false}
								onChange={handleInputChange('email')}
								defaultValue={email}
							/>
						</Grid>
						<Grid item xs={12} className={classes.gridItem}>
							<TextField
								id='password'
								name='password'
								className={classes.textfield}
								variant='outlined'
								label={passwordErr ? passwordErr : 'Password'}
								type='password'
								error={passwordErr ? true : false}
								onChange={handleInputChange('password')}
								defaultValue={password}
							/>
						</Grid>
					</Grid>
					<Box width='100%' display='flex' justifyContent='flex-end'>
						<Button
							className={classes.nextButton}
							width='100%'
							variant='outlined'
							color='primary'
							startIcon={<LockOpenIcon className={classes.buttonIcon} />}
							size='large'
							onClick={() => continueForm(user)}
						>
							Login
						</Button>
					</Box>
				</Box>
			</motion.div>
		</Modal>
	);
};

// export Login Component
export default Login;
