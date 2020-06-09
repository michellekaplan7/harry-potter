import React from "react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/";
import { getSpells, getCharacters } from "../../apiCalls";
jest.mock("../../apiCalls");

const mockCharactersData = [
  {
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
  },
  {
    id: "5a1097653dc2080021cd8763",
    name: "Albus Dumbledore",
    role: "Headmaster, Hogwarts",
    house: "Gryffindor",
    ministryOfMagic: true,
    orderOfThePhoenix: true,
    dumbledoresArmy: false,
    deathEater: false,
    bloodStatus: "half-blood",
    species: "human",
  }
];

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
  }
];

getCharacters.mockResolvedValue(mockCharactersData);
getSpells.mockResolvedValue(mockSpellsData);

describe("App", () => {
  it("should render the landing page upon load", () => {
    const router = (
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const { getByRole } = render(router);

    const link = getByRole("link", {name: "I Solemnly Swear That I Am Up To No Good"});
    expect(link).toBeInTheDocument();
  });

  it("should render the explore page upon clicking the link on the landing page", () => {
    const router = (
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const { getByRole, getByText, getAllByRole } = render(router);

    const link = getByRole("link", {name: "I Solemnly Swear That I Am Up To No Good"});
    fireEvent.click(link)

    const exploreHeader = getByText("Explore The Wizarding World!");
    const exploreButtons = getAllByRole("button");

    expect(exploreHeader).toBeInTheDocument();
    expect(exploreButtons).toHaveLength(4);
  });

  it("should render the sorting page upon clicking the 'Get Sorted' button on the explore page", () => {
    const router = (
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const { getByRole, getByText, getByAltText } = render(router);

    const link = getByRole("link", {name: "I Solemnly Swear That I Am Up To No Good"});
    fireEvent.click(link)

    const sortButton = getByRole("button", {name: "Get Sorted"});
    fireEvent.click(sortButton);

    const sortingHeader = getByText("Let the sorting begin!");
    const harryPotterImage = getByAltText("harry-potter-cartoon");

    expect(sortingHeader).toBeInTheDocument();
    expect(harryPotterImage).toBeInTheDocument();
  });

  it("should render the advice page upon clicking the 'Advice From Hermione' button on the explore page", () => {
    const router = (
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const { getByRole, getByText, getByAltText } = render(router);

    const link = getByRole("link", {name: "I Solemnly Swear That I Am Up To No Good"});
    fireEvent.click(link)

    const adviceButton = getByRole("button", {name: "Advice From Hermione"});
    fireEvent.click(adviceButton);

    const adviceHeader = getByText("Hermione Says...");
    const hermioneImage = getByAltText("hermione granger");

    expect(adviceHeader).toBeInTheDocument();
    expect(hermioneImage).toBeInTheDocument();
  });

  it("should render the spells page upon clicking the 'Spell Book' button on the explore page", async () => {
    const router = (
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const { getByRole, getByText } = render(router);

    const link = getByRole("link", {name: "I Solemnly Swear That I Am Up To No Good"});
    fireEvent.click(link)

    const spellBookButton = getByRole("button", {name: "Spell Book"});
    fireEvent.click(spellBookButton);

    const spellBookHeader = await waitFor(() => getByText("Harry's Spell Book"));
    const spell = await waitFor(() => getByText("Spell: Aberto"));
    expect(spellBookHeader).toBeInTheDocument();
    expect(spell).toBeInTheDocument();
  });

  it("should render the characters page upon clicking the 'View Characters' button on the explore page", async () => {
    const router = (
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const { getByRole, getByText, getAllByText } = render(router);

    const link = getByRole("link", {name: "I Solemnly Swear That I Am Up To No Good"});
    fireEvent.click(link)

    const viewCharactersButton = getByRole("button", {name: "View Characters"});
    fireEvent.click(viewCharactersButton);

    const charactersHeader = await waitFor(() => getByText("Characters"));
    const name = await waitFor(() => getAllByText("Name:", { exact: false }));
    const favoritesCount = await waitFor(() => getByText("Favorites (0)"));

    expect(charactersHeader).toBeInTheDocument();
    expect(name).toHaveLength(2);
    expect(favoritesCount).toBeInTheDocument();
  });
});
