import {render, screen} from "@testing-library/react";
import {lightTheme} from "../theme/theme";
import Navbar from "../components/molecules/Navbar";
import {ThemeProvider} from "styled-components";
import {BrowserRouter} from "react-router-dom";
import AppProvider from "../context/context";
import {IntlProvider} from "react-intl";
import {EN_language as language} from "../utills/language";
import React from "react";

describe("Navbar tests, ", () => {
  it("correctly render Navbar with navigation buttons", () => {
    render(
      <AppProvider>
        <ThemeProvider theme={lightTheme}>
          <IntlProvider locale={language.locale} messages={language.lang}>
            <BrowserRouter>
              <Navbar />
            </BrowserRouter>
          </IntlProvider>
        </ThemeProvider>
      </AppProvider>
    );

    const checkInvnetoryButton = screen.getByTestId("checkInventory");
    const addProductButton = screen.getByTestId("addProduct");
    const shoppingListButton = screen.getByTestId("shoppingList");
    const settingsButton = screen.getByTestId("settings");
    const backgroundColor = screen.getByTestId("navbarBackground");

    expect(checkInvnetoryButton).toBeInTheDocument();
    expect(addProductButton).toBeInTheDocument();
    expect(shoppingListButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();
    expect(backgroundColor).toHaveStyle("background: #00214D");
  });
});
