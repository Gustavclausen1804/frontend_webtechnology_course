// Assuming CartItem, Product types are defined in your types file.
import { CartItem, Product } from '../types'; 
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import UpSellProductList from '../UpSellProductsList';
//import { products } from '../products';
import productsData from '../data/products.json';
import userEvent from '@testing-library/user-event';

const products : Product[] = productsData;
describe('UpSellProductList', () => {
    let cartItems: CartItem[];//2
    //printme
    let user: ReturnType<typeof userEvent.setup>;
    let mockOnAddToCart: Mock<[Product], void>;
    let mockOnReplaceInCart: Mock<[Product, Product], void>;

    const upsellProduct: Product = products[products.length - 1];

    beforeEach(() => {
        // Reset variables before each test
        cartItems = [{ product: products[products.length - 2], quantity: 1, giftWrap: false }];
        user = userEvent.setup();
        mockOnAddToCart = vi.fn((newProduct) => {
            cartItems.push({ product: newProduct, quantity: 1, giftWrap: false }); // Add the new product
        });
        mockOnReplaceInCart = vi.fn((currentProduct, newProduct) => {
            cartItems = cartItems.filter(item => item.product.id !== currentProduct.id); // Remove the current product
            cartItems.push({ product: newProduct, quantity: 1, giftWrap: false }); // Add the new product
        });
    });

    it('calls onReplaceInCart when replace in cart button is clicked', async () => {
        const { rerender } = render(<UpSellProductList products = {products} cartItems={cartItems} onAddToCart={mockOnAddToCart} onReplaceInCart={mockOnReplaceInCart} />);
        const replaceInCartButton = await screen.findByText('Erstat i indkøbskurv');
        await user.click(replaceInCartButton);

        expect(mockOnReplaceInCart).toHaveBeenCalled();

        rerender(<UpSellProductList products = {products} cartItems={cartItems} onAddToCart={mockOnAddToCart} onReplaceInCart={mockOnReplaceInCart} />);

        const previousProduct = screen.queryByText(upsellProduct.name);
        expect(previousProduct).toBeNull();
    });

    it('calls onAddToCart when add to cart button is clicked', async () => {
        const { rerender } = render(<UpSellProductList products = {products} cartItems={cartItems} onAddToCart={mockOnAddToCart} onReplaceInCart={mockOnReplaceInCart} />);
        const addToCartButton = await screen.findByText('Tilføg til indkøbskurv');
        await user.click(addToCartButton);

        expect(mockOnAddToCart).toHaveBeenCalled();

        rerender(<UpSellProductList products = {products} cartItems={cartItems} onAddToCart={mockOnAddToCart} onReplaceInCart={mockOnReplaceInCart} />);

        const previousProduct = screen.queryByText(upsellProduct.name);
        expect(previousProduct).toBeNull();
    });

    it('renders the upsell product list', () => {
        render(<UpSellProductList products = {products} cartItems={cartItems} onAddToCart={mockOnAddToCart} onReplaceInCart={mockOnReplaceInCart} />);
        const upsellProductItem = screen.getByText(upsellProduct.name);
        expect(upsellProductItem).toBeInTheDocument();
    });
});
