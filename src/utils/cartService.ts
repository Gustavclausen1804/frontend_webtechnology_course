// cartService.ts


// cartService.ts
import { CartActions, Product } from '../types/types';
import { ActionTypes } from '../types/types';
import { Dispatch } from 'react';

export const handleRemove = (dispatch: Dispatch<CartActions>, productId: string) => {
    dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: productId });
};

export const handleQuantityChange = (dispatch: Dispatch<CartActions>, productId: string, quantity: number) => {
    dispatch({ type: ActionTypes.UPDATE_ITEM_QUANTITY, payload: { productId, quantity } });
};

export const handleAddToCart = (dispatch: Dispatch<CartActions>, product: Product) => {
    dispatch({
        type: ActionTypes.ADD_TO_CART,
        payload: product
    });
};


export const handleReplaceInCart = (dispatch: Dispatch<CartActions>, currentProduct: Product, newProduct: Product) => {
    // First, remove the current product
    dispatch({
        type: ActionTypes.REMOVE_FROM_CART,
        payload: currentProduct.id
    });

    // Then, add the new product
    dispatch({
        type: ActionTypes.ADD_TO_CART,
        payload: newProduct
    });
};



// You can add more cart related utilities and services here.
