// AppContext.tsx
import React, { createContext, ReactNode, Dispatch } from 'react';
import { ShoppingState, ShoppingActions } from '../types/types';
import { useFetchProducts } from '../hooks/useFetchProducts';

export const CartStateContext = createContext<ShoppingState | undefined>(undefined);
export const CartDispatchContext = createContext<Dispatch<ShoppingActions> | undefined>(undefined);

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




