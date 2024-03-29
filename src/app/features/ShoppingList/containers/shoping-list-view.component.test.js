import { render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { availableLanguages } from '../../../language';
import { lightTheme } from '../../../shared/theme/theme';
import { AuthProvider, getAuth } from '../../../shared/utils/auth';
import { initializeHttpClient } from '../../../shared/utils/http-client';
import { TranslationProvider } from '../../../shared/utils/translation';
import ShoppingListViewComponent from './shopping-list-view.component';

jest.mock('../../../shared/utils/auth', () => ({
  __esModule: true,
  ...jest.requireActual('../../../shared/utils/auth'),
  getAuth: jest.fn(),
}));

class AuthMock {
  currentUser = { uid: null };
  onAuthStateChanged = () => ({});
  signInWithEmailAndPassword = () => Promise.resolve();
  createUserWithEmailAndPassword = () => Promise.resolve();
  signOut = () => {};
}

class HttpClientAdapterMock {
  getAll = () => Promise.resolve([]);

  getOne = () => Promise.resolve(null);

  deleteOne = () => Promise.resolve();

  clear = () => Promise.resolve();

  update = () => Promise.resolve();

  create = () => Promise.resolve();
}

describe(' <ShoppingListViewComponent  />', () => {
  it('correctly call submit function with arguments', async () => {
    const defaultLanguage = 'en';
    const authMock = new AuthMock();
    getAuth.mockReturnValue(authMock);
    initializeHttpClient(new HttpClientAdapterMock());

    const { findByTestId } = await render(
      <AuthProvider auth={authMock}>
        <ThemeProvider theme={lightTheme}>
          <TranslationProvider languages={availableLanguages} defaultLanguage={defaultLanguage}>
            <BrowserRouter>
              <ShoppingListViewComponent />
            </BrowserRouter>
          </TranslationProvider>
        </ThemeProvider>
      </AuthProvider>
    );

    // TODO
    const plusButton = await findByTestId('showModal');
    await waitFor(async () => {
      await user.click(plusButton);
    });
  });
});
