import Header from '../components/Header'

import { products } from '../products'
import { Product, CartItem } from '../types'
import CartList from '../CartList'

import { Link } from 'react-router-dom';

export default function Cart() {
    const sampleCartItems : CartItem[] = products.slice(0, 50).map((product: Product) => ({
        product: product,
        quantity: 1,
        giftWrap: false
        }));

    //-------------- TEST FOR BACKEND ----------------------
    const handleOrderSubmit = () => {
        const orderData = {
            items: [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 1 }],
            userId: 123,
            total: 39.99,
        };
        
        fetch('http://localhost:3001/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })
        .then(response => response.text())
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    //-----------------------------------------------------------

    return (
        <>
            <Header/>
            <h2>Cart Page</h2>
            <>
                <CartList items={sampleCartItems}></CartList>
                <Link to="/checkout">
                    <button>Proceed to Checkout</button>
                </Link>
                <button onClick={handleOrderSubmit}>Send to backend</button>
            </>
        </>
    )
}