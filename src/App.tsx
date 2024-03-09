import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
  

import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import Receipt from './pages/Receipt'





function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element ={<Cart/>}></Route>
          <Route path="/cart" element = {<Cart/>} />
          <Route path="/checkout" element = {<Checkout/>} />
          <Route path="/payment" element = {<Payment/>} />
          <Route path="/receipt" element = {<Receipt/>} />
        </Routes>
      </BrowserRouter>
    </> 
  )
}

export default App