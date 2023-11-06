import { render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";

const mockDispatch = jest.fn();

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

test("render login component", () => {
  useDispatch.mockReturnValue(mockDispatch);
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
});

// test("username and pasword matching", () => {
//   render(
//     <BrowserRouter>
//       <Login />
//     </BrowserRouter>
//   );
// });
