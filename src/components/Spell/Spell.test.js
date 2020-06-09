import React from "react";
import Spell from "./Spell";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/";

describe("Spell", () => {
  const mockSpellData = {
    id: "5b74ebd5fb6fc0739646754c",
    spell: "Aberto",
    type: "Charm",
    effect: "opens objects",
  };

  it("should render the correct information", () => {
    const router = (
      <MemoryRouter>
        <Spell {...mockSpellData} />
      </MemoryRouter>
    );

    const { getByText } = render(router);
    const spellName = getByText("Spell: Aberto");
    const spellEffect = getByText("Effect: opens objects");
    const spellType = getByText("Type: Charm");

    expect(spellName).toBeInTheDocument();
    expect(spellEffect).toBeInTheDocument();
    expect(spellType).toBeInTheDocument();
  });

  it("favorites a spell when you click on a star", () => {
    const mockToggleFavorites = jest.fn();

    const router = (
      <MemoryRouter>
        <Spell
          {...mockSpellData}
          toggleFavorites={mockToggleFavorites}
          favorite={false}
        />
      </MemoryRouter>
    );

    const { getByTestId } = render(router);

    const starButton = getByTestId("emptyStar-5b74ebd5fb6fc0739646754c").firstChild;
    expect(starButton).toBeInTheDocument();
    fireEvent.click(starButton);
    expect(mockToggleFavorites).toHaveBeenCalledWith("5b74ebd5fb6fc0739646754c");
  });

  it("unfavorites a spell when you click on a star that has already been favorited", () => {
    const mockToggleFavorites = jest.fn();

    const router = (
      <MemoryRouter>
        <Spell
          {...mockSpellData}
          toggleFavorites={mockToggleFavorites}
          favorite={true}
        />
      </MemoryRouter>
    );

    const { getByTestId } = render(router);

    const starButton = getByTestId("fullStar-5b74ebd5fb6fc0739646754c").firstChild;
    expect(starButton).toBeInTheDocument();
    fireEvent.click(starButton);
    expect(mockToggleFavorites).toHaveBeenCalledWith("5b74ebd5fb6fc0739646754c");
  });
});
