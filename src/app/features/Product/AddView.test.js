import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import {ThemeProvider} from "styled-components";
import {lightTheme} from "../../shared/theme/theme";
import {IntlProvider} from "react-intl";
import {EN_language as language} from "../../language";
import {BrowserRouter} from "react-router-dom";
import AppProvider from "../../../context/context";
import {AuthProvider} from "../../shared/utills/Auth";
import user from "@testing-library/user-event";
import ItemFormComponents from "./components/item-form.component";

describe("<AddView />", () => {
    it("correctly call submit function with given arguments", async () => {
        const onSubmitMock = jest.fn();
        render(
            <AuthProvider>
                <AppProvider>
                    <ThemeProvider theme={lightTheme}>
                        <IntlProvider locale={language.locale} messages={language.lang}>
                            <BrowserRouter>
                                <ItemFormComponents addItem={onSubmitMock}/>
                            </BrowserRouter>
                        </IntlProvider>
                    </ThemeProvider>
                </AppProvider>
            </AuthProvider>
        );

        const inputName = screen.getByTestId("name");
        const inputCategory = screen.getByTestId("category");
        const inputUnit = screen.getByTestId("unit");
        const inputMaximalQuantity = screen.getByTestId("maximalQuantity");
        const inputMinimalQuantity = screen.getByTestId("minimalQuantity");
        const inputCurrentQuantity = screen.getByTestId("currentQuantity");
        const submitButton = screen.getByTestId("accept");

        user.type(inputName, "Wine");
        user.selectOptions(inputCategory, ["dairy"]);
        user.selectOptions(inputUnit, ["liter"]);
        user.type(inputMaximalQuantity, "5");
        user.type(inputMinimalQuantity, "5");
        user.type(inputCurrentQuantity, "5");
        user.click(submitButton);

        await waitFor(() => expect(onSubmitMock).toBeCalled());
        await waitFor(() => expect(onSubmitMock).toHaveBeenCalledTimes(1));
        await waitFor(() =>
            expect(onSubmitMock).toHaveBeenCalledWith({
                name: "Wine",
                category: "dairy",
                unit: "liter",
                currentQuantity: 5,
                minimalQuantity: 5,
                maximalQuantity: 5,
            })
        );
    });

    it("correctly show error message when field is not filled", async () => {
        const onSubmitMock = jest.fn();
        render(
            <AuthProvider>
                <AppProvider>
                    <ThemeProvider theme={lightTheme}>
                        <IntlProvider locale={language.locale} messages={language.lang}>
                            <BrowserRouter>
                                <ItemFormComponents addItem={onSubmitMock}/>
                            </BrowserRouter>
                        </IntlProvider>
                    </ThemeProvider>
                </AppProvider>
            </AuthProvider>
        );

        const inputName = screen.getByTestId("name");
        const inputCategory = screen.getByTestId("category");
        const inputMaximalQuantity = screen.getByTestId("maximalQuantity");
        const inputMinimalQuantity = screen.getByTestId("maximalQuantity");
        const inputCurrentQuantity = screen.getByTestId("currentQuantity");

        const submitButton = screen.getByTestId("accept");

        user.type(inputName, "Wine");
        user.selectOptions(inputCategory, ["dairy"]);
        user.type(inputMaximalQuantity, "5");
        user.type(inputMinimalQuantity, "5");
        user.type(inputCurrentQuantity, "5");
        user.click(submitButton);

        await waitFor(() => expect(onSubmitMock).toHaveBeenCalledTimes(0));
        await waitFor(() =>
            expect(screen.getByText("Unit is required!")).toBeInTheDocument()
        );
    });

    it("correctly show error message when number is too big", async () => {
        const onSubmitMock = jest.fn();
        render(
            <AuthProvider>
                <AppProvider>
                    <ThemeProvider theme={lightTheme}>
                        <IntlProvider locale={language.locale} messages={language.lang}>
                            <BrowserRouter>
                                <ItemFormComponents addItem={onSubmitMock}/>
                            </BrowserRouter>
                        </IntlProvider>
                    </ThemeProvider>
                </AppProvider>
            </AuthProvider>
        );

        const inputName = screen.getByTestId("name");
        const inputCategory = screen.getByTestId("category");
        const inputUnit = screen.getByTestId("unit");
        const inputMaximalQuantity = screen.getByTestId("maximalQuantity");
        const inputMinimalQuantity = screen.getByTestId("minimalQuantity");
        const inputCurrentQuantity = screen.getByTestId("currentQuantity");
        const submitButton = screen.getByTestId("accept");

        user.type(inputName, "Wine");
        user.selectOptions(inputCategory, ["dairy"]);
        user.selectOptions(inputUnit, ["liter"]);
        user.type(inputMaximalQuantity, "55");
        user.type(inputMinimalQuantity, "5");
        user.type(inputCurrentQuantity, "5");
        user.click(submitButton);

        await waitFor(() => expect(onSubmitMock).toHaveBeenCalledTimes(0));
        await waitFor(() =>
            expect(screen.getByText("Less than 10!")).toBeInTheDocument()
        );
    });
});
