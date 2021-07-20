import {render, screen} from "@testing-library/react";
import React from "react";
import {ThemeProvider} from "styled-components";
import {lightTheme} from "../theme/theme";
import {IntlProvider} from "react-intl";
import {EN_language as language} from "../utills/language";
import {BrowserRouter} from "react-router-dom";
import AppProvider from "../context/context";
import {AuthProvider} from "../providers/Auth";
import user from "@testing-library/user-event";
import List from "../components/organisms/List";
import ListItem from "../components/molecules/ListItem";

describe("Items view list", () => {
  it("correctly call functions on item", async () => {
    const deleteItemMock = jest.fn();
    const decreaseQuantityMock = jest.fn();
    const increaseQuantityMock = jest.fn();

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

    // const inputName = screen.getAllByTestId("decreaseQuantity")[0];
    // console.log(inputName);
    const decreaseQuantityButton = screen.getByTestId("decreaseQuantity");
    const increaseQuantityButton = screen.getByTestId("increaseQuantity");
    const deleteItemButton = screen.getByTestId("deleteItem");

    user.click(decreaseQuantityButton);
    user.click(increaseQuantityButton);
    user.click(deleteItemButton);

    expect(increaseQuantityMock).toBeCalled();
    expect(increaseQuantityMock).toHaveBeenCalledTimes(1);
    expect(decreaseQuantityMock).toBeCalled();
    expect(decreaseQuantityMock).toHaveBeenCalledTimes(1);

    expect(deleteItemMock).toBeCalled();
    expect(deleteItemMock).toHaveBeenCalledTimes(1);

    // const inputMinimalQuantity = screen.getByTestId("minimalQuantity");
    // const inputCurrentQuantity = screen.getByTestId("currentQuantity");
    // const submitButton = screen.getByTestId("accept");
    //
    // user.type(inputName, "Wine");
    // user.selectOptions(inputCategory, ["dairy"]);
    // user.selectOptions(inputUnit, ["liter"]);
    // user.type(inputMaximalQuantity, "5");
    // user.type(inputMinimalQuantity, "5");
    // user.type(inputCurrentQuantity, "5");
    // user.click(submitButton);
    //
    // await waitFor(() => expect(onSubmitMock).toBeCalled());
    // await waitFor(() => expect(onSubmitMock).toHaveBeenCalledTimes(1));
    // await waitFor(() =>
    //     expect(onSubmitMock).toHaveBeenCalledWith({
    //         name: "Wine",
    //         category: "dairy",
    //         unit: "liter",
    //         currentQuantity: 5,
    //         minimalQuantity: 5,
    //         maximalQuantity: 5,
    //     })
    // );
  });

    const list = [
        {
            name: "Wine",
            category: "beverages",
            maximalQuantity: 3,
            minimalQuantity: 3,
            currentQuantity: 0,
            id: "h6y0w72woJCIgWdoxQ7G",
            unit: "liter"
        },
        {
            name: "Chocolate",
            category: "sweets",
            maximalQuantity: 3,
            minimalQuantity: 3,
            currentQuantity: 0,
            id: "sYdF4BxIKWDE4XQr9Q7u",
            unit: "liter"
        }
    ];

      render(
          <AuthProvider>
              <AppProvider>
                  <ThemeProvider theme={lightTheme}>
                      <IntlProvider locale={language.locale} messages={language.lang}>
                          <BrowserRouter>
                              <List items={list} parameter={"all"}/>
                          </BrowserRouter>
                      </IntlProvider>
                  </ThemeProvider>
              </AppProvider>
          </AuthProvider>
      );
  //
  //
      const arrayElements = screen.getAllByTestId("decreaseQuantity")[0];

      expect(arrayElements).toHaveLength(2);
  //     console.log(inputName)
  //     // const inputCategory = screen.getByTestId("category");
  //     // const inputUnit = screen.getByTestId("unit");
  //     // const inputMaximalQuantity = screen.getByTestId("maximalQuantity");
  //     // const inputMinimalQuantity = screen.getByTestId("minimalQuantity");
  //     // const inputCurrentQuantity = screen.getByTestId("currentQuantity");
  //     // const submitButton = screen.getByTestId("accept");
  //     //
  //     // user.type(inputName, "Wine");
  //     // user.selectOptions(inputCategory, ["dairy"]);
  //     // user.selectOptions(inputUnit, ["liter"]);
  //     // user.type(inputMaximalQuantity, "5");
  //     // user.type(inputMinimalQuantity, "5");
  //     // user.type(inputCurrentQuantity, "5");
  //     // user.click(submitButton);
  //     //
  //     // await waitFor(() => expect(onSubmitMock).toBeCalled());
  //     // await waitFor(() => expect(onSubmitMock).toHaveBeenCalledTimes(1));
  //     // await waitFor(() =>
  //     //     expect(onSubmitMock).toHaveBeenCalledWith({
  //     //         name: "Wine",
  //     //         category: "dairy",
  //     //         unit: "liter",
  //     //         currentQuantity: 5,
  //     //         minimalQuantity: 5,
  //     //         maximalQuantity: 5,
  //     //     })
  //     // );
  // });

  // it("correctly show error message when field is not filled and do not submit form", async () => {
  //     const onSubmitMock = jest.fn();
  //     render(
  //         <AuthProvider>
  //             <AppProvider>
  //                 <ThemeProvider theme={lightTheme}>
  //                     <IntlProvider locale={language.locale} messages={language.lang}>
  //                         <BrowserRouter>
  //                             <ItemForm addItem={onSubmitMock} />
  //                         </BrowserRouter>
  //                     </IntlProvider>
  //                 </ThemeProvider>
  //             </AppProvider>
  //         </AuthProvider>
  //     );
  //
  //     const inputName = screen.getByTestId("name");
  //     const inputCategory = screen.getByTestId("category");
  //     const inputMaximalQuantity = screen.getByTestId("maximalQuantity");
  //     const inputMinimalQuantity = screen.getByTestId("maximalQuantity");
  //     const inputCurrentQuantity = screen.getByTestId("currentQuantity");
  //
  //     const submitButton = screen.getByTestId("accept");
  //
  //     user.type(inputName, "Wine");
  //     user.selectOptions(inputCategory, ["dairy"]);
  //     user.type(inputMaximalQuantity, "5");
  //     user.type(inputMinimalQuantity, "5");
  //     user.type(inputCurrentQuantity, "5");
  //     user.click(submitButton);
  //
  //     await waitFor(() => expect(onSubmitMock).toHaveBeenCalledTimes(0));
  //     await waitFor(() =>
  //         expect(screen.getByText("Unit is required!")).toBeInTheDocument()
  //     );
  // });
  //
  // it("correctly show error message when number is too bit", async () => {
  //     const onSubmitMock = jest.fn();
  //     render(
  //         <AuthProvider>
  //             <AppProvider>
  //                 <ThemeProvider theme={lightTheme}>
  //                     <IntlProvider locale={language.locale} messages={language.lang}>
  //                         <BrowserRouter>
  //                             <ItemForm addItem={onSubmitMock} />
  //                         </BrowserRouter>
  //                     </IntlProvider>
  //                 </ThemeProvider>
  //             </AppProvider>
  //         </AuthProvider>
  //     );
  //
  //     const inputName = screen.getByTestId("name");
  //     const inputCategory = screen.getByTestId("category");
  //     const inputUnit = screen.getByTestId("unit");
  //     const inputMaximalQuantity = screen.getByTestId("maximalQuantity");
  //     const inputMinimalQuantity = screen.getByTestId("minimalQuantity");
  //     const inputCurrentQuantity = screen.getByTestId("currentQuantity");
  //     const submitButton = screen.getByTestId("accept");
  //
  //     user.type(inputName, "Wine");
  //     user.selectOptions(inputCategory, ["dairy"]);
  //     user.selectOptions(inputUnit, ["liter"]);
  //     user.type(inputMaximalQuantity, "55");
  //     user.type(inputMinimalQuantity, "5");
  //     user.type(inputCurrentQuantity, "5");
  //     user.click(submitButton);
  //
  //     await waitFor(() => expect(onSubmitMock).toHaveBeenCalledTimes(0));
  //     await waitFor(() =>
  //         expect(screen.getByText("Less than 10!")).toBeInTheDocument()
  //     );
  // });
});
