import React, { Dispatch } from 'react';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartList from '../components/CartComponents/CartList';
import products from '../data/products.json';
import { CartActions, CartState } from '../types/types';
import { CartDispatchContext, CartStateContext } from '../Context/appContext';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../hooks/useFetchProducts', () => ({
  useFetchProducts: () => {}  // Mock implementation that does nothing
}));

const initialCartItems = products.slice(0, 2).map((product) => ({
  product,
  quantity: 1,
  giftWrap: false,
}));

const mockDispatch = vi.fn();

const MockCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = React.useState<CartState['cartItems']>(initialCartItems);

  const handleDelete: Dispatch<CartActions> = (action: CartActions) => {
    if (action.type === 'REMOVE_FROM_CART') {
      setCartItems(currentItems => currentItems.filter(item => item.product.id !== action.payload));
      mockDispatch();  // Simulate dispatch call
    }
  };

  return (
    <CartDispatchContext.Provider value={handleDelete}>
      <CartStateContext.Provider value={{ products, cartItems }}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

describe('CartList Component Tests', () => {
  beforeEach(async () => {
    render(
      <MemoryRouter>
        <MockCartProvider>
          <CartList />
        </MockCartProvider>
      </MemoryRouter>
    );
  });

  it('renders initial cart items and checks total price', async () => {
    for (const item of initialCartItems) {
      expect(screen.getByText(item.product.name)).toBeInTheDocument();
    }

    const totalPriceElement = screen.getByText(/Total købes for:/i);
    expect(totalPriceElement).toBeInTheDocument();
  });

  it('allows deleting an item', async () => {
    const user = userEvent.setup();
    const deleteButtons = screen.getAllByText('X'); // Assuming 'X' is used for deleting items
    await user.click(deleteButtons[0]);
    await waitFor(() => { // Wait for updates after state change
      const updatedDeleteButtons = screen.getAllByText('X');
      expect(updatedDeleteButtons.length).toBeLessThan(deleteButtons.length);
    });
  });

  it('validates total price calculation', async () => {
    // Find the element that contains the total price
    const totalPriceElement = document.getElementById('total-price-before-discount');
  
    // Extract the total price from the element's text content
    const totalSumText = totalPriceElement?.textContent || '';
    const totalSumValue = parseFloat(totalSumText.replace(/[^\d.-]/g, '') || '0');
  
    const expectedTotal = initialCartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    expect(totalSumValue).toBeCloseTo(expectedTotal, 0.005);
  });
});