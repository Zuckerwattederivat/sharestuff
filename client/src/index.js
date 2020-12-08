// Node Modules
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
// Styles
import Theme from './styles/Theme';
import './styles/App.css';
// Components
import App from './App';

// render dom
ReactDOM.render(
	<StrictMode>
		<Theme>
			<App />
		</Theme>
	</StrictMode>,
	document.getElementById('root')
);
