import {
  fireEvent,
  getByTestId,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";

import Depositamount from "./Deposit";
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
      <Depositamount />
    </BrowserRouter>
  );
});

test("error statements", () => {
  render(
    <BrowserRouter>
      <Depositamount />
    </BrowserRouter>
  );
  expect(
    screen.queryByText("*Intial Deposit is not entered")
  ).not.toBeInTheDocument();
  fireEvent.click(screen.getByTestId("deposit-button"));
  expect(screen.getByText("*Intial Deposit is not entered")).toBeVisible();
});
