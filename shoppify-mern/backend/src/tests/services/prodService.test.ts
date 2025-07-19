import Product from '../../models/productModel';
import { allProducts } from '../../service/prodService';

jest.mock('../models/productModel');

describe('Product Service', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  describe('allProducts', () => {
    it('should retrieve all products successfully', async () => {
      const mockProducts = [
        { _id: 'product1', name: 'Product 1', price: 100 },
        { _id: 'product2', name: 'Product 2', price: 200 },
      ];

      (Product.find as jest.Mock).mockResolvedValue(mockProducts);

      const result = await allProducts();

      expect(Product.find).toHaveBeenCalled();
      expect(result).toEqual({
        message: 'Products retrieved successfully',
        products: mockProducts,
      });
    });

    it('should handle errors', async () => {
      (Product.find as jest.Mock).mockRejectedValue(new Error('Database Error'));

      await expect(allProducts()).rejects.toThrow('Something went wrong');
    });
  });
});
