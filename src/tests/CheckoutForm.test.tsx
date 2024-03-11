import { describe, beforeEach, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import CheckoutForm from '../components/CheckoutForm';

describe('CheckoutForm Component Tests', () => {
  beforeEach(async () => {
    // Wrap the component in MemoryRouter during testing
    render(
      <MemoryRouter>
        <CheckoutForm />
      </MemoryRouter>
    );
  });

  it('renders CheckoutForm component', async () => {
    // Verify that the form elements are rendered
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    // Add similar checks for other form elements
  });

  it('validates form submission with invalid input', async () => {
    // Submit the form without filling in any fields
    fireEvent.click(screen.getByText('Submit'));

    // Verify that error messages are displayed for required fields
    expect(screen.getByText('First Name is required')).toBeInTheDocument();
    expect(screen.getByText('Last Name is required')).toBeInTheDocument();
    // Add similar checks for other required fields
  });
  // Add more test cases for different scenarios, such as specific validation errors, edge cases, etc.
});
