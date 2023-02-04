import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { EN_language as language } from '../../../language';
import { lightTheme } from '../../../shared/theme/theme';
import FilterViewComponent from './flter-view.component.js';

describe('<FlterViewComponent />', () => {
  it('correctly displays button for each category', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <IntlProvider locale={language.locale} messages={language.lang}>
          <BrowserRouter>
            <FilterViewComponent />
          </BrowserRouter>
        </IntlProvider>
      </ThemeProvider>
    );
    const allCategoriesButton = screen.getByText('All categories');
    const beveragesButton = screen.getByText('beverages');
    const bakingButton = screen.getByText('baking');
    const dairyButton = screen.getByText('dairy');
    const meatFishesSeafoodButton = screen.getByText('meat, fishes, seafood');
    const pastaRiceGroatsButton = screen.getByText('pasta, rice, groats');
    const looseSpiecesButton = screen.getByText('loose products, spieces');
    const sweetsAndSnacksButton = screen.getByText('sweets and snacks');
    const vegetablesAndFriutsButton = screen.getByText('vegetables and fruits');
    const othersButton = screen.getByText('others');

    expect(allCategoriesButton).toBeInTheDocument();
    expect(beveragesButton).toBeInTheDocument();
    expect(bakingButton).toBeInTheDocument();
    expect(dairyButton).toBeInTheDocument();
    expect(meatFishesSeafoodButton).toBeInTheDocument();
    expect(pastaRiceGroatsButton).toBeInTheDocument();
    expect(looseSpiecesButton).toBeInTheDocument();
    expect(sweetsAndSnacksButton).toBeInTheDocument();
    expect(vegetablesAndFriutsButton).toBeInTheDocument();
    expect(othersButton).toBeInTheDocument();
  });
});
