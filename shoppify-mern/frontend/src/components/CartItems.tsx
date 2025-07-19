import { useEffect, useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { products } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers/rootReducer";

type CartItemProps = {
  product: string;
  quantity: number;
};

export const CartItem: React.FC<CartItemProps> = ({ product, quantity }) => {
  const { removeFromCart } = useShoppingCart();
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
          {quantity > 1 && (
            <span className="text-gray-500 text-xs">x{quantity}</span>
          )}
        </div>
        <div className="text-gray-500 text-sm">{formatCurrency(item?.price)}</div>
      </div>
      <div>{formatCurrency(item?.price * quantity)}</div>
      <button
        className="bg-red-500 text-white text-sm px-2 py-1 rounded"
        onClick={() => removeFromCart(item?._id)}
      >
        &times;
      </button>
    </div>
  );
};