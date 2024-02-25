import React from 'react';
import { CartItem  } from './types';
import ProductItem from './ProductItem';
import { useState } from 'react';
import ShowTotalPrice from './showTotalPrice';

type CartListProps = {
    items: CartItem[];
};



const CartList: React.FC<CartListProps> = ({ items }) => {
  const [itemList, setItemList] = useState(items);

  function delteItem(id: string) : void {
    setItemList(itemList.filter(item => item.product.name != id));
  }
  
  function getTotalPrice() : number {
    let totalPrice = 0;
    for (let i = 0; i < itemList.length; i++) {
      totalPrice += itemList[i].product.price * itemList[i].quantity;
      
    }
    return totalPrice;
  }

  function setAmountOfProduct(name: string, amount: number) : void {
    const newItemList = [...itemList];
    for (let i = 0; i < itemList.length; i++) {
      if (itemList[i].product.name == name) {
          newItemList[i].quantity = amount;
      }
    }
    setItemList(newItemList);
  }
  
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
        {itemList.map((item, index) => (
          console.log(index),
          <ProductItem
            key={item.product.id}
            image='src\assets\easis-is.jpg' //TODO: produkterne har faktisk ikke billeder lige nu.
            name={item.product.name}
            price={item.product.price}
            onClickDelete={delteItem}
            productQuantity={item.quantity}
            onChangeAmount={setAmountOfProduct}

            // Placeholder functions for now, you will replace them with actual implementations later
          />
        ))}
      </div>
      <ShowTotalPrice totalPrice={getTotalPrice()} />
      </div>
    );
  };
            
    
  
  
  export default CartList;
  