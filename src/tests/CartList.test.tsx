import { describe, beforeEach, it, expect } from 'vitest';
import { Product  } from '../types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartList from '../CartList';
import productsData from '../data/products.json';


const products : Product[] = productsData;

const initialCartItems = products.slice(0, 2).map((product) => ({
  product,
  quantity: 1,
  giftWrap: false,
}));

describe('CartList Component Tests', () => {
  const dummySetItemList = () => {};
  beforeEach(async () => {
    render(<CartList products={products} items={initialCartItems} itemList={initialCartItems} setItemList={dummySetItemList}/>);
  });

  it('renders initial cart items and checks total price', async () => {
    // Check for the presence of initial cart items based on product names
    for (const item of initialCartItems) {
      expect(screen.getByText(item.product.name)).toBeInTheDocument();
    }

    // Check for the total price display
    const totalPriceElement = screen.getByText(/Ialt købes for:/i);
    expect(totalPriceElement).toBeInTheDocument();

    // This assumes you have a way to dynamically calculate and display the total price.
    // If the total price is not part of the initial render, consider querying for it differently.
  });

  it('allows deleting an item', async () => {
    const user = userEvent.setup();
    const deleteButtons = screen.getAllByText('X'); // Assuming 'X' is used for deleting items
    await user.click(deleteButtons[0]); // Click the delete button of the first item

    // Since we directly cannot check for the deletion effect without re-render,
    // Check for a reduction in the total number of delete buttons or product items.
    const updatedDeleteButtons = screen.queryAllByText('X');
    expect(updatedDeleteButtons.length).toBeLessThan(deleteButtons.length);

    // Additional logic to check for updated total price or item count can be added here.
  });

  

it('validates total price calculation', () => {
    // Directly check the displayed total price after initial render
    const totalSumText = screen.getByText(/Ialt købes for:/i)?.textContent; // Add null check
    const totalSumValue = parseFloat(totalSumText?.replace(/[^\d.-]/g, '') || '0'); // Add null check and default value

    // Calculate expected total based on initialCartItems
    const expectedTotal = initialCartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    expect(totalSumValue).toBeCloseTo(expectedTotal);
});

  // Additional logic for testing addItemToCart, replaceItem, and their effects on the UI.
});
