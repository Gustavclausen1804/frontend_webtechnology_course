import { useState } from 'react'
import './App.css'
import ProductItem from './ProductItem'
import { products } from './products'
import RemoveButton from './RemoveButton'

import { Product, CartItem } from './types'
import CartList from './CartList'





function App() {
  const [count, setCount] = useState(0)

  const sampleCartItems : CartItem[] = products.slice(0, 10).map((product: Product) => ({
    product: product,
    quantity: 2,
    giftWrap: false
    }));



  return (
    <>


      <CartList items={sampleCartItems}></CartList>


    </>
    
  )
}

export default App
