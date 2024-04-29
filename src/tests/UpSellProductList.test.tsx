import React, { Dispatch } from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render as rtlRender, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {  ShoppingState, CartItem, ShoppingActions } from '../types/types';
import productsData from '../data/products.json';
import UpSellProductList from '../components/UpsellProductComponents/UpSellProductsList';
import { ShoppingStateContext, ShoppingDispatchContext } from '../Context/appContext';

interface CustomRenderOptions {
    initialState?: ShoppingState;
    dispatch?: typeof vi.fn;
}

function render(
    ui: React.ReactElement,
    { initialState, dispatch }: CustomRenderOptions = {}
) {
    const defaultState: ShoppingState = {
        products: productsData,
        cartItems: initialState?.cartItems || [],
        loading: false,
        error: null,
        ...initialState
    };

    const defaultDispatch = dispatch || vi.fn() as Dispatch<ShoppingActions>;

    function Wrapper({ children }: { children: React.ReactNode }) {
        return (
            <ShoppingStateContext.Provider value={defaultState}>
                <ShoppingDispatchContext.Provider value={defaultDispatch}>
                    {children}
                </ShoppingDispatchContext.Provider>
            </ShoppingStateContext.Provider>
        );
    }
    return rtlRender(ui, { wrapper: Wrapper });
}

describe('UpSellProductList', () => {
    let user: ReturnType<typeof userEvent.setup>;
    let cartItems: CartItem[];

    beforeEach(() => {
        cartItems = [{
            product: productsData[productsData.length - 2],
            quantity: 1,
            giftWrap: false
        }];

        user = userEvent.setup();


    });

    it('renders the upsell product list with initialized products', async () => {
        render(<UpSellProductList />, { initialState: { cartItems, products: productsData, loading: false, error: null } });

        const lastProductName = productsData[productsData.length - 1].name;
        await screen.findByText(lastProductName);
        expect(screen.getByText(lastProductName)).toBeInTheDocument();
    });

    it('calls dispatch when add to cart button is clicked', async () => {
        const mockDispatch = vi.fn();
        render(<UpSellProductList />, { dispatch: mockDispatch, initialState: { cartItems, products: productsData, loading: false, error: null } });

        const buttons = screen.getAllByRole('button');
        if (buttons.length > 0) {
            await user.click(buttons[0]); // Assuming the first button is "Add to Cart"
            expect(mockDispatch).toHaveBeenCalled();
        }
    });

    it('calls dispatch when replace in cart button is clicked', async () => {
        const mockDispatch = vi.fn();
        render(<UpSellProductList />, { dispatch: mockDispatch, initialState: { cartItems, products: productsData, loading: false, error: null } });

        const buttons = screen.getAllByRole('button');
        if (buttons.length > 1) {
            await user.click(buttons[1]); // Assuming the second button is "Replace in Cart"
            expect(mockDispatch).toHaveBeenCalled();
        }
    });
});
