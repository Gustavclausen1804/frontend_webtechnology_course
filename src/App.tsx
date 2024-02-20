import { useState, useEffect } from 'react'
import './App.css'
import { products } from './products'
import { Product, CartItem } from './types'
import CartList from './CartList'

import ShowTotalPrice from './TotalBox'






function App() {
  const [count, setCount] = useState(0)
  
  const [totalPrice, setTotalPrice] = useState(0);

  const sampleCartItems: CartItem[] = products.slice(0, 10).map((product: Product) => ({
    product: product,
    quantity: 2,
    giftWrap: false
  }));

  // Beregn den samlede pris når sampleCartItems ændres
  useEffect(() => {
    const newTotalPrice = sampleCartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [sampleCartItems]); // Afhængighedsarrayet sikrer at effekten kun kører når sampleCartItems ændres

  return (
    <>
      <CartList items={sampleCartItems}></CartList>
      <ShowTotalPrice totalPrice={totalPrice}/>
    </>
  )
}

export default App
