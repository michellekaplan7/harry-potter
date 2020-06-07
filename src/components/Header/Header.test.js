import React from "react";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/";

describe("Header", () => {
  it("should display the correct information", () => {
    const router = (
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const { getByText, getByAltText } = render(router);
    const headerText = getByText("WIZARD HARRY");
    const logo = getByAltText("wizard harry logo");

    expect(headerText).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });
});
