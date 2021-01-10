// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
// Components
import LoginUserData from './LoginUserData';
import LoginResponse from './LoginResponse';

// LoginCurrent Component
const LoginCurrent = props => {
	switch (props.step) {
		case 1:
			return (
				<LoginUserData nextStep={props.nextStep} handleInputChange={props.handleInputChange} values={props.values} />
			);
		case 2:
			return (
				<LoginResponse
					values={props.values}
					setParentState={props.setParentState}
					prevStep={props.prevStep}
					closeLogin={props.closeLogin}
				/>
			);
		default:
			return (
				<LoginUserData nextStep={props.nextStep} handleInputChange={props.handleInputChange} values={props.values} />
			);
	}
};

// PropTypes
LoginCurrent.propTypes = {
	step: PropTypes.number.isRequired,
	prevStep: PropTypes.func.isRequired,
	nextStep: PropTypes.func.isRequired,
	handleInputChange: PropTypes.func.isRequired,
	setParentState: PropTypes.func.isRequired,
	closeLogin: PropTypes.func.isRequired,
	values: PropTypes.object.isRequired
};

// export LoginCurrent Component
export default LoginCurrent;
