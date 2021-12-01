import { render } from "@testing-library/react";
import App from "./App";
import Navigation from "./components/Navigation";
import { MemoryRouter } from "react-router-dom";

test("render without crashing", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});

test("render navigation without crashing", () => {
  const { getByText } = render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>
  );
  expect(getByText("Log In")).toBeInTheDocument();
});
