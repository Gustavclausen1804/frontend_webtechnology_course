// UpSellProductList.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import UpSellProductList from '../UpSellProductsList';
import { products } from '../products';
import userEvent from '@testing-library/user-event';
import CartList from '../CartList';


describe('UpSellProductList', () => {
    let cartItems = [{ product: products[products.length - 2], quantity: 1, giftWrap: false }]; // Adjust based on your products data
    const cartProduct = products[products.length - 2];
    const upsellProduct = products[products.length - 1];

    const cartItemsConstant = [{ product: products[products.length - 2], quantity: 1, giftWrap: false }]; // Adjust based on your products data

    const mockOnAddToCart = vi.fn((product) => {
        cartItems.push({ product, quantity: 1, giftWrap: false });
    });

    const mockOnReplaceInCart = vi.fn((currentProduct, newProduct) => {
        cartItems = cartItems.filter(item => item.product.id !== currentProduct.id); // Remove the current product
        cartItems.push({ product: newProduct, quantity: 1, giftWrap: false }); // Add the new product
   
    
 
  });

  it('calls onReplaceInCart when replace in cart button is clicked', async () => {
    const { rerender } = render(<UpSellProductList cartItems={cartItems} onAddToCart={mockOnAddToCart} onReplaceInCart={mockOnReplaceInCart} />);
    const user = userEvent.setup();
    const replaceInCartButton = screen.getByText('Replace in Cart');
    await user.click(replaceInCartButton);
    
    // Assert onReplaceInCart was called
    expect(mockOnReplaceInCart).toHaveBeenCalled();

    // Rerender with the updated cartItems
    rerender(<UpSellProductList cartItems={cartItems} onAddToCart={mockOnAddToCart} onReplaceInCart={mockOnReplaceInCart} />);

    // Assert the previous product is not in the document anymore
    const previousProduct = screen.queryByText(upsellProduct.name);
    expect(previousProduct).toBeNull();


    
    // Assert the new product is now in the document
   // expect(screen.getByText(products[products.length - 1].name)).toBeInTheDocument();
});

    it('calls onAddToCart when add to cart button is clicked', async () => {

        const { rerender } = render(<UpSellProductList cartItems={cartItemsConstant} onAddToCart={mockOnAddToCart} onReplaceInCart={mockOnReplaceInCart} />);
        const user = userEvent.setup();

        const replaceInCartButton = screen.getByText('Replace in Cart');
        await user.click(replaceInCartButton);
        
        // Assert onReplaceInCart was called
        expect(mockOnReplaceInCart).toHaveBeenCalled();
    
        // Rerender with the updated cartItems
        rerender(<UpSellProductList cartItems={cartItems} onAddToCart={mockOnAddToCart} onReplaceInCart={mockOnReplaceInCart} />);
    
        // Assert the previous product is not in the document anymore
        const previousProduct = screen.queryByText(upsellProduct.name);
        expect(previousProduct).toBeNull();

        
    });

    it('renders the upsell product list', () => {
        render(<UpSellProductList cartItems={cartItemsConstant} onAddToCart={mockOnAddToCart} onReplaceInCart={mockOnReplaceInCart} />);
        const upsellProductItem = screen.getByText(upsellProduct.name);
        expect(upsellProductItem).toBeInTheDocument();
    });
    




});
