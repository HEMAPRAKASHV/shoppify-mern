import { Request, Response } from 'express';
import { get_All_Products } from '../../controllers/prodController';
import { allProducts } from '../../service/prodService';


jest.mock('../../service/prodService');

describe('Product Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;
  let sendMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    sendMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock, send: sendMock });
    res = { status: statusMock, send: sendMock };
  });

  describe('get_All_Products', () => {
    it('should return all products with status 201', async () => {
      const mockProducts = [
        { _id: 'product1', name: 'Product 1', price: 100 },
        { _id: 'product2', name: 'Product 2', price: 200 },
      ];

      (allProducts as jest.Mock).mockResolvedValue(mockProducts);

      req = {};

      await get_All_Products(req as Request, res as Response);

      expect(allProducts).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(mockProducts);
    });

    it('should handle errors', async () => {
      (allProducts as jest.Mock).mockRejectedValue(new Error('Internal Server Error'));

      req = {};

      await get_All_Products(req as Request, res as Response);

      expect(allProducts).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(sendMock).toHaveBeenCalledWith('Internal Server Error');
    });
  });
});


