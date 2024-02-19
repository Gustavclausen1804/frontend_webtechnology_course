import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AlbumPicker from './AlbumPicker'
import ProductItem from './container'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>


      <ProductItem
      image = "src\assets\easis-is.jpg"
      name = "Saltkaramelis/0,75 l / uden tilsat sukker/EASIS"
      price = {43.33}></ProductItem>
    </>
    
  )
}

export default App
