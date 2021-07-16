import { render, screen } from "@testing-library/react";
import AddView from "../views/AddView";
import React from "react";

describe("Add item view Test", () => {
    it('should render AddView page correctly',  () =>  {
        render(<ItemForm/>);
        const input1 = screen.getByPlaceholderText("Number 1");
        expect(input1).toBeInTheDocument();
    });
})