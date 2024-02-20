import React from 'react';
import { CartItem  } from './types';
import ProductItem from './ProductItem';

type CartListProps = {
    items: CartItem[];
};

const CartList: React.FC<CartListProps> = ({ items }) => {
 
  const totalPrice = items.reduce((total, item) => {
    return total + item.product.price;// * item.quantity;
}, 0);

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
            image='src\assets\easis-is.jpg' //TODO: produkterne har faktisk ikke billeder lige nu.
            name={item.product.name}
            price={item.product.price}
            onChange={totalPrice => {console.log(totalPrice)}}
            // Placeholder functions for now, you will replace them with actual implementations later
          />
        ))}       
      
      </tbody>
      </table>
      
      
      </div>
      
 
    );
    
  };
            
  
  export default CartList;
  
  

