import React, { useEffect } from 'react';
import Header from '../components/Header';
import CartList from '../components/CartComponents/CartList';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppState } from '../hooks/useAppState';

const Cart: React.FC = () => {
    const { products, cartItems } = useAppState();
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Initialize cart items only if cart is empty and products are loaded
        if (cartItems.length === 0 && products.length > 0) {
            const initialCartItems = products.slice(0, 11).map(product => ({
                product: product,
                quantity: 1,
                giftWrap: false
            }));
            dispatch({ type: 'INITIALIZE_CART', payload: initialCartItems });
        }
    }, [products, dispatch, cartItems.length]); // Ensure useEffect has all dependencies it needs

    return (
        <>
            <Header />
            <h2>Indkøbskurv</h2>
            <CartList />
        </>
    );
};

export default Cart;
