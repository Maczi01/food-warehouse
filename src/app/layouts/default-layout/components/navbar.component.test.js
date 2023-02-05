import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { availableLanguages } from '../../../language';
import { lightTheme } from '../../../shared/theme/theme';
import { TranslationProvider } from '../../../shared/utils/translation';
import Navbar from './navbar.component';

describe('<Navbar/>', () => {
  it('correctly render Navbar with navigation buttons', () => {
    const defaultLanguage = 'en';

    render(
      <ThemeProvider theme={lightTheme}>
        <TranslationProvider languages={availableLanguages} defaultLanguage={defaultLanguage}>
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        </TranslationProvider>
      </ThemeProvider>
    );

    const checkInventoryButton = screen.getByTestId('checkInventory');
    const addProductButton = screen.getByTestId('addProduct');
    const shoppingListButton = screen.getByTestId('shoppingList');
    const settingsButton = screen.getByTestId('settings');
    const backgroundColor = screen.getByTestId('navbarBackground');

    expect(checkInventoryButton).toBeInTheDocument();
    expect(addProductButton).toBeInTheDocument();
    expect(shoppingListButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();
    expect(backgroundColor).toHaveStyle('background: #00214D');
  });

  it('correctly call logout function', async () => {
    const defaultLanguage = 'en';
    const logoutMock = jest.fn();

    render(
      <ThemeProvider theme={lightTheme}>
        <TranslationProvider languages={availableLanguages} defaultLanguage={defaultLanguage}>
          <BrowserRouter>
            <Navbar signOut={logoutMock} />
          </BrowserRouter>
        </TranslationProvider>
      </ThemeProvider>
    );

    const logoutButton = screen.getByTestId('logout');
    await user.click(logoutButton);

    expect(logoutMock).toBeCalled();
    expect(logoutMock).toHaveBeenCalledTimes(1);
  });

  it('correctly call show menu after click burger button', () => {
    const defaultLanguage = 'en';

    render(
      <ThemeProvider theme={lightTheme}>
        <TranslationProvider languages={availableLanguages} defaultLanguage={defaultLanguage}>
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        </TranslationProvider>
      </ThemeProvider>
    );
    //TODO
    // const logoutButton = screen.getByTestId('burgerButton');
    // user.click(logoutButton);
    //
    // expect(logoutMock).toBeCalled();
    // expect(logoutMock).toHaveBeenCalledTimes(1);
  });
});
