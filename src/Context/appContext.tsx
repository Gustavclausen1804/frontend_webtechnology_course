// AppContext.tsx
import React, { createContext, ReactNode, Dispatch } from 'react';
import { ShoppingState, ShoppingActions } from '../types/types';
import { useFetchProducts } from '../hooks/useFetchProducts';

export const ShoppingStateContext = createContext<ShoppingState | undefined>(undefined);
export const ShoppingDispatchContext = createContext<Dispatch<ShoppingActions> | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const ShoppingProvider: React.FC<AppProviderProps> = ({ children }) => {

  const {state, dispatch} = useFetchProducts();

  return (
    <ShoppingDispatchContext.Provider value={dispatch}>
      <ShoppingStateContext.Provider value={state}>
        {children}
      </ShoppingStateContext.Provider>
    </ShoppingDispatchContext.Provider>
  );
};




