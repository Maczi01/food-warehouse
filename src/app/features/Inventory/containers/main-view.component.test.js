import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import {ThemeProvider} from 'styled-components';

import { availableLanguages } from '../../../language';
import { lightTheme } from '../../../shared/theme/theme';
import { AuthProvider } from '../../../shared/utils/auth';
import { TranslationProvider } from '../../../shared/utils/translation';
import ListItem from '../components/list-item.components';
import List from '../components/list.component';
import MainViewComponent from './main-view.component';

class AuthMock {
  onAuthStateChanged = () => ({});
  signInWithEmailAndPassword = () => Promise.resolve();
  createUserWithEmailAndPassword = () => Promise.resolve();
  signOut = () => {};
}

jest.mock('../../../services/inventory.hook', () => ({
  useInventory: jest.fn().mockReturnValue({
    state: {
      inventory: [],
    },
    getForCurrentUser: jest.fn(),
  }),
}));

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ parameter: 'test' }),
}));

jest.mock('../components/list.component', () => ({
  __esModule: true,
  default: jest.fn(({ items }) => (
    <div data-testid="list-component">
      <div data-testid={items.length ? 'list-component-is-not-empty' : 'list-component-is-empty'} />
    </div>
  )),
}));

describe('<MainViewComponent/>', () => {
  it('correctly render item with properties and buttons', async () => {
    const deleteItemMock = jest.fn();
    const decreaseQuantityMock = jest.fn();
    const increaseQuantityMock = jest.fn();
    const editItemMock = jest.fn();

    const item = {
      name: 'Wine',
      category: 'beverages',
      maximalQuantity: 3,
      minimalQuantity: 3,
      currentQuantity: 0,
      id: 'h6y0w72woJCIgWdoxQ7G',
      unit: 'liter',
    };

    render(
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          <ListItem
            {...item}
            editItem={editItemMock}
            deleteItem={deleteItemMock}
            decreaseQuantity={decreaseQuantityMock}
            increaseQuantity={increaseQuantityMock}
          />
        </BrowserRouter>
      </ThemeProvider>
    );

    const itemName = screen.getByText('Wine');
    const itemUnit = screen.getByText('liter');
    const decreaseQuantityIcon = screen.getByTestId('decreaseQuantity');
    const increaseQuantityIcon = screen.getByTestId('increaseQuantity');
    const editItemIcon = screen.getByTestId('editItem');
    const deleteItemIcon = screen.getByTestId('deleteItem');

    expect(itemName).toBeInTheDocument();
    expect(itemUnit).toBeInTheDocument();
    expect(decreaseQuantityIcon).toBeInTheDocument();
    expect(increaseQuantityIcon).toBeInTheDocument();
    expect(editItemIcon).toBeInTheDocument();
    expect(deleteItemIcon).toBeInTheDocument();
  });

  it('correctly works item functions', async () => {
    const deleteItemMock = jest.fn();
    const decreaseQuantityMock = jest.fn();
    const increaseQuantityMock = jest.fn();
    const editItemMock = jest.fn();

    const item = {
      name: 'Wine',
      category: 'beverages',
      maximalQuantity: 3,
      minimalQuantity: 3,
      currentQuantity: 0,
      id: 'h6y0w72woJCIgWdoxQ7G',
      unit: 'liter',
    };

    render(
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          <ListItem
            {...item}
            editItem={editItemMock}
            deleteItem={deleteItemMock}
            decreaseQuantity={decreaseQuantityMock}
            increaseQuantity={increaseQuantityMock}
          />
        </BrowserRouter>
      </ThemeProvider>
    );

    const decreaseQuantityButton = screen.getByTestId('decreaseQuantity');
    const increaseQuantityButton = screen.getByTestId('increaseQuantity');
    const deleteItemButton = screen.getByTestId('deleteItem');

    await user.click(decreaseQuantityButton);
    await user.click(increaseQuantityButton);
    await user.click(deleteItemButton);

    expect(increaseQuantityMock).toBeCalled();
    expect(increaseQuantityMock).toHaveBeenCalledTimes(1);

    expect(decreaseQuantityMock).toBeCalled();
    expect(decreaseQuantityMock).toHaveBeenCalledTimes(1);

    expect(deleteItemMock).toBeCalled();
    expect(deleteItemMock).toHaveBeenCalledTimes(1);
  });

  it.skip('correctly generate list with three given items', async () => {
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

  it.skip('correctly generate list with one given item', async () => {
    const { findByTestId } = await render(<MainViewComponent />);

    const listComponentIsNotEmpty = await findByTestId('list-component-is-not-empty');

    expect(listComponentIsNotEmpty).toBeTruthy();
  });
});
