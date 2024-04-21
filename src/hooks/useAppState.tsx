import { useContext } from "react";
import { CartState } from "../types/types";
import { CartStateContext } from "../Context/appContext";

export const useAppState = (): CartState => {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within the AppStateProvider');
  }
  return context;
};