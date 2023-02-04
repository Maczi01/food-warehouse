import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { EN_language as language } from '../../../language';
import { lightTheme } from '../../../shared/theme/theme';
import ShoppingListViewComponent from './shopping-list-view.component';

describe(' <ShoppingListViewComponent  />', () => {
  it('correctly call submit function with arguments', async () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <IntlProvider
          locale={language.locale}
          messages={language.lang}
        >
          <BrowserRouter>
            <ShoppingListViewComponent />
          </BrowserRouter>
        </IntlProvider>
      </ThemeProvider>
    );

    // TODO
    const plusButton = screen.getByTestId('showModal');
    user.click(plusButton);
    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();
  });
});
