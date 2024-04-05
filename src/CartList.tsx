import React from 'react';
import { CartItem, Product  } from './types';
import ProductItem from './ProductItem';
import ShowTotalPrice from './showTotalPrice';
import UpSellProductList from './UpSellProductsList';
import { Link } from 'react-router-dom';

type CartListProps = {
    items: CartItem[];
    products: Product[];
    itemList: CartItem[];
    setItemList: React.Dispatch<React.SetStateAction<CartItem[]>>;
};



const CartList: React.FC<CartListProps> = ( {items ,  products, itemList, setItemList } ) => {
//  const [itemList, setItemList] = useState(items);
//setItemList(itemList);
 

//  console.log("CartList: ", items);

 // console.log("CartList itemList: ", itemList);

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

  function replaceItem(currentProduct: Product, newProduct : Product) : void {
    const newItemList = [...itemList];
    for (let i = 0; i < itemList.length; i++) {
      if (itemList[i].product.id === currentProduct.id) {
          newItemList[i].product = newProduct;
          console.log("replaced product" + newProduct.name + " with " + currentProduct.name)

      }
    }
    setItemList(newItemList);
  }

  function addItemToCart(product: Product) : void {
    const newItemList = [...itemList];

    for (let i = 0; i < itemList.length; i++) {
      if (itemList[i].product.id === product.id) {
        newItemList[i].quantity += 1;
        setItemList(newItemList);
        return;
      }
    }
    
    newItemList.push({
      product: product, quantity: 1,
      giftWrap: false
    });
    setItemList(newItemList);
    return;
  }

 // CharGPT har givet forslag til vordan det detekteres at kurven er tom og angive hvordan man vises begge situationer. Er efterføgnede tilrettet  
 
  return (
    
<div> 
        <div>
          <table>
            <tr>
              <th className ="slet" >Slet</th>
              <th className ="produkt">Produkt:</th>
              <th className ="antal">Antal:</th>
              <th className ="prispr">Pris pr. stk.:</th>
              <th className ="prisalt">Pris i alt:</th>
            </tr>
          </table>
          
        <div  className="frame">
          {itemList.length > 0  ? (
          itemList.map((item, index) => (
          console.log(index),
          <ProductItem
            key={item.product.id}
          // image='src\assets\easis-is.jpg' //TODO: produkterne har faktisk ikke billeder lige nu.
            name={item.product.name}
            price={item.product.price}
            onClickDelete={delteItem}
            productQuantity={item.quantity}
            onChangeAmount={setAmountOfProduct}
          />
        ))
        ) : (
        <p> Der er ingen varer i kurven</p>
        )}
        
     
      </div>
      <div style={{ textAlign: 'right' }}>
      <h6> Når du har fået 10% mængderabat
        er farven på prisen er <span style={{ color: 'rgb(36, 207, 59)' }}>grøn</span></h6>
      </div>
      <ShowTotalPrice totalPrice={getTotalPrice()} /> 
      
      <Link to="/checkout">
                    <button>Proceed to Checkout</button>
                </Link>

      <UpSellProductList cartItems={itemList} products={products} onAddToCart={addItemToCart} onReplaceInCart={replaceItem}   />
      
      
     
   
      </div>

      </div> 
      
   );
   
  };
            
    
  
  
  export default CartList;
  