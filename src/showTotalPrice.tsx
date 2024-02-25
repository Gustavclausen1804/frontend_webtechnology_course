import React, { useState } from 'react';

type ShowTotalPriceProps = {
    totalPrice: number;
  }

  const ShowTotalPrice: React.FC<ShowTotalPriceProps> = ({ totalPrice }) => {
    useState(totalPrice);
 

    return (

        <div className="frameTot">
       
      
      <table>
      <tbody>
      <div className="total-sum">
      
                <span>Pris i alt: {totalPrice} DKK</span> {/* Antag at priserne er i DKK */}
            </div>
            </tbody>
            </table>
      </div>
      
 
    );
    
  };
            
  
  export default ShowTotalPrice;
  
  

