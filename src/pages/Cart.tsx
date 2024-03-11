import Header from '../components/Header'

import { products } from '../products'
import { Product, CartItem } from '../types'
import CartList from '../CartList'


export default function Cart() {
    const sampleCartItems : CartItem[] = products.slice(0, 11).map((product: Product) => ({
        product: product,
        quantity: 1,
        giftWrap: false
        }));
    return (
        <>
            <Header/>
            <h2>Cart Page</h2>
            <>
                <CartList items={sampleCartItems}></CartList>

            </>
        </>
    )
}