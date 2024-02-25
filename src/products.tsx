// products.ts
//v2.1

import React, { useState } from 'react';
import { Product } from './types';
import productsData from './data/products.json';

export const products : Product[] = productsData;

interface ProductsComponentProps {
  // props
}

const ProductsComponent: React.FC<ProductsComponentProps> = () => {
  const [products, setProducts] = useState<Product[]>(productsData);

  const removeProductById = (idToRemove: string): void => {
    console.log("bf_" + products[1].id);
    const updatedProducts = products.filter(product => product.id !== idToRemove);
    console.log("af_" + products[1].id);
    setProducts(updatedProducts);
  };

  return (
    <div>
      {/* Render your products and pass the removeProductById function to child components */}
    </div>
  );
};

export default ProductsComponent;


/*
import productsData from './data/products.json';
import { Product } from './types';
import { useState } from 'react'

import React from 'react';

export const products : Product[] = productsData;


export const ProductsComponent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(productsData);


export const removeProductById = (idToRemove: string, items: Product[]): Product[] => {
  console.log("bf_"+items[1].id);
  const updatedItems = items.filter(product => product.id !== idToRemove);
  console.log("af_"+items[1].id);
  this.productsData = updatedItems;
  return updatedItems;
};
*/


/*v1.2
export const removeProductById = (idToRemove: string, items: Product[]): Product[] => {
  console.log("bf_"+items[1].id);
  const updatedItems = items.filter(product => product.id !== idToRemove);this.productsData
  console.log("af_"+items[1].id);
  return updatedItems;
};*/

// export const removeProductById = <T extends { id: string }>(idToRemove: string, items: T[]): T[] => {
//        console.log("bf_"+items[1].id);    
//        const updatedItems: T[] = [...items.slice(0, 1), ...items.slice(2)];
//        console.log("af_"+items[1].id);
//        return updatedItems;
//   };

// const removeProductById = (index: number) => {
//   // Create a new array without the item at the specified index
//   const updatedItems = [...items.slice(0, index), ...items.slice(index + 1)];
//   setItems(updatedItems);
// };

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
  
  