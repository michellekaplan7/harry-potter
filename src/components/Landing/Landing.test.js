import React from "react";
import Landing from "./Landing";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/";

describe("Landing", () => {
  it("should display the correct information", () => {
    const router = (
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );

    const { getByRole } = render(router);
    const link = getByRole("link", {name: "I Solemnly Swear That I Am Up To No Good"});

    expect(link).toBeInTheDocument();
  });
});
