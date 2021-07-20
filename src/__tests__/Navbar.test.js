import React from "react";
import {render, screen} from "@testing-library/react";
import {lightTheme} from "../theme/theme";
import Navbar from "../components/molecules/Navbar";
import {ThemeProvider} from "styled-components";
import BrowserRouter from "react-router-dom/modules/BrowserRouter";

describe("Navbar tests, ", () => {
  // beforeEach(()=>{
  //
  // })

  it("correctly render Navbar with navigation buttons", async () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </ThemeProvider>
    );

    const checkInvnetoryButton = screen.getByText("/check inventory/i");
    const addProductButton = screen.getByText("/add product/i");
    const shoppingListButton = screen.getByText("/shopping list/i");
    const settingsButton = screen.getByText("/settings/i");

    expect(checkInvnetoryButton).toBeInTheDocument();
    expect(addProductButton).toBeInTheDocument();
    expect(shoppingListButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();
  });
});
