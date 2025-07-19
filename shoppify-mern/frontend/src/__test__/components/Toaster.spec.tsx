import { render, screen } from '@testing-library/react';
import { ToastContainer } from 'react-toastify';
import '@testing-library/jest-dom';
import { showToast } from '../../components/Toaster';  // Adjust the import path as necessary
import { act } from 'react';

describe('Toaster component', () => {
  it('should render the ToastContainer', () => {
    render(<ToastContainer />);
    const toastContainer = screen.getByLabelText('Notifications Alt+T');
    expect(toastContainer).toBeInTheDocument();
  });
});

describe('showToast function', () => {
  beforeEach(() => {
    render(<ToastContainer />);
  });

  it('should display a success toast', async () => {
    await act(async () => {
      showToast('Success message', 'success');
    });
    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  it('should display an error toast', async () => {
    await act(async () => {
      showToast('Error message', 'error');
    });
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('should display an info toast', async () => {
    await act(async () => {
      showToast('Info message', 'info');
    });
    expect(screen.getByText('Info message')).toBeInTheDocument();
  });

  it('should display a warning toast', async () => {
    await act(async () => {
      showToast('Warning message', 'warning');
    });
    expect(screen.getByText('Warning message')).toBeInTheDocument();
  });
});