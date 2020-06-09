import React from "react";
import Character from "./Character";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/";

describe("Character", () => {
  const mockCharacterData = {
    id: "5a12292a0f5ae10021650d7e",
    name: "Harry Potter",
    role: "student",
    house: "Gryffindor",
    ministryOfMagic: false,
    orderOfThePhoenix: true,
    dumbledoresArmy: true,
    deathEater: false,
    bloodStatus: "half-blood",
    species: "human",
  };

  it("should render the correct information", () => {
    const router = (
      <MemoryRouter>
        <Character {...mockCharacterData} />
      </MemoryRouter>
    );

    const { getByText } = render(router);
    const name = getByText("Harry Potter", {exact: false});
    const role = getByText("student", {exact: false});
    const house = getByText("Gryffindor", {exact: false});
    const ministryOfMagic = getByText("Ministry Of Magic", {exact: false})
    const dumbledoresArmy = getByText("Dumbledores Army", {exact: false})

    expect(name).toBeInTheDocument();
    expect(role).toBeInTheDocument();
    expect(house).toBeInTheDocument();
    expect(ministryOfMagic).toBeInTheDocument();
    expect(dumbledoresArmy).toBeInTheDocument();
  });

  it("favorites a character when you click on a star", () => {
    const mockToggleFavorites = jest.fn();

    const router = (
      <MemoryRouter>
        <Character
          {...mockCharacterData}
          toggleFavorites={mockToggleFavorites}
          favorite={false}
        />
      </MemoryRouter>
    );

    const { getByTestId } = render(router);

    const starButton = getByTestId("emptyStar-5a12292a0f5ae10021650d7e").firstChild;
    expect(starButton).toBeInTheDocument();
    fireEvent.click(starButton);
    expect(mockToggleFavorites).toHaveBeenCalledWith("5a12292a0f5ae10021650d7e");
  });

  it("unfavorites a character when you click on a star that has already been favorited", () => {
    const mockToggleFavorites = jest.fn();

    const router = (
      <MemoryRouter>
        <Character
          {...mockCharacterData}
          toggleFavorites={mockToggleFavorites}
          favorite={true}
        />
      </MemoryRouter>
    );

    const { getByTestId } = render(router);

    const starButton = getByTestId("fullStar-5a12292a0f5ae10021650d7e").firstChild;
    expect(starButton).toBeInTheDocument();
    fireEvent.click(starButton);
    expect(mockToggleFavorites).toHaveBeenCalledWith("5a12292a0f5ae10021650d7e");
  });
});
