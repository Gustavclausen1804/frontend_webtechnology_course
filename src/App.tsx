import "./styles/App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart'
import { ShoppingProvider } from './Context/appContext'
import { Suspense, useEffect } from 'react';
import React from "react";



const Checkout = React.lazy(() => import('./pages/Checkout'));
const Payment = React.lazy(() => import('./pages/Payment'));
const Receipt = React.lazy(() => import('./pages/Receipt'));
  

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
          <Route index element={  <Cart />} />       
          <Route path="/cart" element = {<Cart  />} />
          
          <Route path="/checkout" element={
            <Suspense fallback={<div>Indlæser checkout siden...</div>}>
              <Checkout />
            </Suspense>
          } />
          <Route path="/payment" element={
            <Suspense fallback={<div>Indlæser betalings siden...</div>}>
              <Payment />
            </Suspense>
          } />
          <Route path="/receipt" element={
            <Suspense fallback={<div>Indlæser kvitterings siden...</div>}>
              <Receipt />
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
      </ShoppingProvider>
    </> 

  )
}


export default App

