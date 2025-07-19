import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useSelector } from "react-redux";
import { removeCart, updatecart } from "../types";
import { getCarts, removefromCart, removesingleProd, updateCart } from "../api/service/cartapi";
import { showToast } from "../components/Toaster";

//types for the props of the ShoppingCartProviderProps
type ShoppingCartProviderProps = {
    children: ReactNode
}

//Types for items in the cart
export type cartItem = {
    product: string
    quantity: number
}

//Types for the context
type ShoppingCartContext = {
    openCart: () => void;
    closeCart: () => void;
    setcartItems: () => void;
    getItemQuantity: (id: string) => number;
    increaseCartQuantity: (id: string) => void;
    decreaseCartQuantity: (id: string) => void;
    removeFromCart: (id: string) => void;
    cartQuantity: number;
    cartItems: cartItem[]
}

//Creating a context with default values
const ShoppingCartContext = createContext({} as ShoppingCartContext)

//Custom hook to use the ShoppingCartContext
export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const reducerState: any = useSelector((state) => state);
    const userId = reducerState.auth.user?._id;
    console.log(userId)
    const email = reducerState.auth.user?.email;
    const [cartItems, setCartItems] = useState<cartItem[]>([])

    console.log(cartItems)

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
    )

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    async function setcartItems() {
        const allcarts = await getCarts(userId);
        if (allcarts.status === 200) {
            setCartItems(allcarts.data.data)
        } else {
            showToast(allcarts.data.message, "error");
        }
    }

    function getItemQuantity(product: string) {
        return cartItems.find(item => item.product === product)?.quantity || 0
    }

    async function increaseCartQuantity(product: string) {
        const payload: updatecart = {
            email: email,
            userId: userId,
            productId: product
        }
        const updatedCart = await updateCart(payload);
        if (updatedCart.status === 200) {
            setCartItems(updatedCart.data.data)
            showToast(updatedCart.data.message, "success");
        } else {
            showToast(updatedCart.data.message, "error");
        }
    }

    async function decreaseCartQuantity(product: string) {
        const payload: updatecart = {
            email: email,
            userId: userId,
            productId: product
        }
        const updatedCart = await removesingleProd(payload);
        if (updatedCart.status === 200) {
            setCartItems(updatedCart.data.data)
            showToast(updatedCart.data.message, "success");
        } else {
            showToast(updatedCart.data.message, "error");
        }
    }

    async function removeFromCart(product: string) {
        const payload: removeCart = {
            userId: userId,
            productId: product
        }
        const updatedCart = await removefromCart(payload);
        if (updatedCart.status === 200) {
            setCartItems(updatedCart.data.data)
            showToast(updatedCart.data.message, "success");
        } else {
            showToast(updatedCart.data.message, "error");
        }
    }

    //Provides the context values to the children components, including the ShoppingCart component.
    return <ShoppingCartContext.Provider
        value={
            {
                openCart,
                closeCart,
                setcartItems,
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                cartItems,
                cartQuantity
            }
        }
    >
        {children}
        <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
}