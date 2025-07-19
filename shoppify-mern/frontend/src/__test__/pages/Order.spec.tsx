import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom';
import { useSelector } from "react-redux";
import { getOrders } from "../../api/service/orderapi";
import Order from "../../pages/Order";

// Mock the useSelector
jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
}));

// Mock the getOrder API call
jest.mock("../../api/service/orderapi", () => ({
    getOrders: jest.fn(),
}));

// Mock the useNavigate function
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("Store Component", () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        (useSelector as unknown as jest.Mock).mockReturnValue({
            auth: {
                user: {
                    _id: "1"
                }
            }
        });

        (getOrders as jest.Mock).mockResolvedValue({
            data: [
                {
                    _id: "1",
                    user: "user1",
                    products: [
                        {
                            name: "Samsung Smart TV",
                            product: "product1",
                            quantity: 1,
                            _id: "productID1"
                        }
                    ],
                    totalAmount: 90000,
                    status: "Pending",
                    __v: 0
                }
            ]
        });

        (require("react-router-dom").useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    screen.debug();

    it("renders orders correctly", async () => {
        render(
            <Router>
                <Order/>
            </Router>
        );

        await waitFor(() => {
            expect(screen.getByText((content) => content.includes("Samsung Smart TV"))).toBeInTheDocument();
        });
    });

    it("navigates back when the back button is clicked", () => {
        render(
            <Router>
                <Order/>
            </Router>
        );

        const backButton = screen.getByText(/Back/i);
        fireEvent.click(backButton);

        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
});