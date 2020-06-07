import React from "react";
import Explore from "./Explore";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/";

describe("Explore", () => {
  it("should display the correct information", () => {
    const router = (
      <MemoryRouter>
        <Explore />
      </MemoryRouter>
    );

    const { getByText, getAllByRole } = render(router);
    const exploreHeader = getByText("Explore The Wizarding World!");
    const sortButton = getByText("Get Sorted");
    const exploreButtons = getAllByRole("button");

    expect(exploreButtons).toHaveLength(4);
    expect(sortButton).toBeInTheDocument();
    expect(exploreHeader).toBeInTheDocument();
  });
});
