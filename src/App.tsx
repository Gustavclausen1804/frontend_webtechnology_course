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
       
      <div className="_storybrainResets_48zhe_1 _root_5lp9e_1">
        <div className="_storybrainResets_48zhe_1 _root_1vsmu_1">
          <svg preserveAspectRatio="none" 
               viewBox="0 0 910 274" 
               fill="none" 
               xmlns="http://www.w3.org/2000/svg" 
               className="_icon_1vsmu_6">
                <path d="M0 94H910V274H0V94Z" fill="#D9D9D9">
                  </path><path d="M0 0H910V94H0V0Z" fill="#D922D9">
                    </path><path d="M38 111H73V146H38V111Z" fill="#FFFF22" fillOpacity="0.823529">
                    </path>
                    <path d="M99 124H219V244H99V124Z" fill="#D92222" fillOpacity="0.133333">
                    </path>
                    <path d="M543 128H663V188H543V128Z" fill="#D92222" fillOpacity="0.133333">
                    </path><path d="M769 124H889V184H769V124Z" fill="#D92222" fillOpacity="0.133333">
                    </path><path d="M13 17H113V77H13V17Z" fill="#FF2352"></path>
                    <path d="M219 17H339V77H219V17Z" fill="#FF2352"></path>
                    <path d="M543 17H663V77H543V17Z" fill="#FF2352"></path>
                   <path d="M769 17H889V77H769V17Z" fill="#FF2352"></path>
                  <path d="M245 124H517V244H245V124Z" fill="#D92222" fillOpacity="0.133333">
                </path>
              </svg>
            </div>
         </div>



         
      
         <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="3" fill="black" />
        <line x1="30" y1="30" x2="70" y2="70" stroke="white" strokeWidth="8" />
        <line x1="30" y1="70" x2="70" y2="30" stroke="white" strokeWidth="8" />
      </svg>
      
      
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px'  }}>
        <svg id="c1" preserveAspectRatio="none" viewBox="0 0 910 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="_icon_6w9m2_6"><path d="M0 0H910V180H0V0Z" fill="#D9D9D9"></path>
        </svg>
        <RemoveButton id="c1" />
      </div>
      
      <svg id="c2" preserveAspectRatio="none" viewBox="0 0 910 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="_icon_6w9m2_60"><path d="M0 0H910V180H0V0Z" fill="#D9D9D9"></path></svg>
      <RemoveButton id="c2" />

      <svg id="c3" preserveAspectRatio="none" viewBox="0 0 910 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="_icon_6w9m2_61"><path d="M0 0H910V180H0V0Z" fill="#D9D9D9"></path></svg>
      <RemoveButton id="c3" />
      
      
      
      
      

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
