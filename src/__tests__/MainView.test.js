import { render, screen } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../theme/theme";
import { IntlProvider } from "react-intl";
import { EN_language as language } from "../utills/language";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "../context/context";
import { AuthProvider } from "../providers/Auth";
import user from "@testing-library/user-event";
import ListItem from "../components/molecules/ListItem";

describe("Items view list", () => {
  it("correctly call functions on item", async () => {
    const deleteItemMock = jest.fn();
    const decreaseQuantityMock = jest.fn();
    const increaseQuantityMock = jest.fn();
    const editItemMock = jest.fn();

    const item = {
      name: "Wine",
      category: "beverages",
      maximalQuantity: 3,
      minimalQuantity: 3,
      currentQuantity: 0,
      id: "h6y0w72woJCIgWdoxQ7G",
      unit: "liter",
    };

    render(
      <AuthProvider>
        <AppProvider>
          <ThemeProvider theme={lightTheme}>
            <IntlProvider locale={language.locale} messages={language.lang}>
              <BrowserRouter>
                <ListItem
                  {...item}
                  editItem={editItemMock}
                  deleteItem={deleteItemMock}
                  decreaseQuantity={decreaseQuantityMock}
                  increaseQuantity={increaseQuantityMock}
                />
              </BrowserRouter>
            </IntlProvider>
          </ThemeProvider>
        </AppProvider>
      </AuthProvider>
    );

    const decreaseQuantityButton = screen.getByTestId("decreaseQuantity");
    const increaseQuantityButton = screen.getByTestId("increaseQuantity");
    const deleteItemButton = screen.getByTestId("deleteItem");
    const editItemButton = screen.getByTestId("editItem");

    user.click(decreaseQuantityButton);
    user.click(increaseQuantityButton);
    user.click(deleteItemButton);
    user.click(editItemButton);

    expect(editItemMock).toBeCalled();
    expect(editItemMock).toHaveBeenCalledTimes(1);

    expect(increaseQuantityMock).toBeCalled();
    expect(increaseQuantityMock).toHaveBeenCalledTimes(1);

    expect(decreaseQuantityMock).toBeCalled();
    expect(decreaseQuantityMock).toHaveBeenCalledTimes(1);

    expect(deleteItemMock).toBeCalled();
    expect(deleteItemMock).toHaveBeenCalledTimes(1);
  });
});
