import { CssBaseline, ThemeProvider as MUIThemeProvider } from '@mui/material';
import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
import { ThemeProvider as DefaultThemeProvider } from 'styled-components';

import { theme as muiTheme } from './food-warehouse.theme';
import { getTheme, lightThemeConfig, nightThemeConfig } from './theme';

export const useTheme = () => {
  const { toggleTheme, darkMode } = useContext(UseThemeContext);
  return { toggleTheme, darkMode };
};
export const UseThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightThemeConfig);
  const [darkMode, setDarkMode] = useState(false);
  const [mode, setMode] = useState('light');

  const toggleTheme = () => {
    if (mode === 'light') {
      setTheme(nightThemeConfig);
      setDarkMode(true);
      setMode('dark');
    } else {
      setTheme(lightThemeConfig);
      setDarkMode(false);
      setMode('light');
    }
  };
  return (
    <UseThemeContext.Provider value={{ toggleTheme, darkMode: darkMode }}>
      <DefaultThemeProvider theme={theme}>
        <MUIThemeProvider
          theme={muiTheme(
            getTheme({
              palette: {
                mode: mode,
              },
            })
          )}
        >
          <CssBaseline />
          {children}
        </MUIThemeProvider>
      </DefaultThemeProvider>
    </UseThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
