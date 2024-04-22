import "./styles/App.css"

import { BrowserRouter, Routes, Route } from 'react-router-dom'
  

import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import Receipt from './pages/Receipt'
import { CartProvider } from './Context/appContext'




  

function App() { 
  return (
    <>
      <CartProvider>
      <BrowserRouter>
        <Routes>
        
        <Route index element={<Cart />} />       
          <Route path="/cart" element = {<Cart  />} />
          <Route path="/checkout" element = {<Checkout/>} />
          <Route path="/payment" element = {<Payment/>} />
          <Route path="/receipt" element = {<Receipt/>} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </> 

  )
}


export default App

