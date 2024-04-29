// cartService.ts


// cartService.ts
import { ShoppingActions, Product } from '../types/types';
import { ShoppingActionTypes } from '../types/types';
import { Dispatch } from 'react';

export const handleRemove = (dispatch: Dispatch<ShoppingActions>, productId: string) => {
    dispatch({ type: ShoppingActionTypes.REMOVE_FROM_CART, payload: productId });
};

export const handleQuantityChange = (dispatch: Dispatch<ShoppingActions>, productId: string, quantity: number) => {

    dispatch({ type: ShoppingActionTypes.UPDATE_ITEM_QUANTITY, payload: { productId, quantity } });
};

export const handleAddToCart = (dispatch: Dispatch<ShoppingActions>, product: Product) => {
    dispatch({
        type: ShoppingActionTypes.ADD_TO_CART,
        payload: product
    });
};

export const handleReplaceInCart = (dispatch: Dispatch<ShoppingActions>, currentProduct: Product, newProduct: Product) => {
    // First, remove the current product
    dispatch({
        type: ShoppingActionTypes.REMOVE_FROM_CART,
        payload: currentProduct.id
    });

    // Then, add the new product
    dispatch({
        type: ShoppingActionTypes.ADD_TO_CART,
        payload: newProduct
    });
};



// You can add more cart related utilities and services here.
