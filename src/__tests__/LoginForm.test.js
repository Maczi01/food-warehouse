import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../providers/Auth";
import AppProvider from "../context/context";
import { lightTheme } from "../theme/theme";
import { IntlProvider } from "react-intl";
import { EN_language as language } from "../utills/language";
import ListItem from "../components/molecules/ListItem";
import user from "@testing-library/user-event";
import List from "../components/organisms/List";
import React from "react";

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

  it("correctly generate list with three items", async () => {
    const items = [
      {
        name: "Wine",
        category: "beverages",
        maximalQuantity: 3,
        minimalQuantity: 3,
        currentQuantity: 0,
        id: "h6y0w72woJCIgWdoxQ7G",
        unit: "liter",
      },
      {
        name: "Chocolate",
        category: "sweets",
        maximalQuantity: 3,
        minimalQuantity: 3,
        currentQuantity: 0,
        id: "sYdF4BxIKWDE4XQr9Q7u",
        unit: "liter",
      },
      {
        name: "Marshmallows",
        category: "sweets",
        maximalQuantity: 5,
        minimalQuantity: 2,
        currentQuantity: 1,
        id: "sYdF4BxVFOKP4XQr9Q7u",
        unit: "liter",
      },
    ];

    render(
      <AuthProvider>
        <AppProvider>
          <ThemeProvider theme={lightTheme}>
            <IntlProvider locale={language.locale} messages={language.lang}>
              <BrowserRouter>
                <List items={items} parameter={"all"} />
              </BrowserRouter>
            </IntlProvider>
          </ThemeProvider>
        </AppProvider>
      </AuthProvider>
    );

    const allItems = screen.getAllByTestId("decreaseQuantity");

    expect(allItems).toHaveLength(3);
  });
});
