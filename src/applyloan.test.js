import {
  fireEvent,
  getByTestId,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import Applyloan from "./applyloan";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
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
      <Applyloan />
    </BrowserRouter>
  );
});

test("error statements", () => {
  render(
    <BrowserRouter>
      <Applyloan />
    </BrowserRouter>
  );
  expect(
    screen.queryByText("*Loan amount should not be zero or negative")
  ).not.toBeInTheDocument();
  fireEvent.click(screen.getByTestId("loan-button"));
  expect(
    screen.getByText("*Loan amount should not be zero or negative")
  ).toBeVisible();
});

test("loan type", () => {
  render(
    <BrowserRouter>
      <Applyloan />
    </BrowserRouter>
  );
  expect(screen.queryByTestId("educationloan")).toBeNull();

  const select = screen.getByTestId("loantype");
  fireEvent.change(select, { target: { value: "Education Loan" } });
  expect(screen.getByTestId("educationloan")).toBeInTheDocument();
});
