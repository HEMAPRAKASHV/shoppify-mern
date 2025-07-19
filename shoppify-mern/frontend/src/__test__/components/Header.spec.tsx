import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Header from '../../components/common/Header';
import '@testing-library/jest-dom';
import { fireEvent, render } from "@testing-library/react";
import { LOGOUT_REQUEST } from '../../constants/app.constants';

const mockStore = configureStore([]);

describe('Header', () => {
    it('should render correctly when user is logged in', () => {
        const store = mockStore({
            auth: { isLoggedIn: true }
        });

        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );
        expect(getByText('Logout')).toBeInTheDocument();
    });

    it('should render correctly when user is not logged in', () => {
        const store = mockStore({
            auth: { isLoggedIn: false }
        });

        const { getByText, queryByText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );

        expect(getByText('Shoppify')).toBeInTheDocument();
        expect(getByText('Orders')).toBeInTheDocument();
        expect(queryByText('Logout')).not.toBeInTheDocument();
    });

    it('should call logout function when logout button is clicked', () => {
        const store = mockStore({
            auth: { isLoggedIn: true }
        });

        store.dispatch = jest.fn();

        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(getByText('Logout'));

        expect(store.dispatch).toHaveBeenCalledWith({ type: LOGOUT_REQUEST, payload: {} });
    });
});

