import React from 'react';
import { CartItem  } from './types';
import ProductItem from './ProductItem';

type CartListProps = {
    items: CartItem[];
};


const CartList: React.FC<CartListProps> = ({ items }) => {
    return (

        <div className="frame">
        <table>
        <tr>
        <th className ="slet" >Slet</th>
        <th className ="produkt">Produkt:</th>
        <th className ="antal">Antal:</th>
        <th className ="prispr">Pris pr. stk.:</th>
        <th className ="prisalt">Pris i alt:</th>
        </tr>
        </table>
        
      <div>
        {items.map((item, index) => (
          console.log(index),
          <ProductItem
            key={item.product.id}
            image='src\assets\easis-is.jpg' //TODO: produkterne har faktisk ikke billeder lige nu.
            name={item.product.name}
            price={item.product.price}
            // Placeholder functions for now, you will replace them with actual implementations later
          />
        ))}
      </div>
      </div>
    );
  };
            
    
  
  
  export default CartList;
  