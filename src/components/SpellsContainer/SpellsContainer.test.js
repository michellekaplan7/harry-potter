import React from "react";
import SpellsContainer from "./SpellsContainer";
import { MemoryRouter } from "react-router-dom";
import { render, waitFor, fireEvent } from "@testing-library/react";
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

  it("should render a loading message when fetching the spell data", () => {
    const router = (
      <MemoryRouter>
        <SpellsContainer />
      </MemoryRouter>
    );
    const { getByText } = render(router);
    const loading = getByText("Loading...");

    expect(loading).toBeInTheDocument();
  });
  
  it("should render the spells container, which holds spell cards", async () => {
    const router = (
      <MemoryRouter>
        <SpellsContainer />
      </MemoryRouter>
    );

    const { getByText, getByRole, getAllByText } = render(router);
    const loading = getByText("Loading...")
    const spellBookHeader = await waitFor(() => getByText("Harry's Spell Book"));
    const effect = await waitFor(() => getAllByText("Effect", {exact: false}))
    const favoritesCount = await waitFor(() => getByText("Favorites (0)"));
    const filterSpells = await waitFor(() => getByRole("combobox"));

    expect(loading).not.toBeInTheDocument();
    expect(spellBookHeader).toBeInTheDocument();
    expect(favoritesCount).toBeInTheDocument();
    expect(filterSpells).toBeInTheDocument();
    expect(effect).toHaveLength(4);
  });

  it("should filter the spells by charm type when charm is selected", async () => {
    const router = (
      <MemoryRouter>
        <SpellsContainer />
      </MemoryRouter>
    );

    const { getByRole, getAllByText } = render(router);
    const effectBefore = await waitFor(() => getAllByText("Effect", {exact: false}));
    expect(effectBefore).toHaveLength(4);
    
    const filterSpells = await waitFor(() => getByRole("combobox"));
    fireEvent.change(filterSpells, { target: { value: "Charm"}});
    const effectAfter = await waitFor(() => getAllByText("Effect", {exact: false}));
    expect(effectAfter).toHaveLength(3);
  });
});