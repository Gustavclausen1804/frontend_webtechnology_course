import { useContext } from "react";
import { CartState } from "../types/types";
import { CartStateContext } from "../Context/appContext";

export const useCartState = (): CartState => {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error('useCartState must be used within the CartStateProvider');
  }
  return context;
};