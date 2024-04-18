// pages/FrontPage.ts
import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header'
import { useLocation } from 'react-router-dom';
import Cart from './Cart';
/*
function FrontPage() {
  //const history = useHistory();
  let state = useLocation();

  const goToCart = () => {
    history.push('/cart');
  };
  */
/*
  return (
    <div>
      <h1>Welcome to our shop!</h1>
      <button onClick={goToCart}>Open Cart</button>
    </div>
  );
}

export default FrontPage;
*/



export default function FrontPage() {
    let state = useLocation();
    return (
        <>
            <Header/>
            <h2>Indkøbskurv</h2>
            <Cart itemList={state.state}/>
        </>
    )
}