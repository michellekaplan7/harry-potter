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
        <Spell {...mockSpellData} toggleFavorites={mockToggleFavorites} favorite={false} />
      </MemoryRouter>
    );

    const { container } = render(router);

    const starButton = container.firstChild.firstChild.nextSibling.nextSibling.nextSibling;

    expect(container.firstChild).toBeInTheDocument();
    fireEvent.click(starButton);
    expect(mockToggleFavorites).toHaveBeenCalledWith("5b74ebd5fb6fc0739646754c");
  });
});