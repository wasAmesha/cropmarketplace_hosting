import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/Register/RegisterPage";

describe("RegisterPage Component", () => {
  test("renders RegisterPage component", () => {
    render(
      <BrowserRouter initialEntries={["/register"]}>
        <RegisterPage />
      </BrowserRouter>
    );
    const registerPageText = screen.getByText(/Let Us Know You/i);
    expect(registerPageText).toBeInTheDocument();
  });

  test("form submission with valid data", async () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByTestId("user-role"), {
      target: { value: "Farmer" },
    });
    fireEvent.change(screen.getByTestId("First name"), {
      target: { value: "Sunil" },
    });
    fireEvent.change(screen.getByTestId("Last name"), {
      target: { value: "Abaya" },
    });
    fireEvent.change(screen.getByTestId("Enter email"), {
      target: { value: "sunil16778672@gmail.com" },
    });
    fireEvent.change(screen.getByTestId("Enter password"), {
      target: { value: "sunil12345" },
    });
    fireEvent.change(screen.getByTestId("district-select"), {
      target: { value: "Colombo" },
    });

    const submitButton = screen.getByRole("button", { name: /Sign Up/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.location.pathname).toEqual("/");
    });
  });
});
