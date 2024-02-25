import './App.css'
import { products } from './products'

import { Product, CartItem } from './types'
import CartList from './CartList'





function App() {

  const sampleCartItems : CartItem[] = products.slice(0, 10).map((product: Product) => ({
    product: product,
    quantity: 1,
    giftWrap: false
    }));



  return (
    <>


      <CartList items={sampleCartItems}></CartList>


    </>
    
  )
}

export default App