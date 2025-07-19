import { useEffect, useState } from "react";
import { formatCurrency } from "../utilities/formatCurrency";
import { products } from "../types";
import { useWishlist } from "../context/AddWishlistContext";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers/rootReducer";

interface WishlistItemProps {
    product: string;
};

export const WishlistsItem: React.FC<WishlistItemProps> = ({ product }) => {
    const { addremoveWishlist } = useWishlist()
    const [products, setProducts] = useState<products[]>([]);
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

    console.log(products)

    const item: any = products.find((i) => i._id === product);

    if (products == null) return null;
    return (
        <div className="flex items-center gap-2">
            <img
                src={item?.imageUrl}
                alt={item?.name}
                className="w-32 h-20 object-cover"
            />
            <div className="flex-grow">
                <div>
                    {item?.name}{" "}
                </div>
                <div className="text-gray-500 text-sm">{formatCurrency(item?.price)}</div>
            </div>

            <button
                className="bg-red-500 text-white text-sm px-2 py-1 rounded"
                onClick={() => addremoveWishlist(item?._id)}
            >
                &times;
            </button>
        </div>
    );
};