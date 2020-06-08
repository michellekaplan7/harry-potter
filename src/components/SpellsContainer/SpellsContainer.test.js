import React from "react";
import SpellsContainer from "./SpellsContainer";
import { MemoryRouter } from "react-router-dom";
import { render, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/";
import { getSpells } from "../../apiCalls";
jest.mock("../../apiCalls");

const mockSpellsData = [
  {
    _id: "5b74ebd5fb6fc0739646754c",
    spell: "Aberto",
    type: "Charm",
    effect: "opens objects",
  },
  {
    _id: "5b74ecfa3228320021ab622b",
    spell: "Accio",
    type: "Charm",
    effect: "Summons an object",
    __v: 0,
  },
  {
    _id: "5b74ed2f3228320021ab622c",
    spell: "Age Line",
    type: "Enchantment",
    effect: "Hides things from younger people",
    __v: 0,
  },
  {
    _id: "5b74ed453228320021ab622d",
    spell: "Aguamenti",
    type: "Charm",
    effect: "shoots water from wand",
    __v: 0,
  },
];

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
    const loading = getByText("Loading...");
    const spellBookHeader = await waitFor(() => getByText("Harry's Spell Book"));
    const effect = await waitFor(() => getAllByText("Effect", { exact: false }));
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
    const effectBefore = await waitFor(() => getAllByText("Effect", { exact: false }));
    expect(effectBefore).toHaveLength(4);

    const filterSpells = await waitFor(() => getByRole("combobox"));
    fireEvent.change(filterSpells, { target: { value: "Charm" } });
    const effectAfter = await waitFor(() => getAllByText("Effect", { exact: false }));
    expect(effectAfter).toHaveLength(3);
  });

  it("should have zero favorite spells upon load and show an error message when trying to filter by favorites", async () => {
    const router = (
      <MemoryRouter>
        <SpellsContainer />
      </MemoryRouter>
    );

    const { getByText, getByRole } = render(router);

    const favoritesCount = await waitFor(() => getByText("Favorites (0)"));
    expect(favoritesCount).toBeInTheDocument();

    const filterSpells = await waitFor(() => getByRole("combobox"));
    fireEvent.change(filterSpells, { target: { value: "Favorites" } });

    const errorMessage = getByText("You currently have no favorite spells. Add some!");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should update the favorites count upon favoriting a spell", async () => {
    const router = (
      <MemoryRouter>
        <SpellsContainer />
      </MemoryRouter>
    );
    const { getByText, getByTestId } = render(router);

    const favoritesCount = await waitFor(() => getByText("Favorites (0)"));
    expect(favoritesCount).toBeInTheDocument();

    const starButton = getByTestId("emptyStar-5b74ebd5fb6fc0739646754c").firstChild;
    expect(starButton).toBeInTheDocument();
    fireEvent.click(starButton);

    const updatedFavoritesCount = await waitFor(() => getByText("Favorites (1)"));
    expect(updatedFavoritesCount).toBeInTheDocument();
  });

  it("should update the star style to a filled star upon favoriting", async () => {
    const router = (
      <MemoryRouter>
        <SpellsContainer />
      </MemoryRouter>
    );
    const { getByTestId } = render(router);

    const starButton = await waitFor(() => getByTestId("emptyStar-5b74ebd5fb6fc0739646754c").firstChild);
    fireEvent.click(starButton);

    const filledStarButton = await waitFor(() => getByTestId("fullStar-5b74ebd5fb6fc0739646754c"));
    expect(filledStarButton).toBeInTheDocument();
  });

  it("should filter the spells by favorites and show only those that were favorited", async () => {
    const router = (
      <MemoryRouter>
        <SpellsContainer />
      </MemoryRouter>
    );

    const { getByRole, getByText, getByTestId } = render(router);

    const starButton = await waitFor(() => getByTestId("emptyStar-5b74ebd5fb6fc0739646754c").firstChild);
    fireEvent.click(starButton);

    const filterSpells = getByRole("combobox");
    fireEvent.change(filterSpells, { target: { value: "Favorites" } });
    const favoritedSpell = await waitFor(() => getByText("Aberto", {exact: false}));
    expect(favoritedSpell).toBeInTheDocument()
  });

  it("should show the error message of no favorites if you've favorited, filtered by favorites, and then unfavorite all favorites", async () => {
    const router = (
      <MemoryRouter>
        <SpellsContainer />
      </MemoryRouter>
    );

    const { getByRole, getByText, getByTestId } = render(router);

    const starButton = await waitFor(() => getByTestId("emptyStar-5b74ebd5fb6fc0739646754c").firstChild);
    fireEvent.click(starButton);

    const favoritesCount = await waitFor(() => getByText("Favorites (1)"));
    expect(favoritesCount).toBeInTheDocument();

    const filterSpells = getByRole("combobox");
    fireEvent.change(filterSpells, { target: { value: "Favorites" } });
    const filledStarButton = await waitFor(() => getByTestId("fullStar-5b74ebd5fb6fc0739646754c").firstChild);
    expect(filledStarButton).toBeInTheDocument()
    fireEvent.click(filledStarButton);

    const errorMessage = await waitFor(() => getByText("You currently have no favorite spells. Add some!"));
    expect(errorMessage).toBeInTheDocument();
  });

  it("should allow the user to favorite and unfavorite a spell", async () => {
    const router = (
      <MemoryRouter>
        <SpellsContainer />
      </MemoryRouter>
    );

    const { getByText, getByTestId } = render(router);

    const favoritesCountStart = await waitFor(() => getByText("Favorites (0)"));
    expect(favoritesCountStart).toBeInTheDocument();

    const starButton = await waitFor(() => getByTestId("emptyStar-5b74ebd5fb6fc0739646754c").firstChild);
    fireEvent.click(starButton);

    const favoritesCountUpdated = await waitFor(() => getByText("Favorites (1)"));
    expect(favoritesCountUpdated).toBeInTheDocument();

    const filledStarButton = await waitFor(() => getByTestId("fullStar-5b74ebd5fb6fc0739646754c").firstChild);
    expect(filledStarButton).toBeInTheDocument()
    fireEvent.click(filledStarButton);

    const favoritesCountAfter = await waitFor(() => getByText("Favorites (0)"));
    expect(favoritesCountAfter).toBeInTheDocument();
  });
});
