// Node Modules
import React from 'react';
import ReactDOM from 'react-dom';
// Styles
import Theme from './styles/Theme';
import './styles/App.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// Components
import App from './App';

// render dom
ReactDOM.render(
	<React.StrictMode>
		<Theme>
			<App />
		</Theme>
	</React.StrictMode>,
	document.getElementById('root')
);
