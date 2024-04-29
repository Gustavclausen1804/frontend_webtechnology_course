// AppContext.tsx
import React, { createContext, ReactNode, Dispatch } from 'react';
import { CartState, CartActions } from '../types/types';
import { useFetchProducts } from '../hooks/useFetchProducts';

export const CartStateContext = createContext<CartState | undefined>(undefined);
export const CartDispatchContext = createContext<Dispatch<CartActions> | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<AppProviderProps> = ({ children }) => {

  const {state, dispatch} = useFetchProducts();

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};




