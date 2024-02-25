import React from 'react';
import { CartItem  } from './types';
import ProductItem from './ProductItem';

type CartListProps = {
    items: CartItem[];
onQuantityChange: (key: string, quantity: number) => void;
};

const CartList: React.FC<CartListProps> = ({ items, onQuantityChange  }) => {
 

    return (

        <div className="frame">
        <table>
          <thead>
        <tr>
        <th className ="slet" >Slet</th>
        <th className ="produkt">Produkt:</th>
        <th className ="antal">Antal:</th>
    
        <th className ="prisalt">Pris:</th>
        </tr>
        </thead>
        </table>
        <table>
       <tbody> 
     
        {items.map((item, index) => (
          console.log(index),
          <ProductItem
            key={item.product.id}
            productId={item.product.id}
            image='src\assets\easis-is.jpg' //TODO: produkterne har faktisk ikke billeder lige nu.
            name={item.product.name}
            price={item.product.price}
            quantity={item.quantity}
            onQuantityChange={onQuantityChange}
          />
        ))}       
      
      </tbody>
      </table>
      
      
      </div>
      
 
    );
    
  };
            
  
  export default CartList;
  
  

