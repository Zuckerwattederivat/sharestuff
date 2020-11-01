// Node Modules
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
// Components
import Home from './components/pages/Home';

// App Component
const App = () => {
	return (
		<Router>
			<Container maxWidth='xl'>
				<Switch>
					<Route exact path='/' component={Home} />
				</Switch>
			</Container>
		</Router>
	);
};

// export App component
export default App;
