import React from "react";
import CharactersContainer from "./CharactersContainer";
import { MemoryRouter } from "react-router-dom";
import { render, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/";
import { getCharacters } from "../../apiCalls";
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
  },
  {
    id: "5a1096253dc2080021cd875f",
    name: "Cedric Diggory",
    role: "Student",
    house: "Hufflepuff",
    ministryOfMagic: false,
    orderOfThePhoenix: false,
    dumbledoresArmy: false,
    deathEater: false,
    bloodStatus: "pure-blood",
    species: "human",
  },
  {
    id: "5a1233bc0f5ae10021650d97",
    name: "Severus Snape",
    role: "Professor, Potions",
    house: "Slytherin",
    ministryOfMagic: false,
    orderOfThePhoenix: true,
    dumbledoresArmy: false,
    deathEater: true,
    bloodStatus: "half-blood",
    species: "human",
  },
  {
    id: "5a107ffee0686c0021283b21",
    name: "Cho Chang",
    role: "Student",
    house: "Ravenclaw",
    ministryOfMagic: false,
    orderOfThePhoenix: false,
    dumbledoresArmy: true,
    deathEater: false,
    bloodStatus: "unknown",
    species: "human",
  },
];

getCharacters.mockResolvedValue(mockCharactersData);

describe("CharactersContainer", () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it("should render a loading message when fetching the character data", () => {
    const router = (
      <MemoryRouter>
        <CharactersContainer />
      </MemoryRouter>
    );
    const { getByText } = render(router);
    const loading = getByText("Loading...");

    expect(loading).toBeInTheDocument();
  });

  it("should render the characters container, which holds character cards", async () => {
    const router = (
      <MemoryRouter>
        <CharactersContainer />
      </MemoryRouter>
    );

    const { getByText, getByRole, getAllByText } = render(router);
    const loading = getByText("Loading...");
    const charactersHeader = await waitFor(() => getByText("Characters"));
    const name = await waitFor(() => getAllByText("Name:", { exact: false }));
    const role = await waitFor(() => getAllByText("Role:", { exact: false }));
    const favoritesCount = await waitFor(() => getByText("Favorites (0)"));
    const filterCharacters = await waitFor(() => getByRole("combobox"));

    expect(loading).not.toBeInTheDocument();
    expect(charactersHeader).toBeInTheDocument();
    expect(name).toHaveLength(5);
    expect(role).toHaveLength(5);
    expect(favoritesCount).toBeInTheDocument();
    expect(filterCharacters).toBeInTheDocument();
  });

  it("should filter the characters by house type of Hufflepuff", async () => {
    const router = (
      <MemoryRouter>
        <CharactersContainer />
      </MemoryRouter>
    );

    const { getByRole, getAllByText } = render(router);
    const nameBefore = await waitFor(() =>
      getAllByText("Name:", { exact: false })
    );
    expect(nameBefore).toHaveLength(5);

    const filterCharacters = await waitFor(() => getByRole("combobox"));
    fireEvent.change(filterCharacters, { target: { value: "Hufflepuff" } });
    const nameAfter = await waitFor(() => getAllByText("Name:", { exact: false }));
    expect(nameAfter).toHaveLength(1);
  });

  it("should filter the characters by house type of Ravenclaw", async () => {
    const router = (
      <MemoryRouter>
        <CharactersContainer />
      </MemoryRouter>
    );

    const { getByRole, getAllByText } = render(router);
    const nameBefore = await waitFor(() => getAllByText("Name:", { exact: false }));
    expect(nameBefore).toHaveLength(5);

    const filterCharacters = await waitFor(() => getByRole("combobox"));
    fireEvent.change(filterCharacters, { target: { value: "Ravenclaw" } });
    const nameAfter = await waitFor(() => getAllByText("Name:", { exact: false }));
    expect(nameAfter).toHaveLength(1);
  });

  it("should filter the characters by house type of Gryffindor", async () => {
    const router = (
      <MemoryRouter>
        <CharactersContainer />
      </MemoryRouter>
    );

    const { getByRole, getAllByText } = render(router);
    const nameBefore = await waitFor(() => getAllByText("Name:", { exact: false }));
    expect(nameBefore).toHaveLength(5);

    const filterCharacters = await waitFor(() => getByRole("combobox"));
    fireEvent.change(filterCharacters, { target: { value: "Gryffindor" } });
    const nameAfter = await waitFor(() => getAllByText("Name:", { exact: false }));
    expect(nameAfter).toHaveLength(2);
  });

  it("should filter the characters by house type of Slytherin", async () => {
    const router = (
      <MemoryRouter>
        <CharactersContainer />
      </MemoryRouter>
    );

    const { getByRole, getAllByText } = render(router);
    const nameBefore = await waitFor(() => getAllByText("Name:", { exact: false }));
    expect(nameBefore).toHaveLength(5);

    const filterCharacters = await waitFor(() => getByRole("combobox"));
    fireEvent.change(filterCharacters, { target: { value: "Slytherin" } });
    const nameAfter = await waitFor(() => getAllByText("Name:", { exact: false }));
    expect(nameAfter).toHaveLength(1);
  });

  it("should have zero favorite characters upon load and show an error message when trying to filter by favorites", async () => {
    const router = (
      <MemoryRouter>
        <CharactersContainer />
      </MemoryRouter>
    );

    const { getByText, getByRole } = render(router);

    const favoritesCount = await waitFor(() => getByText("Favorites (0)"));
    expect(favoritesCount).toBeInTheDocument();

    const filterCharacters = await waitFor(() => getByRole("combobox"));
    fireEvent.change(filterCharacters, { target: { value: "Favorites" } });

    const errorMessage = getByText("You currently have no favorite characters. Add some!");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should update the favorites count upon favoriting a character", async () => {
    const router = (
      <MemoryRouter>
        <CharactersContainer />
      </MemoryRouter>
    );
    const { getByText, getByTestId } = render(router);

    const favoritesCount = await waitFor(() => getByText("Favorites (0)"));
    expect(favoritesCount).toBeInTheDocument();

    const starButton = getByTestId("emptyStar-5a12292a0f5ae10021650d7e").firstChild;
    expect(starButton).toBeInTheDocument();
    fireEvent.click(starButton);

    const updatedFavoritesCount = await waitFor(() => getByText("Favorites (1)"));
    expect(updatedFavoritesCount).toBeInTheDocument();
  });

  it("should update the star style to a filled star upon favoriting", async () => {
    const router = (
      <MemoryRouter>
        <CharactersContainer />
      </MemoryRouter>
    );
    const { getByTestId } = render(router);

    const starButton = await waitFor(() => getByTestId("emptyStar-5a12292a0f5ae10021650d7e").firstChild);
    fireEvent.click(starButton);

    const filledStarButton = await waitFor(() => getByTestId("fullStar-5a12292a0f5ae10021650d7e"));
    expect(filledStarButton).toBeInTheDocument();
  });

  it("should filter the characters by favorites and show only those that were favorited", async () => {
    const router = (
      <MemoryRouter>
        <CharactersContainer />
      </MemoryRouter>
    );

    const { getByRole, getByText, getByTestId } = render(router);

    const starButton = await waitFor(() => getByTestId("emptyStar-5a12292a0f5ae10021650d7e").firstChild);
    fireEvent.click(starButton);

    const filterCharacters = getByRole("combobox");
    fireEvent.change(filterCharacters, { target: { value: "Favorites" } });
    const favoritedCharacter = await waitFor(() => getByText("Harry", { exact: false }));
    expect(favoritedCharacter).toBeInTheDocument();
  });

  it("should show the error message of no favorites if you've favorited, filtered by favorites, and then unfavorite all favorites", async () => {
    const router = (
      <MemoryRouter>
        <CharactersContainer />
      </MemoryRouter>
    );

    const { getByRole, getByText, getByTestId } = render(router);

    const starButton = await waitFor(() => getByTestId("emptyStar-5a12292a0f5ae10021650d7e").firstChild);
    fireEvent.click(starButton);

    const favoritesCount = await waitFor(() => getByText("Favorites (1)"));
    expect(favoritesCount).toBeInTheDocument();

    const filterCharacters = getByRole("combobox");
    fireEvent.change(filterCharacters, { target: { value: "Favorites" } });
    const filledStarButton = await waitFor(() => getByTestId("fullStar-5a12292a0f5ae10021650d7e").firstChild);
    expect(filledStarButton).toBeInTheDocument();
    fireEvent.click(filledStarButton);

    const errorMessage = await waitFor(() => getByText("You currently have no favorite characters. Add some!"));
    expect(errorMessage).toBeInTheDocument();
  });

  it("should allow the user to favorite and unfavorite a character", async () => {
    const router = (
      <MemoryRouter>
        <CharactersContainer />
      </MemoryRouter>
    );

    const { getByText, getByTestId } = render(router);

    const favoritesCountStart = await waitFor(() => getByText("Favorites (0)"));
    expect(favoritesCountStart).toBeInTheDocument();

    const starButton = await waitFor(() => getByTestId("emptyStar-5a12292a0f5ae10021650d7e").firstChild);
    fireEvent.click(starButton);

    const favoritesCountUpdated = await waitFor(() => getByText("Favorites (1)"));
    expect(favoritesCountUpdated).toBeInTheDocument();

    const filledStarButton = await waitFor(() => getByTestId("fullStar-5a12292a0f5ae10021650d7e").firstChild);
    expect(filledStarButton).toBeInTheDocument();
    fireEvent.click(filledStarButton);

    const favoritesCountAfter = await waitFor(() => getByText("Favorites (0)"));
    expect(favoritesCountAfter).toBeInTheDocument();
  });
});
