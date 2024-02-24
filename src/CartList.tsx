import React, { useState } from 'react';
import { CartItem  } from './types';
import ProductItem from './ProductItem';
import { removeProductById } from './products';
import './RemoveButton';


type CartListProps = {
    items: CartItem[];
};

const CartList: React.FC<CartListProps> = ({ items }) => {
  const [products, setProducts] = useState<CartItem[]>(items);

  const handleDelete = (id: string) => {
    // Use removeProductById and explicitly specify the type
    const updatedProducts = removeProductById<CartItem>(id, products);
    console.log("hD_"+id)
    console.log("hD_pL_"+products.length)
    // Update the state with the new array of products
    setProducts(updatedProducts);
  };
  

  // Rest of your component



    return (

        <div className="frame">
        <table>
        <tr>
        <th className ="slet" >Slet</th>
        <th className ="produkt">Produkt:</th>
        <th className ="antal">Antal:</th>
        <th className ="prisalt">Pris i alt:</th>
        </tr>
        </table>
        
      <div>
        {items.map((item, index) => (
          console.log(index),
          <><>
            <ProductItem
              key={item.product.id}
              image='src\assets\easis-is.jpg' //TODO: Billerne har faktisk ikke billeder lige nu.
              name={item.product.name}
              price={item.product.price} 
              onDelete={() => {
                //console.log(`Deleted item with  id: ${item.product.id}`);
                //removeProductById(item.product.id);
                handleDelete(item.product.id)
                console.log("ID_out_"+item.product.id)

                // attempt 1.1
                /*const element = document.getElementById(item.product.id);

                if (element !== null) {
                  element.remove();
                }*/
                // attempt 1.1

                
              }}
              /></>
                  
              </>
        ))}
      </div>
      </div>
    );
  };

  export default CartList;
  