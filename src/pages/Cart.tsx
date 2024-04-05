import Header from '../components/Header'

//import { products } from '../products'
import { Product, CartItem } from '../types'
import CartList from '../CartList'


type CartProps = {
    products: Product[];
  };
  
  const Cart: React.FC<CartProps> = ({ products }) => {

//export default function Cart(products: Product[]) {
    const sampleCartItems : CartItem[] = products.slice(0, 11).map((product: Product) => ({
        product: product,
        quantity: 1,
        giftWrap: false
        }));
        console.log("products: ", products);
        console.log("sampleCartItems: ", sampleCartItems);
    return (
        <>
            <Header/>
            <h2>Cart Page</h2>
            <>
                <CartList items={sampleCartItems} products={products}></CartList>

            </>
        </>
    )
}

export default Cart;