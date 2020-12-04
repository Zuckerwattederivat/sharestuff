// Node Modules
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Components
import LoadUser from './components/auth/LoadUser';
import Home from './components/pages/Home';
import Offers from './components/pages/Offers';
import Offer from './components/pages/Offer';
import Navbar from './components/navbar/Navbar';
import Footer from './components/layout/Footer';
// State
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import AuthValidationState from './context/auth/AuthValidationState';
import NavbarState from './context/navbar/NavbarState';
import QueryState from './context/query/QueryState';
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
				<LoadUser>
					<AuthValidationState>
						<NavbarState>
							<QueryState>
								<Router>
									<Navbar />
									<div className='wrapper'>
										<Switch>
											<Route exact path='/' component={Home} />
											<Route exact path='/offers' component={Offers} />
											<Route exact path='/offers/offer' component={Offer} />
										</Switch>
									</div>
									<Footer />
								</Router>
							</QueryState>
						</NavbarState>
					</AuthValidationState>
				</LoadUser>
			</AuthState>
		</AlertState>
	);
};

// export App component
export default App;
