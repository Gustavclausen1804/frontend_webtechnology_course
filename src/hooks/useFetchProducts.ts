import { useEffect, useReducer } from 'react';
import { ShoppingActionTypes, ShoppingState, Product } from '../types/types';
import productsJson from "../data/products.json";
import { shoppingReducer } from '../assets/Reducer/shoppingReducer';

const initialState: ShoppingState = {
    products: [],
    cartItems: [],
    loading: true,
    error: null
};


export const useFetchProducts = () => {

    const [state, dispatch] = useReducer(shoppingReducer, initialState);


    if (!dispatch) {
        throw new Error('useFetchProducts must be used within a component wrapped by AppProvider');
    }
    
    useEffect(() => {
        dispatch({ type: ShoppingActionTypes.SET_LOADING, payload: true });
        const fetchProducts = async () => {
            let tempProducts: Product[] = [];
            dispatch({ type: ShoppingActionTypes.INITIALIZE_CART, payload: [] }); // Example: Clear current cart items or reset state

            try {
                const backendData = await fetch('http://dtu62597.eduhost.dk:10331/api');
                if (backendData.ok) {
                    tempProducts = await backendData.json();
                } else {
                    const GithubProductData = await fetch('https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json');
                    if (GithubProductData.ok) {
                        tempProducts = await GithubProductData.json();
                    } else {
                        dispatch({ type: ShoppingActionTypes.SET_ERROR, payload: 'Failed to fetch products from the server. Using local data instead, which may be outdated.' });
                    }
                }
                dispatch({ type: ShoppingActionTypes.SET_PRODUCTS, payload: tempProducts });
                dispatch({ type: ShoppingActionTypes.SET_LOADING, payload: false });

            } catch (error) {
                console.error('Failed to fetch products from the server. Using local data instead.', error);
                dispatch({ type: ShoppingActionTypes.SET_PRODUCTS, payload: productsJson }); // Fallback to local data
                dispatch({ type: ShoppingActionTypes.SET_LOADING, payload: false });
            } 
        };

        fetchProducts();
    }, []);

    return {state, dispatch};
};
