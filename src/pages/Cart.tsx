import Header from '../components/Header'

//import { products } from '../products'
import { Product, CartItem } from '../types'
import CartList from '../CartList'
import { useEffect } from 'react';


type CartProps = {
    products: Product[];
    itemList: CartItem[];
    setItemList: React.Dispatch<React.SetStateAction<CartItem[]>>;
  };
  
  const Cart: React.FC<CartProps> = ({ products , itemList, setItemList}) => {

//export default function Cart(products: Product[]) {
    useEffect(() => {
        // Initialize cart items only if itemList is empty
        if (itemList.length === 0 && products.length > 0) {
          const initialCartItems = products.slice(0, 11).map(product => ({
            product: product,
            quantity: 1,
            giftWrap: false
          }));
          console.log("Initializing cart with new items:", initialCartItems);
          setItemList(initialCartItems);
        }
      }, [products, setItemList]);
    return (
        <>
            <Header/>
            <h2>Indkøbskurv</h2>
            <>
                <CartList items={itemList} products={products} itemList={itemList} setItemList={setItemList}></CartList>

            </>
        </>
    )
}

export default Cart;