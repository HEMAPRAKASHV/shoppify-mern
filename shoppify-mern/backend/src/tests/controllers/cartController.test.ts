import { Request, Response } from 'express';
import { update_Cart, remove_single_Prod, remove_From_Cart, get_Cart_Items } from '../../controllers/cartController';
import { addToCart, getCartItems, removeFromCart, removesingleProd } from '../../service/cartService';

jest.mock('../../service/cartService');

describe('Cart Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = { status: statusMock };
  });

  describe('update_Cart', () => {
    it('should update the cart successfully', async () => {
      const mockCart = { items: [] };
      (addToCart as jest.Mock).mockResolvedValue(mockCart);

      req = { body: { userId: 'user1', productId: 'product1', quantity: 1 } };

      await update_Cart(req as Request, res as Response);

      expect(addToCart).toHaveBeenCalledWith('user1', 'product1', 1);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockCart);
    });

    it('should handle errors', async () => {
      (addToCart as jest.Mock).mockRejectedValue(new Error('Server Error'));

      req = { body: { userId: 'user1', productId: 'product1', quantity: 1 } };

      await update_Cart(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Server Error', error: new Error('Server Error') });
    });
  });

  describe('remove_single_Prod', () => {
    it('should remove a single product from the cart successfully', async () => {
      const mockCart = { items: [] };
      (removesingleProd as jest.Mock).mockResolvedValue(mockCart);

      req = { body: { userId: 'user1', productId: 'product1', quantity: 1 } };

      await remove_single_Prod(req as Request, res as Response);

      expect(removesingleProd).toHaveBeenCalledWith('user1', 'product1', 1);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockCart);
    });

    it('should handle errors', async () => {
      (removesingleProd as jest.Mock).mockRejectedValue(new Error('Server Error'));

      req = { body: { userId: 'user1', productId: 'product1', quantity: 1 } };

      await remove_single_Prod(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Server Error', error: new Error('Server Error') });
    });
  });

  describe('remove_From_Cart', () => {
    it('should remove a product from the cart successfully', async () => {
      const mockCart = { items: [] };
      (removeFromCart as jest.Mock).mockResolvedValue(mockCart);

      req = { body: { userId: 'user1', productId: 'product1' } };

      await remove_From_Cart(req as Request, res as Response);

      expect(removeFromCart).toHaveBeenCalledWith('user1', 'product1');
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockCart);
    });

    it('should handle errors', async () => {
      (removeFromCart as jest.Mock).mockRejectedValue(new Error('Server Error'));

      req = { body: { userId: 'user1', productId: 'product1' } };

      await remove_From_Cart(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Server Error', error: new Error('Server Error') });
    });
  });

  describe('get_Cart_Items', () => {
    it('should get all items in the cart successfully', async () => {
      const mockCart = { items: [] };
      (getCartItems as jest.Mock).mockResolvedValue(mockCart);

      req = { query: { userId: 'user1' } };

      await get_Cart_Items(req as Request, res as Response);

      expect(getCartItems).toHaveBeenCalledWith('user1');
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockCart);
    });

    it('should handle errors', async () => {
      (getCartItems as jest.Mock).mockRejectedValue(new Error('Server Error'));

      req = { query: { userId: 'user1' } };

      await get_Cart_Items(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Server Error', error: new Error('Server Error') });
    });
  });
});
