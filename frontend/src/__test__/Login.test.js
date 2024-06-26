import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../Login/Login";

describe("Login Component", () => {
  test("renders Login component", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const loginText = screen.getByText(/Welcome Back/i);
    expect(loginText).toBeInTheDocument();
  });

  test("form submission with valid data", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByTestId("Enter email"), {
      target: { value: "kumara123@gmail.com" },
    });

    fireEvent.change(screen.getByTestId("Enter password"), {
      target: { value: "123456" },
    });

    fireEvent.change(screen.getByTestId("role"), {
      target: { value: "Farmer" },
    });

    const submitButton = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(submitButton);

    // You can add assertions based on the expected behavior after form submission
    // For example, checking if an alert is displayed or if the page redirects
  });
});
