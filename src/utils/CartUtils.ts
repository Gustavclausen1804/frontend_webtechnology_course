import { CartItem, Product } from '../types/types';

// Function to remove an item from the cart
export function deleteItem(cartItems: CartItem[], productId: string): CartItem[] {
    return cartItems.filter(item => item.product.id !== productId);
}

// Function to calculate the total price of items in the cart
export function getTotalPrice(cartItems: CartItem[]): number {
    let totalPrice = 0;
    cartItems.forEach(item => {
        totalPrice += item.product.price * item.quantity;
    });
    return totalPrice;
}

// Function to update the quantity of a product in the cart
export function updateItemQuantity(cartItems: CartItem[], productId: string, quantity: number): CartItem[] {
    return cartItems.map(item => {
        if (item.product.id === productId) {
            return { ...item, quantity: quantity };
        }
        return item;
    });
}

// Function to replace a product in the cart with another product
export function replaceItem(cartItems: CartItem[], currentProduct: Product, newProduct: Product): CartItem[] {
    return cartItems.map(item => {
        if (item.product.id === currentProduct.id) {
            return { ...item, product: newProduct };
        }
        return item;
    });
}

// Function to add a product to the cart
export function addItemToCart(cartItems: CartItem[], product: Product): CartItem[] {
    const existingItem = cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
        return cartItems.map(item => {
            if (item.product.id === product.id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
    } else {
        return [...cartItems, { product: product, quantity: 1, giftWrap: false }];
    }
}


export function formatNumber (newAmount : number ): number { 
    if (isNaN(newAmount) || newAmount < 0) {
     newAmount = 0;
  } else if (newAmount > 99 ) {
    newAmount  = 99;
  }

  return newAmount;
}


export const formatPrice = (value: number, locale: string = 'da-DK', currency: string = 'DKK'): string => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
  };
  
  export const calculateDiscountedPrice = (price: number, quantity: number, rebateQuantity: number, rebatePercent: number): number => {
    return quantity >= rebateQuantity ? price * (1 - rebatePercent / 100) : price;
  };

  export const shuoldProductBeDiscounted = (quantity: number, rebateQuantity: number): boolean => {
    return quantity >= rebateQuantity && rebateQuantity > 1;
  
  }
  
  export const shouldShowDiscountNudge = (quantity: number, rebateQuantity: number): boolean => {
    return quantity === rebateQuantity - 1 && rebateQuantity > 0;
  };
