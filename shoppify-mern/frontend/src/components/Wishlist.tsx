import { useWishlist } from "../context/AddWishlistContext";
import { WishlistsItem } from "./WishlistItems"

type WishlistProps = {
    isOpen: Boolean
}

export const Wishlist: React.FC<WishlistProps> = ({ isOpen }) => {
    const { closeWishlist, wishlistItems } = useWishlist();
    console.log(wishlistItems)
    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            onClick={() => closeWishlist()}
        >
            <div
                className={`fixed right-0 top-0 h-full w-110 bg-white shadow-lg transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Wish Lists</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => closeWishlist()}
                    >
                        &times;
                    </button>
                </div>
                <div className="p-4 space-y-3">
                    {wishlistItems.map((item:string, index) => (
                        <WishlistsItem key={index}  product={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}