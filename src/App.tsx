import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
  

import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import Receipt from './pages/Receipt'
import { Product } from './types';
import React, { useState, useEffect } from 'react';
/*
type ProductsComponentProps = {
    products: Product[];
  };
  */


  const [products, setProducts] = useState<Product[]>([]);

function App() {
    
    
  //  const ParentComponent: React.FC = () => {
    
  
    useEffect(() => {
      async function fetchApi() {
        try {
          const response = await fetch('http://dtu62597.eduhost.dk:10331/api');
          if (!response.ok) {
            throw new Error(`HTTP error: status ${response.status}`);
          }
          const data = await response.json();
          setProducts(data); // Update the state with data fetched from the API
        } catch (error) {
          console.error("An error occurred while fetching data: ", error);
        }
      }
  
      fetchApi();
    }, []);
 /*   
  return (
    <div>
      <ProductsComponent products={products} />
      {
    </div>
  );
  */
 // return <Cart products={products} />;

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route index element={<Cart products={products} />} />
          <Route path="/cart" element = {<Cart products={products}/>} />
          <Route path="/checkout" element = {<Checkout/>} />
          <Route path="/payment" element = {<Payment/>} />
          <Route path="/receipt" element = {<Receipt/>} />
        </Routes>
      </BrowserRouter>
    </> 
  )
}


//export default App

