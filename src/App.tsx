import './App.css'
import { products } from './products'

import { Product, CartItem } from './types'
import CartList from './CartList'
import { MyForm } from './ZipForm'





function App() {

  const sampleCartItems : CartItem[] = products.slice(0, 50).map((product: Product) => ({
    product: product,
    quantity: 1,
    giftWrap: false
    }));



  return (
    <>


      <CartList items={sampleCartItems}></CartList>
      <h1>hello</h1>
      <MyForm/>


    </>
    
  )
}

export default App