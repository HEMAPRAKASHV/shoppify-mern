import { Request, Response } from 'express';
import { order_Product, get_all_orders } from '../../controllers/orderController';
import { createOrder, getOrders } from '../../service/orderService';

jest.mock('../../service/orderService');

describe('Order Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = { status: statusMock };
  });

  describe('order_Product', () => {
    it('should create a new order successfully', async () => {
      const mockOrder = { id: 'order1', userId: 'user1', products: [] };
      (createOrder as jest.Mock).mockResolvedValue(mockOrder);

      req = { body: { userId: 'user1', products: [] } };

      await order_Product(req as Request, res as Response);

      expect(createOrder).toHaveBeenCalledWith('user1', []);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(mockOrder);
    });

    it('should handle errors', async () => {
      (createOrder as jest.Mock).mockRejectedValue(new Error('Failed to create order'));

      req = { body: { userId: 'user1', products: [] } };

      await order_Product(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Failed to create order', error: new Error('Failed to create order') });
    });
  });

  describe('get_all_orders', () => {
    it('should get all orders for a user successfully', async () => {
      const mockOrders = [{ id: 'order1', userId: 'user1', products: [] }];
      (getOrders as jest.Mock).mockResolvedValue(mockOrders);

      req = { query: { userId: 'user1' } };

      await get_all_orders(req as Request, res as Response);

      expect(getOrders).toHaveBeenCalledWith('user1');
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockOrders);
    });

    it('should handle errors', async () => {
      (getOrders as jest.Mock).mockRejectedValue(new Error('Server Error'));

      req = { query: { userId: 'user1' } };

      await get_all_orders(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Server Error', error: new Error('Server Error') });
    });
  });
});
