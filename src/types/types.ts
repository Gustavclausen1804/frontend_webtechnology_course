export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  currency: string;
  rebatePercent: number;
  rebateQuantity: number;
  upsellProductId: string | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
  giftWrap: boolean;
}

export interface CartState {
  products: Product[];
  cartItems: CartItem[];
}

export enum ActionTypes {
  SET_PRODUCTS = 'SET_PRODUCTS',
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY',
  INITIALIZE_CART = 'INITIALIZE_CART' 

}

export type CartActions =
    | { type: 'SET_PRODUCTS'; payload: Product[] }
    | { type: 'ADD_TO_CART'; payload: Product }
    | { type: 'REMOVE_FROM_CART'; payload: string }
    | { type: 'UPDATE_ITEM_QUANTITY'; payload: { productId: string; quantity: number; } }
    | { type: 'INITIALIZE_CART'; payload: CartItem[] };





  
  