import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import {ThemeProvider} from "styled-components";
import {lightTheme} from "../theme/theme";
import {IntlProvider} from "react-intl";
import {EN_language as language} from "../utills/language";
import {BrowserRouter} from "react-router-dom";
import AppProvider from "../context/context";
import {AuthProvider} from "../providers/Auth";
import user from "@testing-library/user-event";
import ItemForm from "../components/organisms/ItemForm";
import ShoppingListView from "../views/ShoppingListView";

describe(" <ShoppingListView  />", () => {
    it("correctly call submit function with arguments", async () => {
        render(
            <AppProvider>
                <ThemeProvider theme={lightTheme}>
                    <IntlProvider locale={language.locale} messages={language.lang}>
                        <BrowserRouter>
                            <ShoppingListView/>
                        </BrowserRouter>
                    </IntlProvider>
                </ThemeProvider>
            </AppProvider>
        );

// TODO
        const plusButton = screen.getByTestId("showModal");
        user.click(plusButton);
        const modal = screen.getByTestId("modal");
        expect(modal).toBeInTheDocument();

    });

});
