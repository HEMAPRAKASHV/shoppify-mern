import { productItem } from "../types";
import { formatCurrency } from "../utilities/formatCurrency";

interface OrdersProps {
  productItem: productItem;
}

const Orders: React.FC<OrdersProps> = ({ productItem }) => {
  const { product, quantity } = productItem;
  const totalPrice = product.price * quantity; 

  return (
    <div className="border rounded-lg shadow-md p-4 bg-gray-50 hover:shadow-lg transition duration-300">
      <div className="flex flex-col items-center text-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-3"
        />
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          {product.name}
        </h2>
        <p className="text-sm text-gray-500 mb-1">Quantity: {quantity}</p>
        <p className="text-sm text-gray-500">
          Price: {formatCurrency(product.price)} × {quantity} ={" "}
          <span className="font-bold text-green-600">
            {formatCurrency(totalPrice) }
          </span>
        </p>
      </div>
    </div>
  );
};

export default Orders;
