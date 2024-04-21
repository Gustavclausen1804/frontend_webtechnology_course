// src/hooks/useFetchProducts.js
import { useEffect, useContext } from 'react';
import { ActionTypes } from '../types/types';
import { CartDispatchContext } from '../Context/appContext';

export const useFetchProducts = () => {
    const dispatch = useContext(CartDispatchContext);
    if (!dispatch) {
        throw new Error('useFetchProducts must be used within a component wrapped by AppProvider');
    }
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://dtu62597.eduhost.dk:10331/api');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const products = await response.json();
                dispatch({ type: ActionTypes.SET_PRODUCTS, payload: products });
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, [dispatch]);
};
