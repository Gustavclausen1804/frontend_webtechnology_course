import { CartState, CartActions, ActionTypes } from '../../types/types';

import * as cartUtils from '../../utils/CartUtils';

export function cartReducer(state: CartState, action: CartActions): CartState {
    switch (action.type) {
        case ActionTypes.SET_PRODUCTS:
            return { ...state, products: action.payload };

        case ActionTypes.ADD_TO_CART:
            return {
                ...state,
                cartItems: cartUtils.addItemToCart(state.cartItems, action.payload)
            };

        case ActionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: cartUtils.deleteItem(state.cartItems, action.payload)
            };

        case ActionTypes.UPDATE_ITEM_QUANTITY:
            return {
                ...state,
                cartItems: cartUtils.updateItemQuantity(state.cartItems, action.payload.productId, action.payload.quantity)
            };

        case ActionTypes.INITIALIZE_CART:
            return {
                ...state,
                cartItems: action.payload
            };

        default:
            return state;
    }
}

