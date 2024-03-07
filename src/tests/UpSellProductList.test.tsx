// UpSellProductList.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import UpSellProductList from '../UpSellProductsList';
import { products } from '../products';
import userEvent from '@testing-library/user-event';


describe('UpSellProductList', () => {
    const cartItems = [{ product: products[products.length - 2], quantity: 1, giftWrap: false }]; // Adjust based on your products data
    const cartProductName = products[products.length - 2].name;
    const upsellProduct = products[products.length - 1];

    it('renders upsell products correctly', async () => {
    const mockOnAddToCart = vi.fn();
    const mockOnReplaceInCart = vi.fn();
    // Render "Hvidt sukker" i Cart List. 

    render(<UpSellProductList cartItems={cartItems} onAddToCart={mockOnAddToCart} onReplaceInCart={mockOnReplaceInCart} />);

    // Kontrollerer om "økologisk sukker " er anbefalet. 
    const upsellProductItem = screen.getByText(products[products.length - 1].name);
    expect(upsellProductItem).toBeInTheDocument();
  });

    it('calls onAddToCart when Add to Cart button is clicked', async () => {
        const mockOnAddToCart = vi.fn();
        const mockOnReplaceInCart = vi.fn();
    
        render(<UpSellProductList cartItems={cartItems} onAddToCart={mockOnAddToCart} onReplaceInCart={mockOnReplaceInCart} />);
    
        const user = userEvent.setup();
        const addToCartButtons = screen.getAllByText('Replace in Cart');
        await user.click(addToCartButtons[0]); // Clicks the f
        
        expect(mockOnReplaceInCart).toHaveBeenCalled();
        // expect only to have product name appear once. 

        const productNameAppearances = screen.getAllByText(upsellProduct.name);
        expect(productNameAppearances.length).toBe(1);
        
        const previousProduct = screen.queryByText(cartProductName);
        expect(previousProduct).toBeNull(); 



    });



});
