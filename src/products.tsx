// products.ts
import productsData from './data/products.json';
import { Product } from './types';

export const products : Product[] = productsData;

export const removeProductById = <T extends { id: string }>(idToRemove: string, items: T[]): T[] => {
    const updatedItems: T[] = items.filter(item => item.id !== idToRemove);
    return updatedItems;
  };
/*
export const removeProductById = (idToRemove: string): CartItem[] => {
    
    const updatedProducts: CartItem[] = productsData
    
      .filter(product => product.id == idToRemove)
      
      .map(product => ({
        id: product.id,
        product: product, 
        quantity: 0, 
        giftWrap: false 
        
      }));
    return updatedProducts;
  };*/
  
  