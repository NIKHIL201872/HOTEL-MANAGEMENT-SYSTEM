import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import ReservationForm from "./ReservationRegistration";

describe('ReservationForm Component', () => {
  
  it('renders all form fields', () => {
    render(<ReservationForm />);
    
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/check-in/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/check-out/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirm reservation/i })).toBeInTheDocument();
  });

  it('updates the total price based on selected dates', async () => {
    const user = userEvent.setup();
    render(<ReservationForm />);
    
    const checkInInput = screen.getByLabelText(/check-in/i);
    const checkOutInput = screen.getByLabelText(/check-out/i);

    // Initial state check
    expect(screen.getByText(/\$299/)).toBeInTheDocument();

    // Select dates 3 days apart
    await user.type(checkInInput, '2024-10-01');
    await user.type(checkOutInput, '2024-10-04');

    // 3 nights * $299 = $897
    expect(screen.getByText(/\$897/)).toBeInTheDocument();
    expect(screen.getByText(/3/)).toBeInTheDocument(); // 3 nights
  });

  it('disables submit button and shows error if check-out is before check-in', async () => {
    const user = userEvent.setup();
    render(<ReservationForm />);
    
    const checkInInput = screen.getByLabelText(/check-in/i);
    const checkOutInput = screen.getByLabelText(/check-out/i);

    // Select invalid dates (checkout before checkin)
    await user.type(checkInInput, '2024-10-05');
    await user.type(checkOutInput, '2024-10-01');

    const errorMsg = screen.getByText(/check-out must be after check-in/i);
    const submitBtn = screen.getByRole('button', { name: /confirm reservation/i });

    expect(errorMsg).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });

  it('shows success message upon valid submission', async () => {
    const user = userEvent.setup();
    render(<ReservationForm />);
    
    // Fill out required fields
    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '1234567890');
    await user.type(screen.getByLabelText(/check-in/i), '2024-10-01');
    await user.type(screen.getByLabelText(/check-out/i), '2024-10-05');

    const submitBtn = screen.getByRole('button', { name: /confirm reservation/i });
    expect(submitBtn).not.toBeDisabled();
    
    await user.click(submitBtn);

    expect(screen.getByText(/reservation details captured — you're all set/i)).toBeInTheDocument();
  });
});