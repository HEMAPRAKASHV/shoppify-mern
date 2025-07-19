import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../../pages/Login";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { jest } from "@jest/globals";
import { LOGIN_REQUEST } from "../../constants/app.constants";
import '@testing-library/jest-dom'; 

// Mock Redux store
const mockStore = configureStore();
const store = mockStore({
    auth: { user: null, token: null, loading: false, error: null },
});

// Mock Redux dispatch
jest.mock("react-redux", () => ({
    useDispatch: () => jest.fn(),
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate,
}));

describe("Login Component", () => {
    beforeEach(() => {
        store.clearActions();
        jest.clearAllMocks();
    });

    test("renders the login form", () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        // Check if form fields exist
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    });

    test("validates form fields", async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        // Click submit button without filling fields
        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        // Wait for validation errors
        expect(await screen.findByText("Email is required")).toBeInTheDocument();
        expect(await screen.findByText("Password is required")).toBeInTheDocument();
    });

    test("dispatches LOGIN_REQUEST action and navigates on success", async () => {
        const mockDispatch = jest.fn();
        jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(mockDispatch);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        // Fill in login form
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "user@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: "password123" },
        });

        // Click login button
        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        // Ensure LOGIN_REQUEST action is dispatched
        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledWith({
                type: LOGIN_REQUEST,
                payload: { credentials: { email: "user@example.com", password: "password123" }, callback: expect.any(Function) },
            });
        });

        // Simulate successful login callback
        const callback = (mockDispatch.mock.calls[0][0] as any).payload.callback;
        callback(true, null);

        // Ensure navigation to "/store"
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/store");
        });
    });

    test("displays error for incorrect credentials", async () => {
        const mockDispatch = jest.fn();
        jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(mockDispatch);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "wronguser@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: "wrongpassword" },
        });

        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        // Simulate login failure callback
        const callback = (mockDispatch.mock.calls[0][0] as any).payload.callback;
        callback(false, { response: { status: 401 } });

        // Ensure error message appears
        await waitFor(() => {
            expect(screen.getByText(/Wrong credentials../i)).toBeInTheDocument();
        });
    });

    test("handles unexpected server error", async () => {
        const mockDispatch = jest.fn();
        jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(mockDispatch);

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "user@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: "password123" },
        });

        fireEvent.click(screen.getByRole("button", { name: /login/i }));

        // Simulate unexpected error
        const callback = (mockDispatch.mock.calls[0][0] as any).payload.callback;
        callback(false, { response: { data: { message: "Server Error" } } });

        await waitFor(() => {
            expect(screen.getByText(/Server Error/i)).toBeInTheDocument();
        });
    });
});