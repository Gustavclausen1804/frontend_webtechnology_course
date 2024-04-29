import { useContext } from "react";
import { ShoppingState } from "../types/types";
import { CartStateContext } from "../Context/appContext";

export const useShoppingState = (): ShoppingState => {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error('useCartState must be used within the CartStateProvider');
  }
  return context;
};