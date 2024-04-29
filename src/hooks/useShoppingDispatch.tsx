import { Dispatch, useContext } from "react";
import { ShoppingActions } from "../types/types";
import { CartDispatchContext } from "../Context/appContext";


// hook. 
export const useShoppingDispatch = (): Dispatch<ShoppingActions> => {
    const context = useContext(CartDispatchContext);
    if (context === undefined) {
      throw new Error('useCartDispatch must be used within the cartDispatchProvider');
    }
    return context;
  };