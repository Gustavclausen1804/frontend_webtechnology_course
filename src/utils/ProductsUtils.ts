import { Product } from '../types/types';
import { CartItem } from '../types/types';




export function findProductById(productId: string, products: Product[]) : Product | undefined {
    const upsellProduct = products.find(product => product.id === productId);
    //console.log(upsellProduct);
    return upsellProduct;
}


// Function to check if the product is already in the cart
export const isProductInCart = (productId: string, cartItems: CartItem[]): boolean => {
    return cartItems.some(item => item.product.id === productId);
  };


  export const isUpsellForCartProduct = (upsellProduct: Product, cartItems: CartItem[]): boolean => {
    return cartItems.some(cartItem => cartItem.product.upsellProductId === upsellProduct.id);
}

// Checks if the product itself is in the cart, not just as an upsell reference.
export const isUpsellProductEligible = (upsellProduct: Product, cartItems: CartItem[]): boolean => {
    // Check if the upsell product is already in the cart
    const isInCart = isProductInCart(upsellProduct.id, cartItems);
    if (isInCart) return false; // If it's already in the cart, it's not eligible
  
    // Check if the upsell product is an upsell for any product in the cart
    return isUpsellForCartProduct(upsellProduct, cartItems);
  };


// Main function to find eligible upsell products
export const findEligibleUpsellProducts = (cartItems: CartItem[], products: Product[]): Product[] => {
  const eligibleUpsellProducts: Product[] = [];

  cartItems.forEach(cartItem => {
    const product = cartItem.product;
    if (product.upsellProductId) {
      const upsellProduct = findProductById(product.upsellProductId, products);
      if (upsellProduct && isUpsellProductEligible(upsellProduct, cartItems)) {
        eligibleUpsellProducts.push(upsellProduct);
      }
    }
  });

  return eligibleUpsellProducts;
};

// Finds the original cart item that has an upsell product
export const findOriginalCartItem = (upsellProductId: string, cartItems: CartItem[]): Product | undefined => {
  return cartItems.find(item => item.product.upsellProductId === upsellProductId)?.product;
};


