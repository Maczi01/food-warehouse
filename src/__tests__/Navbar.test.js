import { render, screen } from "@testing-library/react";
import { lightTheme } from "../theme/theme";
import Navbar from "../components/molecules/Navbar";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "../context/context";
import { IntlProvider } from "react-intl";
import { EN_language } from "../utills/language";
import React from "react";
import user from "@testing-library/user-event";

describe("Navbar tests, ", () => {
  it("correctly render Navbar with navigation buttons", () => {
    render(
      <AppProvider>
        <ThemeProvider theme={lightTheme}>
          <IntlProvider locale={EN_language.locale} messages={EN_language.lang}>
            s
            <BrowserRouter>
              <Navbar />
            </BrowserRouter>
          </IntlProvider>
        </ThemeProvider>
      </AppProvider>
    );

    const checkInventoryButton = screen.getByTestId("checkInventory");
    const addProductButton = screen.getByTestId("addProduct");
    const shoppingListButton = screen.getByTestId("shoppingList");
    const settingsButton = screen.getByTestId("settings");
    const backgroundColor = screen.getByTestId("navbarBackground");

    expect(checkInventoryButton).toBeInTheDocument();
    expect(addProductButton).toBeInTheDocument();
    expect(shoppingListButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();
    expect(backgroundColor).toHaveStyle("background: #00214D");
  });

  it("correctly call lougout function", () => {
    const logoutMock = jest.fn();

    render(
      <AppProvider>
        <ThemeProvider theme={lightTheme}>
          <IntlProvider locale={EN_language.locale} messages={EN_language.lang}>
            <BrowserRouter>
              <Navbar />
            </BrowserRouter>
          </IntlProvider>
        </ThemeProvider>
      </AppProvider>
    );

    const logoutButton = screen.getByTestId("logout");
    user.click(logoutButton);

    expect(logoutMock).toBeCalled();
    expect(logoutMock).toHaveBeenCalledTimes(1);
  });
});
