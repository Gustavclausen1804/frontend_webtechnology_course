// RemoveButton.tsx
import React from 'react';

interface RemoveButtonProps {
  id: string;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ id }) => {
  const removeElement = () => {
    const elementToRemove = document.getElementById(id);
    
    if (elementToRemove) {
      //const button = elementToRemove.closest('button');
      const button = document.getElementById("button");
    if (button) {
      button.remove();
    }
      elementToRemove.remove();
    }
  };

  return (
    <div>
  
<button onClick={removeElement} id="button" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: 0, border: 'none', background: 'none', width: '50px', height: '50px', borderRadius: '50%' }}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style={{ width: '80%', height: '80%', display: 'block' }}>
    <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="3" fill="black" />
    <line x1="30" y1="30" x2="70" y2="70" stroke="white" strokeWidth="8" />
    <line x1="30" y1="70" x2="70" y2="30" stroke="white" strokeWidth="8" />
  </svg>
</button>

    </div>
  );
};

export default RemoveButton;
