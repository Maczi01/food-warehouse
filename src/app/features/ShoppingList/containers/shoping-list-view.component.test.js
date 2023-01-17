import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import {ThemeProvider} from "styled-components";
import {lightTheme} from "../../../shared/theme/theme";
import {IntlProvider} from "react-intl";
import {EN_language as language} from "../../../language";
import {BrowserRouter} from "react-router-dom";
import AppProvider from "../../../services/services";
import {AuthProvider} from "../../../shared/utills/Auth";
import user from "@testing-library/user-event";
import ItemFormComponents from "../../Product/components/item-form.component";
import ShoppingListViewComponent from "./shopping-list-view.component";

describe(" <ShoppingListViewComponent  />", () => {
    it("correctly call submit function with arguments", async () => {
        render(
            <AppProvider>
                <ThemeProvider theme={lightTheme}>
                    <IntlProvider locale={language.locale} messages={language.lang}>
                        <BrowserRouter>
                            <ShoppingListViewComponent/>
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
