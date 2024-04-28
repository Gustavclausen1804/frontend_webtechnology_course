import React, { useEffect } from 'react';
import Header from '../components/Header';
import CartList from '../components/CartComponents/CartList';
import { useCartDispatch } from '../hooks/useAppDispatch';
import { useCartState } from '../hooks/useAppState';
import { useFetchProducts } from '../hooks/useFetchProducts';

let isCartInitalized = false;

const Cart: React.FC = () => {
    const { products, cartItems } = useCartState();
    const dispatch = useCartDispatch();
    useFetchProducts();  
  
    useEffect(() => {

        // Initialize cart items only if cart is empty and products are loaded
        if (cartItems.length === 0 && products.length > 0 && !isCartInitalized) {
            const initialCartItems = products.slice(0, 12).map(product => ({
                product: product,
                quantity: 1,
                giftWrap: false
            }));
            dispatch({ type: 'INITIALIZE_CART', payload: initialCartItems });
            isCartInitalized = true;
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
