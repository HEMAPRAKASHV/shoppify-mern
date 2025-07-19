import { createOrder, getOrders } from '../../service/orderService';
import Order from '../../models/orderModel';
import { User } from '../../models/userModel';
import Product from '../../models/productModel';

jest.mock('../../models/orderModel');
jest.mock('../../models/userModel');
jest.mock('../../models/productModel');

describe('Order Service', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  describe('createOrder', () => {
    it('should create a new order successfully', async () => {
      const mockProduct = { _id: 'product1', name: 'Product 1', price: 100 };
      const mockUser = { _id: 'user1', cart: [], save: jest.fn().mockResolvedValue(true) };
      const mockOrder = { _id: 'order1', user: 'user1', products: [], totalAmount: 100, status: 'Pending', save: jest.fn().mockResolvedValue(true) };

      (Product.findById as jest.Mock).mockResolvedValue(mockProduct);
      (User.findById as jest.Mock).mockResolvedValue(mockUser);
      (Order.prototype.save as jest.Mock).mockImplementation(() => mockOrder.save());

      const result = await createOrder('user1', [{ product: 'product1', quantity: 1 }]);

      expect(Product.findById).toHaveBeenCalledWith('product1');
      expect(User.findById).toHaveBeenCalledWith('user1');
      expect(Order.prototype.save).toHaveBeenCalled();
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('user1', { cart: [] });
      expect(result).toEqual(mockOrder);
    });

    it('should throw an error if the product is not found', async () => {
      (Product.findById as jest.Mock).mockResolvedValue(null);

      await expect(createOrder('user1', [{ product: 'product1', quantity: 1 }])).rejects.toThrow('Product not found');
    });

    it('should throw an error if the user is not found', async () => {
      (User.findById as jest.Mock).mockResolvedValue(null);

      await expect(createOrder('user1', [{ product: 'product1', quantity: 1 }])).rejects.toThrow('User not found');
    });
  });

  describe('getOrders', () => {
    it('should get all orders for a user successfully', async () => {
      const mockOrders = [{ _id: 'order1', user: 'user1', products: [], totalAmount: 100, status: 'Pending' }];

      (Order.find as jest.Mock).mockResolvedValue(mockOrders);

      const result = await getOrders('user1');

      expect(Order.find).toHaveBeenCalledWith({ user: 'user1' });
      expect(result).toEqual(mockOrders);
    });

    it('should throw an error if no orders are found', async () => {
      (Order.find as jest.Mock).mockResolvedValue(null);

      await expect(getOrders('user1')).rejects.toThrow('No Orders Found');
    });
  });
});
