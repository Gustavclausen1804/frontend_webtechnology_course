import { Dispatch, useContext } from "react";
import { ShoppingActions } from "../types/types";
import { ShoppingDispatchContext } from "../Context/appContext";


// hook. 
export const useShoppingDispatch = (): Dispatch<ShoppingActions> => {
    const context = useContext(ShoppingDispatchContext);
    if (context === undefined) {
      throw new Error('useCartDispatch must be used within the cartDispatchProvider');
    }
    return context;
  };