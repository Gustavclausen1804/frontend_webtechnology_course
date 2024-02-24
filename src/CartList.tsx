import React from 'react';
import { CartItem  } from './types';
import ProductItem from './ProductItem';

type CartListProps = {
    items: CartItem[];
  //  quantities: { [key: string]: number };
};

const CartList: React.FC<CartListProps> = ({ items }) => {

 // onQuantityChange: (key: string, quantity: number) => void;

 const onQuantityChange = (key: string, quantity: number) => {
    console.log(`You changed the quantity of ${key} to ${quantity}`);
    quantity = item.quantity;
  }
 

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
            quantity={item.quantity}
            onQuantityChange={onQuantityChange}
     //       onChange= {console.log(totalPrice)}
            // Placeholder functions for now, you will replace them with actual implementations later
          />
        ))}       
      
      </tbody>
      </table>
      
      
      </div>
      
 
    );
    
  };
            
  
  export default CartList;
  
  

