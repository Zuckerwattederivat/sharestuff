// Node Modules
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Components
import Home from './components/pages/Home';
import Navbar from './components/navbar/Navbar';
// State
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import AuthValidationState from './context/auth/AuthValidationState';
import NavbarState from './context/navbar/NavbarState';
// Utils
import setAuthToken from './utils/setAuthToken';

// set auth token
if (localStorage.token) {
	setAuthToken(localStorage.token);
}

// App Component
const App = () => {
	return (
		<AlertState>
			<AuthState>
				<NavbarState>
					<AuthValidationState>
						<Router>
							<Navbar />
							<div className='wrapper'>
								<Switch>
									<Route exact path='/' component={Home} />
								</Switch>
							</div>
						</Router>
					</AuthValidationState>
				</NavbarState>
			</AuthState>
		</AlertState>
	);
};

// export App component
export default App;
