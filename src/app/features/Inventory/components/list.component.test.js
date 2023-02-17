import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { availableLanguages } from '../../../language';
import { lightTheme } from '../../../shared/theme/theme';
import { AuthProvider } from '../../../shared/utils/auth';
import { TranslationProvider } from '../../../shared/utils/translation';
import List from './list.component';

class AuthMock {
  onAuthStateChanged = () => ({});
  signInWithEmailAndPassword = () => Promise.resolve();
  createUserWithEmailAndPassword = () => Promise.resolve();
  signOut = () => {};
}

describe('MainView component', () => {
  it('correctly generate list with three given items', async () => {
    const defaultLanguage = 'en';
    const items = [
      {
        name: 'Wine',
        category: 'beverages',
        maximalQuantity: 3,
        minimalQuantity: 3,
        currentQuantity: 0,
        id: 'h6y0w72woJCIgWdoxQ7G',
        unit: 'liter',
      },
      {
        name: 'Chocolate',
        category: 'sweets',
        maximalQuantity: 3,
        minimalQuantity: 3,
        currentQuantity: 0,
        id: 'sYdF4BxIKWDE4XQr9Q7u',
        unit: 'liter',
      },
      {
        name: 'Marshmallows',
        category: 'sweets',
        maximalQuantity: 5,
        minimalQuantity: 2,
        currentQuantity: 1,
        id: 'sYdF4BxVFOKP4XQr9Q7u',
        unit: 'liter',
      },
    ];

    render(
      <AuthProvider auth={new AuthMock()}>
        <ThemeProvider theme={lightTheme}>
          <TranslationProvider languages={availableLanguages} defaultLanguage={defaultLanguage}>
            <BrowserRouter>
              <List items={items} parameter="all" />
            </BrowserRouter>
          </TranslationProvider>
        </ThemeProvider>
      </AuthProvider>
    );

    const allItems = screen.getAllByTestId('decreaseQuantity');

    expect(allItems).toHaveLength(3);
  });
});
