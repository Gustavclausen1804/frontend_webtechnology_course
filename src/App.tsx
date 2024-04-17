import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
  

import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import Receipt from './pages/Receipt'
import { useState, useEffect } from 'react';
import { Product  } from './types';
import productsData from './data/products.json';



  

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [itemList, setItemList] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
});
    
    useEffect(() => {
        // Store cart items in local storage whenever they change
        localStorage.setItem('cartItems', JSON.stringify(itemList));
    }, [itemList]);

  
  
    useEffect(() => {
      async function fetchApi() {
        try {
          // Uncoment with the backend is up and running
          // const BackendResponse = await fetch('http://dtu62597.eduhost.dk:10331/api');  
          // if (BackendResponse.ok) {
          //   const data = await BackendResponse.json();            
          //   setProducts(data); // Update the state with data fetched from the API
          //   console.log("Data fetched from Backend: ", data);
          // } else {
     //       const GithubProductData = await fetch('https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json');
     const GithubProductData = await fetch('http://dtu62597.eduhost.dk:10331/api');
            if (GithubProductData.ok) {
              const data = await GithubProductData.json();
              setProducts(data); // Update the state with data fetched from the API
              console.log("Data fetched from Github: ", data);
            } else {
              setProducts(productsData);
              // console.error("An error occurred while fetching data: ", BackendResponse.status);
            }
        //  } 
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

