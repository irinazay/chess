import React from "react";
import Homepage from "./Homepage";
import { useAuth0 } from "@auth0/auth0-react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234",
};

// intercept the useAuth0 function and mock it
jest.mock("@auth0/auth0-react");

describe("Homepage test", () => {
  beforeEach(() => {
    // Mock the Auth0 hook and make it return a logged in state
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });
  });

  test("render homepage without crashing", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );
    expect(getByText("computer")).toBeInTheDocument();
    expect(getByText("Resign")).toBeInTheDocument();
  });

  test("resign game ", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );
    expect(getByText("Resign")).toBeInTheDocument();

    const link = getByText("Resign");
    fireEvent.click(link);
    expect(getByText("computer")).toBeInTheDocument();
  });

  test("make move ", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    );
    expect(getByText("Resign")).toBeInTheDocument();

    const link = getByText("Resign");
    fireEvent.click(link);
    expect(getByText("computer")).toBeInTheDocument();
  });
});
