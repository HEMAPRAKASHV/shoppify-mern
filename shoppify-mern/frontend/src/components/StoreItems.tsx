import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { products } from "../types";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../context/AddWishlistContext";

const StoreItem: React.FC<products> = ({ _id, name, price, imageUrl }) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const { wishlistItems, addremoveWishlist } = useWishlist();
  const quantity = getItemQuantity(_id);
  console.log("Store cards rendered");

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white h-100 w-64"> {/* Fixed width */}
      {/* Product Image */}
      <div className="relative group flex justify-center items-center">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-[200px] object-cover rounded-t-lg"
        />
        {wishlistItems.includes(_id) ? (
          <button
            className="absolute top-2 right-2 bg-transparent border-none"
            onClick={() => addremoveWishlist(_id)}
          >
            <FaHeart
              color="red"
              className="text-white text-2xl transition-opacity duration-300 cursor-pointer"
            />
          </button>
        ) : (
          <button
            className="absolute top-2 right-2 bg-transparent border-none"
            onClick={() => addremoveWishlist(_id)}
          >
            <FaRegHeart
              color="black"
              className="text-white text-2xl transition-opacity duration-300 cursor-pointer"
            />
          </button>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col">
        <div className="flex justify-between items-baseline mb-4">
          <span className="text-lg font-bold">{name}</span>
          <span className="text-lg text-gray-500">{formatCurrency(price)}</span>
        </div>

        <div className="mt-auto">
          {quantity === 0 ? (
            <button
              onClick={() => increaseCartQuantity(_id)}
              className="w-full bg-blue-500"
            >
              + Add To Cart
            </button>
          ) : (
            <div
              className="d-flex items-center flex-col"
              style={{ gap: ".5rem" }}
            >
              <div
                className="flex items-center justify-center"
                style={{ gap: ".5rem" }}
              >
                <button
                  onClick={() => decreaseCartQuantity(_id)}
                  className="bg-blue-500"
                >
                  -
                </button>
                <div>
                  <span className="text-2xl">{quantity}</span> in cart
                </div>
                <button
                  onClick={() => increaseCartQuantity(_id)}
                  className="bg-blue-500"
                >
                  +
                </button>
              </div>
              <div
                className="flex items-center justify-center mt-3"
                style={{ gap: ".5rem" }}
              >
                <button
                  onClick={() => removeFromCart(_id)}
                  className="bg-red-500 text-white text-sm px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreItem;

