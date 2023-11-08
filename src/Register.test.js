import {
  fireEvent,
  getByTestId,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import Register from "./Register";
import { BrowserRouter } from "react-router-dom";

const mockDispatch = jest.fn();

// const formDataMock = {
//   name: "",
//   username: "",
//   password: "1",
//   address: "#1234,world",
//   country: "India",
//   state: "I1",
//   email: "h@gmail.com",
//   contactNumber: "1234567890",
//   dob: "2023-09-11",
//   account: "Savings Account",
//   branch: "Madhapur",
//   initialDeposit: 60000,
//   proofId: "Adhar Card",
//   idNumber: "123",
//   id: 1,
// };

// const validateMock = {
//   name: "name is required",
//   username: "username is required",
//   contactNumber: "Contact number must be 10 digits",
//   email: "Email should contain @and. symbols",
//   country: "Country is not selected",
//   state: "State is not selected",
//   proofId: "ID proof is not selected",
//   account: "Account Type is not selected",
//   branch: "Branch is not selected",
//   idNumber: "ID Number is not selected",
//   password: "Password is not entered",
//   address: "Address is not entered",
//   dob: "DOB is not selected",
//   initialDeposit: "Intial Deposit is not entered",
// };

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const handleSubmit = jest.fn();

// useSelector.mockReturnValue([
//   {
//     name: "harsha",
//     username: "hh",
//     password: "1",
//     address: "#1234,world",
//     country: "India",
//     state: "I1",
//     email: "h@gmail.com",
//     contactNumber: "1234567890",
//     dob: "2023-09-11",
//     account: "Savings Account",
//     branch: "Madhapur",
//     initialDeposit: 60000,
//     proofId: "Adhar Card",
//     idNumber: "123",
//     id: 1,
//   },
// ]);

test("render register component", () => {
  useSelector.mockReturnValue([]);
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
});

test("showing error message", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  expect(screen.queryByText("name is required")).not.toBeInTheDocument();
  expect(screen.queryByText("username is required")).not.toBeInTheDocument();
  expect(
    screen.queryByText("Email should contain @and. symbols")
  ).not.toBeInTheDocument();

  fireEvent.click(screen.getByTestId("signin-button"));

  expect(screen.getByText("*name is required")).toBeVisible();
  expect(screen.getByText("*username is required")).toBeVisible();
  expect(screen.getByText("*Email should contain @and. symbols")).toBeVisible();
});

test("state selection based on country selection", () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
  const countrychange = screen.getByText("Country");
  const countryselect = screen.getByTestId("inputCountry");
  expect(countrychange).toBeInTheDocument();

  fireEvent.change(countryselect, { target: { value: "America" } });

  expect(screen.getByText("Texas")).toBeInTheDocument();
});
