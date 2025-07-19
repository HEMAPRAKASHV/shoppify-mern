import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { WishlistsItem } from "../../components/WishlistItems";
import '@testing-library/jest-dom';
import { useWishlist } from "../../context/AddWishlistContext";

// Mock the wishlist context
jest.mock("../../context/AddWishlistContext", () => ({
    useWishlist: jest.fn(),
}));

describe("WishlistItems Component", () => {
    const mockAddRemoveWishlists = jest.fn();
    beforeEach(() => {
        (useWishlist as jest.Mock).mockReturnValue({
            addremoveWishlist: mockAddRemoveWishlists
        })

        const productsforWishlists = [
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
        ]

        localStorage.setItem("products", JSON.stringify(productsforWishlists))

    })

    afterEach(() => {
        localStorage.clear();
        jest.clearAllMocks()
    })

    it("renders product name, image", async () => {
        render(<WishlistsItem product="1" />)

        await waitFor(() => {
            expect(screen.getByText(/IPhone 16 Pro Max/i)).toBeInTheDocument();
            expect(screen.getByRole("img")).toHaveAttribute("src", "/image/iphone.png");
            expect(screen.getByText("₹60,000.00")).toBeInTheDocument();
        })
    })

    it("Calls addremoveWishlist when delete button is clicked", () => {
        render(<WishlistsItem product="3" />);

        const removeButton = screen.getByRole("button", { name: /×/i });
        fireEvent.click(removeButton)

        expect(mockAddRemoveWishlists).toHaveBeenCalledWith("3")
    })
})