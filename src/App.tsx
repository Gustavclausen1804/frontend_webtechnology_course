import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AlbumPicker from './AlbumPicker'
import RemoveButton from './RemoveButton'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      
      
      

      <svg id="c1" preserveAspectRatio="none" viewBox="0 0 910 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="_icon_6w9m2_61"><path d="M0 0H910V180H0V0Z" fill="#D9D9D9"></path></svg>
      <RemoveButton id="c1" />
      
      
      
      
      

      <h1>Vite + React</h1>
      
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Dette er en test side. 
      </p>
      <AlbumPicker />
    </>
  )
}

export default App
