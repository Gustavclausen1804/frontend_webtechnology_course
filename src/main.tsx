import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import AntalBox from './AntalBox';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <AntalBox />
  </React.StrictMode>,
)
