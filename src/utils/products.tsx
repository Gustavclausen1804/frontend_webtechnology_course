// products.ts
import { Product } from '../types/types';
import { CartItem } from '../types/types';


export function findProductById(productId: string, products: Product[]) : Product | undefined {
    const upsellProduct = products.find(product => product.id === productId);
    //console.log(upsellProduct);
    return upsellProduct;
}


// Checks if the product itself is in the cart, not just as an upsell reference.
export const isUpsellProductEligible = (upsellProduct: Product, cartItems: CartItem[]): boolean => {
    // Check if the upsell product is already in the cart
    const isInCart = cartItems.some(cartItem => cartItem.product.id == upsellProduct.id);
    if (isInCart) return false; // If it's already in the cart, it's not eligible
  
    // Check if the upsell product is an upsell for any product in the cart
    const isUpsellForCartProduct = cartItems.some(cartItem => cartItem.product.upsellProductId == upsellProduct.id);
    return isUpsellForCartProduct;
  };
  