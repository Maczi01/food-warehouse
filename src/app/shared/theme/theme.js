import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
import { ThemeProvider as DefaultThemeProvider } from 'styled-components';

import GlobalStyle from './global-style.component';

export const lightTheme = {
  colors: {
    yellow: '#FDE24F',
    pink: '#FF5470',
    green: '#00EBC7',
    blue: '#00214D',
    darkblue: '#2D5283',
    white: '#FFFFFE',
    gray: '#E5E5E5',
  },
  mobile: '767px',
  backgroundColor: '#FFFFFE',
};

export const nightTheme = {
  colors: {
    yellow: '#ffacb7',
    pink: '#f2a365',
    green: '#6886c5',
    blue: '#f2a365',
    darkblue: '#222831',
    white: '#30475e',
    gray: '#E5E5E5',
  },
  mobile: '767px',
  backgroundColor: '#30475e',
};

export const useTheme = () => {
  const { toggleTheme } = useContext(UseThemeContext);
  return { toggleTheme };
};
export const UseThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);
  const toggleTheme = () => {
    theme === lightTheme ? setTheme(nightTheme) : setTheme(lightTheme);
  };
  return (
    <UseThemeContext.Provider value={{ toggleTheme }}>
      <DefaultThemeProvider theme={theme}>
        <GlobalStyle backgroundColor={theme.backgroundColor} />
        {children}
      </DefaultThemeProvider>
    </UseThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
