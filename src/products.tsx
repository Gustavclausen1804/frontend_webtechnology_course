// products.ts
import productsData from './data/products.json';
import { Product } from './types';
import { useState } from 'react'

import React from 'react';

export const products : Product[] = productsData;


// const removeProductById = (index: number) => {
//   // Create a new array without the item at the specified index
//   const updatedItems = [...items.slice(0, index), ...items.slice(index + 1)];
//   setItems(updatedItems);
// };

export const removeProductById = <T extends { id: string }>(idToRemove: string, items: T[]): T[] => {
       console.log("bf_"+items[1].id);    
       const updatedItems: T[] = [...items.slice(0, 1), ...items.slice(2)];
       console.log("af_"+items[1].id);
       return updatedItems;
  };

//   removeCartItem(CompanyName, sid,e)
// {

//   const items = {...this.state.myrecords};
//   const j = items[CompanyName].findIndex(item => item.SparePartID === sid);

//   items[CompanyName].splice([j], 1);

//   this.setState({
//      myrecords: items
//    });
   
//    }

// export const removeProductById = <T extends { id: string }>(idToRemove: string, items: T[]): T[] => {
//     const updatedItems: T[] = items.filter(item => item.id !== idToRemove);
//     return updatedItems;
//   };
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
  
  