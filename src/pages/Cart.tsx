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
    var sampleCartItems : CartItem[]= [];

//export default function Cart(products: Product[]) {
    useEffect(() => {
     sampleCartItems  = products.slice(0, 11).map((product: Product) => ({
        product: product,
        quantity: 1,
        giftWrap: false
        }));
 //       console.log("products: ", products);
 //       console.log("sampleCartItems: ", sampleCartItems);
        setItemList(sampleCartItems);
    }, [products, setItemList]);
    return (
        <>
            <Header/>
            <h2>Indkøbskurv</h2>
            <>
                <CartList items={sampleCartItems} products={products} itemList={itemList} setItemList={setItemList}></CartList>

            </>
        </>
    )
}

export default Cart;