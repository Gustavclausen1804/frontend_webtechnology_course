import { Dispatch, useContext } from "react";
import { CartActions } from "../types/types";
import { CartDispatchContext } from "../Context/appContext";


// hook. 
export const useAppDispatch = (): Dispatch<CartActions> => {
    const context = useContext(CartDispatchContext);
    if (context === undefined) {
      throw new Error('useAppDispatch must be used within the AppDispatchProvider');
    }
    return context;
  };