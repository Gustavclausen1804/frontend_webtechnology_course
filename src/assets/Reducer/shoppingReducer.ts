import { ShoppingState, ShoppingActions, ShoppingActionTypes } from '../../types/types';

import * as cartUtils from '../../utils/CartUtils';

export function shoppingReducer(state: ShoppingState, action: ShoppingActions): ShoppingState {
    switch (action.type) {
        case ShoppingActionTypes.SET_PRODUCTS:
            return { ...state, products: action.payload };

        case ShoppingActionTypes.ADD_TO_CART:
            return {
                ...state,
                cartItems: cartUtils.addItemToCart(state.cartItems, action.payload)
            };

        case ShoppingActionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: cartUtils.deleteItem(state.cartItems, action.payload)
            };

        case ShoppingActionTypes.UPDATE_ITEM_QUANTITY:
            return {
                ...state,
                cartItems: cartUtils.updateItemQuantity(state.cartItems, action.payload.productId, action.payload.quantity)
            };

        case ShoppingActionTypes.INITIALIZE_CART:
            return {
                ...state,
                cartItems: action.payload
            };
        case ShoppingActionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };

        case ShoppingActionTypes.SET_ERROR:
            return {
                ...state,
                error: action.payload
            };

        

        default:
            return state;
    }
}

