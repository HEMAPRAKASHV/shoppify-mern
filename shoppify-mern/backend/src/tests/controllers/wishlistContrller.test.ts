import { Request, Response } from 'express';
import { update_Wishlist, get_Wish_Lists } from '../../controllers/wishlistController';
import { addToWishlist, getWishListItems } from '../../service/wishlistService';

jest.mock('../../service/wishlistService');

describe('Wishlist Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = { status: statusMock };
  });

  describe('update_Wishlist', () => {
    it('should update the wishlist successfully', async () => {
      const mockWishlist = { items: [] };
      (addToWishlist as jest.Mock).mockResolvedValue(mockWishlist);

      req = { body: { userId: 'user1', productId: 'product1' } };

      await update_Wishlist(req as Request, res as Response);

      expect(addToWishlist).toHaveBeenCalledWith('user1', 'product1');
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockWishlist);
    });

    it('should handle errors', async () => {
      (addToWishlist as jest.Mock).mockRejectedValue(new Error('Server Error'));

      req = { body: { userId: 'user1', productId: 'product1' } };

      await update_Wishlist(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Server Error', error: new Error('Server Error') });
    });
  });

  describe('get_Wish_Lists', () => {
    it('should get all wishlist items successfully', async () => {
      const mockWishlist = { items: [] };
      (getWishListItems as jest.Mock).mockResolvedValue(mockWishlist);

      req = { query: { userId: 'user1' } };

      await get_Wish_Lists(req as Request, res as Response);

      expect(getWishListItems).toHaveBeenCalledWith('user1');
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockWishlist);
    });

    it('should handle errors', async () => {
      (getWishListItems as jest.Mock).mockRejectedValue(new Error('Server Error'));

      req = { query: { userId: 'user1' } };

      await get_Wish_Lists(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Server Error', error: new Error('Server Error') });
    });
  });
});
