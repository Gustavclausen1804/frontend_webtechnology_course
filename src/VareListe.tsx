import React from 'react';
import './VareListe.css'; // Opret denne fil for at indeholde din CSS

const varer: string[] = ['Addidas fodbold', 'Hummel fodbold', 'Select Fodbold' ,'Addidas håndbold', 'Hummel håndbold', 'Select håndbold', 'Ski langrend', 'ski slalom', 'Addidas træningsdragt', 'Hummel træningsdragt', 'Addidas træningsdragt'];

const VareListe: React.FC = () => {
  return (
    <div className="scrollable-box" id="vare-list">
      <ul>
        {varer.map(vare => (
          <li key={vare}>{vare}</li>
        ))}
      </ul>
    </div>
  );
};

export default VareListe;
