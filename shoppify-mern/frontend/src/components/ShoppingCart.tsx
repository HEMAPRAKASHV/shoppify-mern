import { useEffect, useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItems";
import { formatCurrency } from "../utilities/formatCurrency";
import { products } from "../types";
import { orderProduct } from "../api/service/orderapi";
import { useSelector } from "react-redux";
import { showToast } from "./Toaster";
import { RootState } from "../store/reducers/rootReducer";

type ShoppingCartProps = {
    isOpen: Boolean;
};

export const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen }) => {
    const { closeCart, cartItems, setcartItems } = useShoppingCart();
    const [products, setProducts] = useState<products[]>([]);
    const reducerState: any = useSelector((state) => state);
    const userId = reducerState.auth.user?._id;
    const allProducts: any = useSelector((state: RootState) => state.product.products);

    useEffect(() => {
        const fetchProducts = () => {
            setProducts(allProducts);
        }
        if (allProducts) {
            fetchProducts();
        } else {
            setProducts([]);
        }
    }, [allProducts]);

    console.log(cartItems)

    async function order(products: any) {
        const payload: any = { userId: userId, products }
        const response = await orderProduct(payload);
        if (response.status == 201) {
            showToast("Orders booked successfully", "success");
            setcartItems()
            closeCart()
        }
        else {
            showToast("Some thing went wrong. Please try again later", "error");
            closeCart()
        }
    }

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            onClick={() => closeCart()}
        >
            <div
                className={`fixed right-0 top-0 h-full w-110 bg-white shadow-lg transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Cart</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => closeCart()}
                    >
                        &times;
                    </button>
                </div>
                <div className="p-4 space-y-3">
                    {cartItems.map((item) => (
                        <CartItem key={item.product} {...item} />
                    ))}
                    <div className="ml-auto font-bold text-lg">
                        Total {formatCurrency(cartItems.reduce((total, CartItem) => {
                            console.log(CartItem)
                            const item = products.find(i => i._id === CartItem.product);
                            return total + (item?.price || 0) * CartItem.quantity;
                        }, 0))}
                    </div>
                    {cartItems.length != 0 && <button onClick={() => order(cartItems)} className="bg-red-500 text-white text-sm px-2 py-1 rounded">Order Now</button>}
                </div>
            </div>
        </div>
    );
};