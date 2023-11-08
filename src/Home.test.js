import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";
import Home from "./Home";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

beforeEach(() => {
  useSelector.mockReturnValue([
    {
      name: "harsha",
      username: "hh",
      password: "1",
      address: "#1234,world",
      country: "India",
      state: "I1",
      email: "h@gmail.com",
      contactNumber: "1234567890",
      dob: "2023-09-11",
      account: "Savings Account",
      branch: "Madhapur",
      initialDeposit: 60000,
      proofId: "Adhar Card",
      idNumber: "123",
      id: 1,
    },
  ]);
});

test("component has to be rendered", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
});

test("update text verify", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const updatetext = screen.getByText(/update/i);
  expect(updatetext).toBeInTheDocument();
});
