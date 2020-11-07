// Node Modules
import React from 'react';
import { MuiThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';

// theme
function getTheme(theme) {
	return createMuiTheme({
		palette: {
			type: theme.paletteType,
			primary: {
				light: '#0DF97C',
				main: '#0BD068',
				dark: '#089349'
			},
			background: {
				custom: '#212121'
			},
			grayCustom: {
				light: '#606060',
				main: '#404040',
				dark: '#292929'
			}
		},
		drawer: {
			width: '240px'
		},
		input: {
			'&:-webkit-autofill': {
				WebkitBoxShadow: '0 0 0 100px #089349 inset',
				WebkitTextFillColor: '#fff'
			}
		}
	});
}

// Theme Component
const Theme = props => {
	return <MuiThemeProvider theme={getTheme({ paletteType: 'dark' })}>{props.children}</MuiThemeProvider>;
};

// export Theme Component
export default Theme;
