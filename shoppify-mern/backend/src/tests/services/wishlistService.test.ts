import { User } from '../../models/userModel';
import { addToWishlist, getWishListItems } from '../../service/wishlistService';

jest.mock('../models/userModel');

describe('Wishlist Service', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  describe('addToWishlist', () => {
    it('should add a product to the wishlist successfully', async () => {
      const mockUser = {
        _id: 'user1',
        wishlist: [],
        save: jest.fn().mockResolvedValue(true),
      };

      (User.findById as jest.Mock).mockResolvedValue(mockUser);

      const result = await addToWishlist('user1', 'product1');

      expect(User.findById).toHaveBeenCalledWith('user1');
      expect(mockUser.save).toHaveBeenCalled();
      expect(result).toEqual({
        message: 'Product added to Wishlist successfully',
        data: ['product1'],
      });
    });

    it('should remove a product from the wishlist successfully', async () => {
      const mockUser = {
        _id: 'user1',
        wishlist: ['product1'],
        save: jest.fn().mockResolvedValue(true),
      };

      (User.findById as jest.Mock).mockResolvedValue(mockUser);

      const result = await addToWishlist('user1', 'product1');

      expect(User.findById).toHaveBeenCalledWith('user1');
      expect(mockUser.save).toHaveBeenCalled();
      expect(result).toEqual({
        message: 'Product removed from Wishlist successfully',
        data: [],
      });
    });

    it('should throw an error if the user is not found', async () => {
      (User.findById as jest.Mock).mockResolvedValue(null);

      await expect(addToWishlist('user1', 'product1')).rejects.toThrow('User not found');
    });
  });

  describe('getWishListItems', () => {
    it('should get all items in the wishlist successfully', async () => {
      const mockUser = {
        _id: 'user1',
        wishlist: ['product1', 'product2'],
      };

      (User.findById as jest.Mock).mockResolvedValue(mockUser);

      const result = await getWishListItems('user1');

      expect(User.findById).toHaveBeenCalledWith('user1');
      expect(result).toEqual(['product1', 'product2']);
    });

    it('should throw an error if the user is not found', async () => {
      (User.findById as jest.Mock).mockResolvedValue(null);

      await expect(getWishListItems('user1')).rejects.toThrow('User not found');
    });
  });
});
