import { addToCart, removesingleProd, removeFromCart, getCartItems } from '../../service/cartService';
import { User } from '../../models/userModel';

jest.mock('../../models/userModel');

describe('Cart Service', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  describe('addToCart', () => {
    it('should add a product to the cart successfully', async () => {
      const mockUser = {
        _id: 'user1',
        cart: [],
        save: jest.fn().mockResolvedValue(true),
      };

      (User.findById as jest.Mock).mockResolvedValue(mockUser);

      const result = await addToCart('user1', 'product1', 1);

      expect(User.findById).toHaveBeenCalledWith('user1');
      expect(mockUser.cart).toEqual([{ product: 'product1', quantity: 1 }]);
      expect(mockUser.save).toHaveBeenCalled();
      expect(result).toEqual(mockUser.cart);
    });

    it('should update the quantity if the product is already in the cart', async () => {
      const mockUser = {
        _id: 'user1',
        cart: [{ product: 'product1', quantity: 1 }],
        save: jest.fn().mockResolvedValue(true),
      };

      (User.findById as jest.Mock).mockResolvedValue(mockUser);

      const result = await addToCart('user1', 'product1', 2);

      expect(User.findById).toHaveBeenCalledWith('user1');
      expect(mockUser.cart).toEqual([{ product: 'product1', quantity: 3 }]);
      expect(mockUser.save).toHaveBeenCalled();
      expect(result).toEqual(mockUser.cart);
    });

    it('should throw an error if the user is not found', async () => {
      (User.findById as jest.Mock).mockResolvedValue(null);

      await expect(addToCart('user1', 'product1', 1)).rejects.toThrow('User not found');
    });
  });

  describe('removesingleProd', () => {
    it('should decrease the quantity of a product in the cart', async () => {
      const mockUser = {
        _id: 'user1',
        cart: [{ product: 'product1', quantity: 3 }],
        save: jest.fn().mockResolvedValue(true),
      };

      (User.findById as jest.Mock).mockResolvedValue(mockUser);

      const result = await removesingleProd('user1', 'product1', 1);

      expect(User.findById).toHaveBeenCalledWith('user1');
      expect(mockUser.cart).toEqual([{ product: 'product1', quantity: 2 }]);
      expect(mockUser.save).toHaveBeenCalled();
      expect(result).toEqual(mockUser.cart);
    });

    it('should remove the product if the quantity becomes zero or less', async () => {
      const mockUser = {
        _id: 'user1',
        cart: [{ product: 'product1', quantity: 1 }],
        save: jest.fn().mockResolvedValue(true),
      };

      (User.findById as jest.Mock).mockResolvedValue(mockUser);

      const result = await removesingleProd('user1', 'product1', 1);

      expect(User.findById).toHaveBeenCalledWith('user1');
      expect(mockUser.cart).toEqual([]);
      expect(mockUser.save).toHaveBeenCalled();
      expect(result).toEqual(mockUser.cart);
    });

    it('should throw an error if the user is not found', async () => {
      (User.findById as jest.Mock).mockResolvedValue(null);

      await expect(removesingleProd('user1', 'product1', 1)).rejects.toThrow('User not found');
    });
  });

  describe('removeFromCart', () => {
    it('should remove a product from the cart successfully', async () => {
      const mockUser = {
        _id: 'user1',
        cart: [{ product: 'product1', quantity: 1 }],
        save: jest.fn().mockResolvedValue(true),
      };

      (User.findById as jest.Mock).mockResolvedValue(mockUser);

      const result = await removeFromCart('user1', 'product1');

      expect(User.findById).toHaveBeenCalledWith('user1');
      expect(mockUser.cart).toEqual([]);
      expect(mockUser.save).toHaveBeenCalled();
      expect(result).toEqual(mockUser.cart);
    });

    it('should throw an error if the product is not found in the cart', async () => {
      const mockUser = {
        _id: 'user1',
        cart: [],
        save: jest.fn().mockResolvedValue(true),
      };

      (User.findById as jest.Mock).mockResolvedValue(mockUser);

      await expect(removeFromCart('user1', 'product1')).rejects.toThrow('Product not found in cart');
    });

    it('should throw an error if the user is not found', async () => {
      (User.findById as jest.Mock).mockResolvedValue(null);

      await expect(removeFromCart('user1', 'product1')).rejects.toThrow('User not found');
    });
  });

  describe('getCartItems', () => {
    it('should get all items in the cart successfully', async () => {
      const mockUser = {
        _id: 'user1',
        cart: [{ product: 'product1', quantity: 1 }],
      };

      (User.findById as jest.Mock).mockResolvedValue(mockUser);

      const result = await getCartItems('user1');

      expect(User.findById).toHaveBeenCalledWith('user1');
      expect(result).toEqual(mockUser.cart);
    });

    it('should throw an error if the user is not found', async () => {
      (User.findById as jest.Mock).mockResolvedValue(null);

      await expect(getCartItems('user1')).rejects.toThrow('User not found');
    });
  });
});
