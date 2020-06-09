import React from "react";
import Advice from "./Advice";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/";
import { getAdvice } from "../../apiCalls";
jest.mock("../../apiCalls");

const mockAdviceData = {
  slip: { id: 81, advice: "Age is of no importance, unless you are a cheese." },
};

getAdvice.mockResolvedValue(mockAdviceData);

describe("RandomHouse", () => {
  it("should display the correct information", () => {
    const router = (
      <MemoryRouter>
        <Advice />
      </MemoryRouter>
    );

    const { getByText, getByRole, getByAltText } = render(router);
    const adviceHeader = getByText("Hermione Says...");
    const adviceButton = getByRole("button", { name: "Get Advice" });
    const hermioneImage = getByAltText("hermione granger");

    expect(adviceHeader).toBeInTheDocument();
    expect(adviceButton).toBeInTheDocument();
    expect(hermioneImage).toBeInTheDocument();
  });

  it("should display random advice upon clicking the Get Advice button", async () => {
    const router = (
      <MemoryRouter>
        <Advice />
      </MemoryRouter>
    );

    const { getByRole, getByText } = render(router);

    const adviceButton = getByRole("button", { name: "Get Advice" });
    fireEvent.click(adviceButton);

    const randomAdvice = await waitFor(() => getByText("Age is of no importance, unless you are a cheese."));
    expect(randomAdvice).toBeInTheDocument();
  });
});
