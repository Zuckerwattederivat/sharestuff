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
				default: '#333333',
				custom: '#212121'
			},
			grayCustom: {
				light: '#606060',
				main: '#404040',
				dark: '#292929'
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
