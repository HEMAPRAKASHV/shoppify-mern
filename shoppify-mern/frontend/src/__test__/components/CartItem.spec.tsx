import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CartItem } from "../../components/CartItems";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import '@testing-library/jest-dom';

// Mock the shopping cart context
jest.mock("../../context/ShoppingCartContext", () => ({
  useShoppingCart: jest.fn(),
}));

// Mock formatCurrency function
jest.mock("../../utilities/formatCurrency", () => ({
  formatCurrency: jest.fn((value) => `$${value}`),
}));

describe("CartItem Component", () => {
  const mockRemoveFromCart = jest.fn();

  beforeEach(() => {
    (useShoppingCart as jest.Mock).mockReturnValue({
      removeFromCart: mockRemoveFromCart,
    });

    const mockProducts = [
      {
        _id: "1",
        name: "IPhone 16 Pro Max",
        price: 60000,
        imageUrl: "/image/iphone.png",
      },
      {
        _id: "2",
        name: "Samsung Smart TV",
        price: 90000,
        imageUrl: "/image/TV.jpg",
      },
      {
        _id: "3",
        name: "HP 15 11th GEN",
        price: 48500,
        imageUrl: "/image/hp.jpg",
      },
      {
        _id: "4",
        name: "Rich Dad Poor Dad",
        price: 500,
        imageUrl: "/image/book.jpeg",
      },
    ];

    localStorage.setItem("products", JSON.stringify(mockProducts));
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("renders product name, image, and price correctly", async () => {
    render(<CartItem product="1" quantity={2} />);

    await waitFor(() => {
      expect(screen.getByText(/IPhone 16 Pro Max/i)).toBeInTheDocument();
      expect(screen.getByRole("img")).toHaveAttribute("src", "/image/iphone.png");
      expect(screen.getByText("$60000")).toBeInTheDocument();
      expect(screen.getByText("$120000")).toBeInTheDocument();
    });
  });

  it("renders quantity correctly when greater than 1", () => {
    render(<CartItem product="2" quantity={2} />);

    expect(screen.getByText(/x2/i)).toBeInTheDocument();
  });

  it("calls removeFromCart when delete button is clicked", () => {
    render(<CartItem product="3" quantity={1} />);

    const removeButton = screen.getByRole("button", { name: /×/i });
    fireEvent.click(removeButton);

    expect(mockRemoveFromCart).toHaveBeenCalledWith("3");
  });

  it("displays correct total price", () => {
    render(<CartItem product="4" quantity={3} />);

    expect(screen.getByText("$1500")).toBeInTheDocument();
  });
});