import { createContext, ReactNode, useContext, useState } from "react";
import { Wishlist } from "../components/Wishlist";
import { useSelector } from "react-redux";
import { removeCart } from "../types";
import { getWishlist, updateWishlist } from "../api/service/wishlistapi";
import { showToast } from "../components/Toaster";

type WishlistProviderProps = {
    children: ReactNode
}

export type wishlists = {
    product: string
}

type WishlistContext = {
    openWishlist: () => void;
    closeWishlist: () => void;
    setWishlist: () => void;
    addremoveWishlist: (id: string) => void;
    wishlistQuantity: number;
    wishlistItems: string[]
}

const WishlistContext = createContext({} as WishlistContext)

export function useWishlist() {
    return useContext(WishlistContext)
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const reducerState: any = useSelector((state) => state);
    const userId = reducerState.auth.user?._id;
    const [wishlistItems, setItems] = useState<string[]>([]);

    const wishlistQuantity = wishlistItems.length;

    const openWishlist = () => setIsOpen(true);
    const closeWishlist = () => setIsOpen(false);

    async function setWishlist() {
        const allwishlists = await getWishlist(userId);
        if (allwishlists.status === 200) {
            setItems(allwishlists.data.data)
        } else {
            showToast(allwishlists.data.message, "error");
        }
    }

    async function addremoveWishlist(product: string) {
        const payload: removeCart = {
            userId: userId,
            productId: product
        }
        const updatedWishlist = await updateWishlist(payload);
        if (updatedWishlist.status === 200) {
            setItems(updatedWishlist.data.data.data)
            showToast(updatedWishlist.data.data.message, "success");
        } else {
            showToast(updatedWishlist.data.data.message, "error");
        }
    }

    return <WishlistContext.Provider
        value={
            {
                openWishlist,
                closeWishlist,
                setWishlist,
                addremoveWishlist,
                wishlistQuantity,
                wishlistItems
            }
        }
    >
        {children}
        <Wishlist isOpen={isOpen} />
    </WishlistContext.Provider>
}
