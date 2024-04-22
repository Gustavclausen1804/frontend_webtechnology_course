// src/hooks/useFetchProducts.js
import { useEffect, useContext } from 'react';
import { ActionTypes, Product } from '../types/types';
import { CartDispatchContext } from '../Context/appContext';
import productsJson from "../data/products.json"


export const useFetchProducts = () => {
    const dispatch = useContext(CartDispatchContext);
    if (!dispatch) {
        throw new Error('useFetchProducts must be used within a component wrapped by AppProvider');
    }
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let products : Product[];
                const backendData = await fetch('http://dtu62597.eduhost.dk:10331/api');
                if (backendData.ok) {
                    products = await backendData.json();
                } else {
                    const GithubProductData = await fetch('https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json');
                    if (GithubProductData.ok) {
                        products = await GithubProductData.json();
                        } else {
                            throw new Error('Failed to fetch products from the backend server and Github.');
                        }
                }
                dispatch({ type: ActionTypes.SET_PRODUCTS, payload: products });
            } catch (error) {
                console.error('Failed to fetch products from the server. Using local data instead.', error);
                dispatch({ type: ActionTypes.SET_PRODUCTS, payload: productsJson });
            }
        };

        fetchProducts();
    }, [dispatch]);
};
