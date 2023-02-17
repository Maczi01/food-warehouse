import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { lightTheme } from '../../../shared/theme/theme';
import ListItem from './list-item.components';

describe('MainView component', () => {
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
});
