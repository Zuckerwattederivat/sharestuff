// Node Modules
import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
// Styles
import Theme from './styles/Theme';
import './styles/css/App.css';
// Components
import App from './App';

// render dom
ReactDOM.render(
	<React.StrictMode>
		<CssBaseline>
			<Theme>
				<App />
			</Theme>
		</CssBaseline>
	</React.StrictMode>,
	document.getElementById('root')
);
