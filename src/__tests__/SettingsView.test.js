import { act, render, screen } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../theme/theme";
import { IntlProvider } from "react-intl";
import { EN_language as language } from "../utills/language";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "../context/context";
import { AuthProvider } from "../providers/Auth";
import AddView from "../views/AddView";
import userEvent from "@testing-library/user-event";
import user from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";

describe("Test Add product view", () => {
  it("correctly displays button for each category", async () => {
    render(
      <AuthProvider>
        <AppProvider>
          <ThemeProvider theme={lightTheme}>
            <IntlProvider locale={language.locale} messages={language.lang}>
              <BrowserRouter>
                <AddView />
              </BrowserRouter>
            </IntlProvider>
          </ThemeProvider>
        </AppProvider>
      </AuthProvider>
    );
    const onSubmitMock = jest.fn();

    const inputName = screen.getByTestId("name");
    const inputCategory = screen.getByTestId("category");
    const inputUnit = screen.getByTestId("unit");
    const inputMaximalQuantity = screen.getByTestId("maximalQuantity");
    const inputMinimalQuantity = screen.getByTestId("minimalQuantity");
    const inputCurrentQuantity = screen.getByTestId("currentQuantity");
    const submitButton = screen.getByTestId("accept");

    act(() => {
      userEvent.type(inputName, "30");
      userEvent.selectOptions(inputCategory, ["dairy"]);
      userEvent.selectOptions(inputUnit, ["liter"]);
      userEvent.type(inputMaximalQuantity, "5");
      userEvent.type(inputMinimalQuantity, "5");
      userEvent.type(inputCurrentQuantity, "5");
      user.click(submitButton);
    });
  });
});
// const subtractButton = screen.getByTestId("generatePdf");

// expect(subtractButton).toBeInTheDocument();

// userEvent.selectOptions(getByTestId('select-option'), 'Polski');
// const label = screen.getByText("tryb ciemny");
//
