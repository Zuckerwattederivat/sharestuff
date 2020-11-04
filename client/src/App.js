// Node Modules
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Components
import Home from './components/pages/Home';
import Navbar from './components/navbar/Navbar';
// State
import AuthState from './context/auth/AuthState';
import NavbarState from './context/navbar/NavbarState';

// App Component
const App = () => {
	return (
		<AuthState>
			<NavbarState>
				<Router>
					<Navbar />
					<div className='wrapper'>
						<Switch>
							<Route exact path='/' component={Home} />
						</Switch>
					</div>
				</Router>
			</NavbarState>
		</AuthState>
	);
};

// export App component
export default App;
