import { Dispatch, useContext } from "react";
import { CartActions } from "../types/types";
import { CartDispatchContext } from "../Context/appContext";


// hook. 
export const useCartDispatch = (): Dispatch<CartActions> => {
    const context = useContext(CartDispatchContext);
    if (context === undefined) {
      throw new Error('useCartDispatch must be used within the cartDispatchProvider');
    }
    return context;
  };