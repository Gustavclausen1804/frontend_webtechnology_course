import Header from '../components/Header'
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Payment() {

    //Test for backend
    const [orderResult, setOrderResult] = useState('');
    const [orderError, setOrderError] = useState('');

    const handleOrderSubmit = () => {
        //Test for backend
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
            setOrderResult('Order placed successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            setOrderError('Failed to place order.');
        });
    };
    return (
        <>
            <Header/>
            <h2>Payment Page not found 404</h2>
            <Link to="/cart">
              <button type="submit">Tilbage til cart</button>
            </Link>
            <button onClick={handleOrderSubmit} type="button">Place Order</button>
        </>
    )
}