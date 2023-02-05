import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { availableLanguages } from '../../../language';
import { lightTheme } from '../../../shared/theme/theme';
import { AuthProvider } from '../../../shared/utils/auth';
import { TranslationProvider } from '../../../shared/utils/translation';
import ItemFormComponents from '../components/item-form.component';

class AuthMock {
  onAuthStateChanged = () => ({});
  signInWithEmailAndPassword = () => Promise.resolve();
  createUserWithEmailAndPassword = () => Promise.resolve();
  signOut = () => {};
}

describe('<AddViewComponent />', () => {
  it('correctly call submit function with given arguments', async () => {
    const defaultLanguage = 'en';
    const onSubmitMock = jest.fn();

    render(
      <AuthProvider auth={new AuthMock()}>
        <ThemeProvider theme={lightTheme}>
          <TranslationProvider languages={availableLanguages} defaultLanguage={defaultLanguage}>
            <BrowserRouter>
              <ItemFormComponents addItem={onSubmitMock} />
            </BrowserRouter>
          </TranslationProvider>
        </ThemeProvider>
      </AuthProvider>
    );

    const inputName = screen.getByTestId('name');
    const inputCategory = screen.getByTestId('category');
    const inputUnit = screen.getByTestId('unit');
    const inputMaximalQuantity = screen.getByTestId('maximalQuantity');
    const inputMinimalQuantity = screen.getByTestId('minimalQuantity');
    const inputCurrentQuantity = screen.getByTestId('currentQuantity');
    const submitButton = screen.getByTestId('accept');

    await waitFor(async () => {
      await user.type(inputName, 'Wine');
      await user.selectOptions(inputCategory, ['dairy']);
      await user.selectOptions(inputUnit, ['liter']);
      await user.type(inputMaximalQuantity, '5');
      await user.type(inputMinimalQuantity, '5');
      await user.type(inputCurrentQuantity, '5');
      await user.click(submitButton);
    });

    expect(onSubmitMock).toBeCalled();
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith({
      name: 'Wine',
      category: 'dairy',
      unit: 'liter',
      currentQuantity: 5,
      minimalQuantity: 5,
      maximalQuantity: 5,
    });
  });

  it('correctly show error message when field is not filled', async () => {
    const defaultLanguage = 'en';
    const onSubmitMock = jest.fn();

    const { findByTestId } = await render(
      <AuthProvider auth={new AuthMock()}>
        <ThemeProvider theme={lightTheme}>
          <TranslationProvider languages={availableLanguages} defaultLanguage={defaultLanguage}>
            <BrowserRouter>
              <ItemFormComponents addItem={onSubmitMock} />
            </BrowserRouter>
          </TranslationProvider>
        </ThemeProvider>
      </AuthProvider>
    );

    await waitFor(async () => {
      const inputName = await findByTestId('name');
      const inputCategory = await findByTestId('category');
      const inputMaximalQuantity = await findByTestId('maximalQuantity');
      const inputMinimalQuantity = await findByTestId('maximalQuantity');
      const inputCurrentQuantity = await findByTestId('currentQuantity');
      const submitButton = await findByTestId('accept');

      await user.type(inputName, 'Wine');
      await user.selectOptions(inputCategory, ['dairy']);
      await user.type(inputMaximalQuantity, '5');
      await user.type(inputMinimalQuantity, '5');
      await user.type(inputCurrentQuantity, '5');
      await user.click(submitButton);
    });

    expect(onSubmitMock).toHaveBeenCalledTimes(0);
    expect(screen.getByTestId('error-unit')).toBeInTheDocument();
  });

  it('correctly show error message when number is too big', async () => {
    const defaultLanguage = 'en';
    const onSubmitMock = jest.fn();

    render(
      <AuthProvider auth={new AuthMock()}>
        <ThemeProvider theme={lightTheme}>
          <TranslationProvider languages={availableLanguages} defaultLanguage={defaultLanguage}>
            <BrowserRouter>
              <ItemFormComponents addItem={onSubmitMock} />
            </BrowserRouter>
          </TranslationProvider>
        </ThemeProvider>
      </AuthProvider>
    );

    const inputName = screen.getByTestId('name');
    const inputCategory = screen.getByTestId('category');
    const inputUnit = screen.getByTestId('unit');
    const inputMaximalQuantity = screen.getByTestId('maximalQuantity');
    const inputMinimalQuantity = screen.getByTestId('minimalQuantity');
    const inputCurrentQuantity = screen.getByTestId('currentQuantity');
    const submitButton = screen.getByTestId('accept');

    await waitFor(async () => {
      await user.type(inputName, 'Wine');
      await user.selectOptions(inputCategory, ['dairy']);
      await user.selectOptions(inputUnit, ['liter']);
      await user.type(inputMaximalQuantity, '55');
      await user.type(inputMinimalQuantity, '5');
      await user.type(inputCurrentQuantity, '5');
      await user.click(submitButton);
    });

    expect(onSubmitMock).toHaveBeenCalledTimes(0);
    expect(screen.getByTestId('error-maximal-quantity')).toBeInTheDocument();
  });
});
