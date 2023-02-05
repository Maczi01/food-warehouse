import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { availableLanguages } from '../../../language';
import { lightTheme } from '../../../shared/theme/theme';
import { TranslationProvider } from '../../../shared/utils/translation';
import FilterViewComponent from './flter-view.component.js';

describe('<FlterViewComponent />', () => {
  it('correctly displays button for each category', () => {
    const defaultLanguage = 'en';

    render(
      <ThemeProvider theme={lightTheme}>
        <TranslationProvider languages={availableLanguages} defaultLanguage={defaultLanguage}>
          <BrowserRouter>
            <FilterViewComponent />
          </BrowserRouter>
        </TranslationProvider>
      </ThemeProvider>
    );
    const allCategoriesButton = screen.getByTestId('all');
    const beveragesButton = screen.getByTestId('beverages');
    const bakingButton = screen.getByTestId('baking');
    const dairyButton = screen.getByTestId('dairy');
    const meatFishesSeafoodButton = screen.getByTestId('meatFishesSeafood');
    const pastaRiceGroatsButton = screen.getByTestId('pasta');
    const looseSpiecesButton = screen.getByTestId('spices');
    const sweetsAndSnacksButton = screen.getByTestId('sweetsAndSnacks');
    const vegetablesAndFriutsButton = screen.getByTestId('vegetablesAndFruits');
    const othersButton = screen.getByTestId('others');

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
