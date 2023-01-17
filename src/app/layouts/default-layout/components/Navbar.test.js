import { render, screen } from "@testing-library/react";
import { lightTheme } from "../../../shared/theme/theme";
import Navbar from "./Navbar";
import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "../../../services/services";
import { IntlProvider } from "react-intl";
import { EN_language } from "../../../language";
import React from "react";
import user from "@testing-library/user-event";

describe("<Navbar/>", () => {
  it("correctly render Navbar with navigation buttons", () => {
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

  it("correctly call logout function", () => {
    const logoutMock = jest.fn();

    render(
      <ThemeProvider theme={lightTheme}>
        <IntlProvider locale={EN_language.locale} messages={EN_language.lang}>
          <BrowserRouter>
            <Navbar signOut={logoutMock} />
          </BrowserRouter>
        </IntlProvider>
      </ThemeProvider>
    );

    const logoutButton = screen.getByTestId("logout");
    user.click(logoutButton);

    expect(logoutMock).toBeCalled();
    expect(logoutMock).toHaveBeenCalledTimes(1);
  });

  it("correctly call show menu after click burger button", () => {

    render(
      <ThemeProvider theme={lightTheme}>
        <IntlProvider locale={EN_language.locale} messages={EN_language.lang}>
          <BrowserRouter>
            <Navbar />
          </BrowserRouter>
        </IntlProvider>
      </ThemeProvider>
    );
    //TODO
    const logoutButton = screen.getByTestId("burgerButton");
    // user.click(logoutButton);
    //
    // expect(logoutMock).toBeCalled();
    // expect(logoutMock).toHaveBeenCalledTimes(1);
  });
});
