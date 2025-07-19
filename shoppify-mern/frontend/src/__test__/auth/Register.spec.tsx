import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import Register from "../../pages/Register";
import { registerApi } from "../../api/service/authapi";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom'; 
 
// Mock the API module
jest.mock("../../api/service/authapi", () => ({
  registerApi: jest.fn(),
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}))
 
describe("Register Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock history before each test
  });

  test("registers a user successfully", async () => {
    // Mock API success response
    (registerApi as jest.Mock).mockResolvedValue({
      data: { message: "User registered successfully", data: "jack" },
      status: 201,
    });
 
    // Render component
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
 
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Middle Name/i), {
        target: { value: "" },
      });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "Test@123" },
    });
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: "Male" },
    });
 
    // Click the Register button
    fireEvent.click(screen.getByRole("button", { name: /Register/i }));
 
    // Wait for the success message
    await waitFor(() => {
      expect(screen.getByText(/Registered Successfully/i)).toBeInTheDocument();
    });
 
    // Ensure API was called with correct data
    expect(registerApi).toHaveBeenCalledWith({
      firstName: "John",
      middleName:"",
      lastName: "Doe",
      phone: "1234567890",
      email: "john@example.com",
      password: "Test@123",
      gender: "Male",
    });

    //Ensure Navigation happened
    expect(mockNavigate).toHaveBeenCalledWith("/login");

  });
 
  test("handles API failure", async () => {
    // Mock API failure response
    (registerApi as jest.Mock).mockRejectedValue({
      response: { data: { message: "Registration failed" }, status: 400 },
    });
 
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
 
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByLabelText(/Middle Name/i), {
        target: { value: "" },
      });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "9876543210" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "Test@123" },
    });
    fireEvent.change(screen.getByLabelText(/Gender/i), {
      target: { value: "Female" },
    });
 
    // Click the Register button
    fireEvent.click(screen.getByRole("button", { name: /Register/i }));
 
    // Wait for the failure handling
    await waitFor(() => {
      expect(screen.queryByText(/Registered Successfully/i)).not.toBeInTheDocument();
    });
 
    // Ensure API was called with correct data
    expect(registerApi).toHaveBeenCalledWith({
      firstName: "Jane",
      middleName:"",
      lastName: "Doe",
      phone: "9876543210",
      email: "jane@example.com",
      password: "Test@123",
      gender: "Female",
    });

    //Ensure Navigation not happened
    expect(mockNavigate).not.toHaveBeenCalledWith("/login");
  });
}); 