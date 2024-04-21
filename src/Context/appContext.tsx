// AppContext.tsx
import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { CartState, CartActions } from '../types/types';
import { cartReducer } from '../assets/Reducer/appReducer';

export const CartStateContext = createContext<CartState | undefined>(undefined);
export const CartDispatchContext = createContext<Dispatch<CartActions> | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const initialState: CartState = {
    products: [],
    cartItems: [],
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};




