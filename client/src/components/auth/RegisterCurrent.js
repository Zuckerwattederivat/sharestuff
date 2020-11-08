// Node Modules
import React from 'react';
import PropTypes from 'prop-types';
// Components
import RegisterUserData from './RegisterUserData';
import RegisterPersonalData from './RegisterPersonalData';
import RegisterConfirm from './RegisterConfirm';
import RegisterSuccess from './RegisterSuccess';

// RegisterCurrent Component
const RegisterCurrent = props => {
	switch (props.step) {
		case 2:
			return (
				<RegisterUserData nextStep={props.nextStep} handleInputChange={props.handleInputChange} values={props.values} />
			);
		case 1:
			return (
				<RegisterPersonalData
					prevStep={props.prevStep}
					nextStep={props.nextStep}
					handleInputChange={props.handleInputChange}
					setInputValue={props.setInputValue}
					values={props.values}
				/>
			);
		case 3:
			return <RegisterConfirm prevStep={props.prevStep} nextStep={props.nextStep} values={props.values} />;
		case 4:
			return <RegisterSuccess />;
		default:
			return (
				<RegisterUserData nextStep={props.nextStep} handleInputChange={props.handleInputChange} values={props.values} />
			);
	}
};

// PropTypes
RegisterCurrent.propTypes = {
	step: PropTypes.number.isRequired,
	prevStep: PropTypes.func.isRequired,
	nextStep: PropTypes.func.isRequired,
	handleInputChange: PropTypes.func.isRequired,
	values: PropTypes.object.isRequired
};

// export RegisterCurrent Component
export default RegisterCurrent;
