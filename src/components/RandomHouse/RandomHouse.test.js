import React from "react";
import RandomHouse from "./RandomHouse";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/";
import { getRandomHouse } from "../../apiCalls";
jest.mock("../../apiCalls");

const mockHouseData = "Hufflepuff";

getRandomHouse.mockResolvedValue(mockHouseData);

describe("RandomHouse", () => {
  it("should display the correct information", () => {
    const router = (
      <MemoryRouter>
        <RandomHouse />
      </MemoryRouter>
    );

    const { getByText, getByRole, getByAltText } = render(router);
    const sortingHeader = getByText("Let the sorting begin!");
    const sortButton = getByRole("button", { name: "Get House" });
    const harryPotterImage = getByAltText("harry-potter-cartoon");

    expect(sortingHeader).toBeInTheDocument();
    expect(sortButton).toBeInTheDocument();
    expect(harryPotterImage).toBeInTheDocument();
  });

  it("should display a random house upon clicking the Get House button", async () => {
    const router = (
      <MemoryRouter>
        <RandomHouse />
      </MemoryRouter>
    );

    const { getByRole, getByAltText, getByText } = render(router);

    const sortButton = getByRole("button", { name: "Get House" });
    fireEvent.click(sortButton);

    const houseLogo = await waitFor(() => getByAltText("house logo"));
    const houseName = await waitFor(() => getByText("HUFFLEPUFF!"));
    expect(houseLogo).toBeInTheDocument();
    expect(houseName).toBeInTheDocument();
  });
});
