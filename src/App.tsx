import "./styles/App.css"

import { BrowserRouter, Routes, Route } from 'react-router-dom'
  

import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import Receipt from './pages/Receipt'
import { ShoppingProvider } from './Context/appContext'
import { useEffect } from 'react';



  

function App() { 
  useEffect(() => {
    const loadingElement = document.querySelector('p');
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
  }, []); 

  return (
    <>
      <ShoppingProvider>
      <BrowserRouter>
        <Routes>
        
        <Route index element={<Cart />} />       
          <Route path="/cart" element = {<Cart  />} />
          <Route path="/checkout" element = {<Checkout/>} />
          <Route path="/payment" element = {<Payment/>} />
          <Route path="/receipt" element = {<Receipt/>} />
        </Routes>
      </BrowserRouter>
      </ShoppingProvider>
    </> 

  )
}


export default App

