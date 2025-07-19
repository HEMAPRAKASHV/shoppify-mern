import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Store from '../../pages/Store';
import { useShoppingCart } from '../../context/ShoppingCartContext'; 
import { useWishlist } from '../../context/AddWishlistContext';
import { getProducts } from '../../api/service/productapi';
import '@testing-library/jest-dom'; 

jest.mock('../../context/ShoppingCartContext');
jest.mock('../../context/AddWishlistContext');
jest.mock('../../api/service/cartapi');

const mockStore = configureStore([]);
describe('Store', () => {
    beforeEach(() => {
        (useShoppingCart as jest.Mock).mockReturnValue({
            setcartItems: jest.fn(),
        });
        (useWishlist as jest.Mock).mockReturnValue({
            setWishlist: jest.fn(),
        });
        (getProducts as jest.Mock).mockResolvedValue({
            data: {
                products: [
                    { id: '1', name: 'Product 1' },
                    { id: '2', name: 'Product 2' },
                ],
            },
        });
    });

    it('should render correctly and fetch products', async () => {
        const store = mockStore({});

        render(
            <Provider store={store}>
                <Store />
            </Provider>
        );

        expect(screen.getByText('Store')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();

        // Wait for products to be fetched and rendered
        expect(await screen.findByText('Product 1')).toBeInTheDocument();
        expect(await screen.findByText('Product 2')).toBeInTheDocument();
    });
});