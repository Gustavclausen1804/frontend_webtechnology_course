import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import Receipt from './pages/Receipt';
import './App.css';

function App() {
    const [response, setResponse] = useState<string>("");

    async function fetchApi() {
        try {
            const response = await fetch('http://130.225.170.52:10331/api');
            if (!response.ok) {
                throw new Error(`HTTP fejl: status ${response.status}`);
            }
            const data = await response.text();
            setResponse(data); // Opdater tilstanden med data hentet fra API'en
        } catch (error) {
            console.error("Der opstod en fejl under hentning af data: ", error);
        }
    }

    return (
        <>
            <button onClick={fetchApi}>Call API</button>
            {response && <p>{response}</p>}

            <BrowserRouter>
                <Routes>
                    <Route index element={<Cart />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/receipt" element={<Receipt />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
