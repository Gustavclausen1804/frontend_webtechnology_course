import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
  

import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import Receipt from './pages/Receipt'
import { useState, useEffect } from 'react';
import { CartItem, Product  } from './types';
import productsData from './data/products.json';



  

function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [itemList, setItemList] = useState<CartItem[]>([]);
    
     
  
    useEffect(() => {
      async function fetchApi() {
        try {
          //since the database does not have the updated json file i choose to use the local data instead right now.
          //update back when database is updated
          //const response = await fetch('http://dtu62597.eduhost.dk:10331/api');
          const response = await fetch('totally real api');
          if (!response.ok) {
            setProducts(productsData);
            throw new Error(`HTTP error: status ${response.status}`);
          }
          const data = await response.json();
          setProducts(data); // Update the state with data fetched from the API
    
          console.log("Data fetched from Backend: ", data);
        } catch (error) {
          setProducts(productsData);
          console.error("An error occurred while fetching data: ", error);
        }
      }
  
      fetchApi();
    }, []);
 
 
  return (
    <>
      <BrowserRouter>
        <Routes>
        
        <Route index element={<Cart products={products} itemList={itemList} setItemList={setItemList} />} />       
          <Route path="/cart" element = {<Cart products={products} itemList={itemList} setItemList={setItemList} />} />
          <Route path="/checkout" element = {<Checkout/>} />
          <Route path="/payment" element = {<Payment/>} />
          <Route path="/receipt" element = {<Receipt/>} />
        </Routes>
      </BrowserRouter>
    </> 

  )
}


export default App

