import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { useAuthStore } from '../store/authStore';

// Mock the Zustand store
vi.mock('../store/authStore', () => ({
  useAuthStore: vi.fn(),
}));

// Mock react-router-dom's useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Login Component', () => {
  const mockLogin = vi.fn();
  const mockClearError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mock implementation for the store
    useAuthStore.mockImplementation((selector) => {
      const store = {
        login: mockLogin,
        isLoading: false,
        error: null,
        clearError: mockClearError,
      };
      return selector(store);
    });
  });

  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('renders login form elements correctly', () => {
    renderWithRouter(<Login />);
    
    expect(screen.getByRole('heading', { name: /sign in to continue/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in as user/i })).toBeInTheDocument();
  });

  it('shows validation errors when submitting with empty or invalid fields', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Login />);
    
    const submitBtn = screen.getByRole('button', { name: /sign in as user/i });
    
    // Button should be disabled initially due to canSubmit logic
    expect(submitBtn).toBeDisabled();

    // Type invalid email and short password
    await user.type(screen.getByLabelText(/email address/i), 'invalidemail');
    await user.type(screen.getByLabelText(/password/i), '123');
    
    // Simulate form submission to trigger 'touched' state
    fireEvent.submit(screen.getByRole('button', { name: /sign in as user/i }));

    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
  });

  it('calls login function and navigates on successful submission', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValue({ success: true, role: 'user' });
    
    renderWithRouter(<Login />);
    
    await user.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    
    const submitBtn = screen.getByRole('button', { name: /sign in as user/i });
    expect(submitBtn).not.toBeDisabled();
    
    await user.click(submitBtn);
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        role: 'user',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    });
  });
});