import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProtectedRoute from '../../routes/ProtectedRoute';
import '@testing-library/jest-dom'; 

const mockStore = configureStore([]);

describe('ProtectedRoute', () => {
    it('should navigate to login page when user is not logged in', () => {
        const store = mockStore({
            auth: { isLoggedIn: false }
        });

        const { queryByText } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/protected']}>
                    <ProtectedRoute element={<div>Protected Content</div>} />
                </MemoryRouter>
            </Provider>
        );

        expect(queryByText('Protected Content')).not.toBeInTheDocument();
    });
});
