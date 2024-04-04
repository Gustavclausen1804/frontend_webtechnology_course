// products.ts
import productsData from './data/products.json';
import { Product } from './types';
import { CartItem } from './types';
//import React, { useState, useEffect } from 'react';


//export const products : Product[] = productsData;
/*
export const ProductsComponent: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
  
    useEffect(() => {
      async function fetchApi() {
        try {
          const response = await fetch('http://dtu62597.eduhost.dk:10331/api');
          if (!response.ok) {
            throw new Error(`HTTP error: status ${response.status}`);
          }
          const data = await response.json();
          console.log(data);
          setProducts(data); // Update the state with data fetched from the API
        } catch (error) {
          console.error("An error occurred while fetching data: ", error);
        }
      }
  
      fetchApi();
    }, []);
  
    // Render your component using the 'products' state variable
  };
  */


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
  