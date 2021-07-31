import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../theme/theme";
import { IntlProvider } from "react-intl";
import { EN_language as language } from "../utills/language";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "../context/context";
import { AuthProvider } from "../providers/Auth";
import user from "@testing-library/user-event";
import ItemForm from "../components/organisms/ItemForm";
import SettingsCard from "../components/organisms/SettingsCard";

describe("Add product form tests, ", () => {
  it("correctly call sign out function", async () => {
    const signOutMock = jest.fn();
    render(
      <AppProvider>
        <ThemeProvider theme={lightTheme}>
          <SettingsCard signOut={signOutMock} />
        </ThemeProvider>
      </AppProvider>
    );

    const signOutButton = screen.getByTestId("signOut");
    user.click(signOutButton);

    await waitFor(() => expect(signOutMock).toBeCalled());
    await waitFor(() => expect(signOutMock).toHaveBeenCalledTimes(1));
  });
});
