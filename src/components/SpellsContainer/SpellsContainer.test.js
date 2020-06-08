import React from "react";
import SpellsContainer from "./SpellsContainer";
import { MemoryRouter } from "react-router-dom";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/";
import { getSpells } from "../../apiCalls";
jest.mock("../../apiCalls");

const mockSpellsData = [
    {
        "_id": "5b74ebd5fb6fc0739646754c",
        "spell": "Aberto",
        "type": "Charm",
        "effect": "opens objects"
    },
    {
        "_id": "5b74ecfa3228320021ab622b",
        "spell": "Accio",
        "type": "Charm",
        "effect": "Summons an object",
        "__v": 0
    },
    {
        "_id": "5b74ed2f3228320021ab622c",
        "spell": "Age Line",
        "type": "Enchantment",
        "effect": "Hides things from younger people",
        "__v": 0
    },
    {
        "_id": "5b74ed453228320021ab622d",
        "spell": "Aguamenti",
        "type": "Charm",
        "effect": "shoots water from wand",
        "__v": 0
    },
]

getSpells.mockResolvedValue(mockSpellsData);

describe("SpellsContainer", () => {
  it("should render the spells container, which holds spell cards", async () => {
    const router = (
      <MemoryRouter>
        <SpellsContainer />
      </MemoryRouter>
    );

    const { getByText, getByRole, getAllByText } = render(router);
    const spellBookHeader = getByText("Harry's Spell Book");
    const favoritesCount = getByText("Favorites (0)");
    const filterSpells = getByRole("combobox");
    const effect = await waitFor(() => getAllByText("Effect", {exact: false}))

    expect(spellBookHeader).toBeInTheDocument();
    expect(favoritesCount).toBeInTheDocument();
    expect(filterSpells).toBeInTheDocument();
    expect(effect).toHaveLength(4);
  });
});
