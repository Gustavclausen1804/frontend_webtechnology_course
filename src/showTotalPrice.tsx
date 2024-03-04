import React, { useState } from 'react';

type ShowTotalPriceProps = {
    totalPrice: number;
  }

  const ShowTotalPrice: React.FC<ShowTotalPriceProps> = ({ totalPrice }) => {
  
 
    function totalPrisMedRabat() : number {
      let rabat = 0;
      if (totalPrice > 300) {
        rabat = totalPrice * 0.1;
      }
      return totalPrice - rabat;
    }

    if (totalPrice > 300) {
      
    return (

          <div className="frameTot">
         
        
        <table>
        <tbody>
        <div className="total-sum">
        
                  <span>Ialt købes for: {totalPrice} DKK. Afregningspris med 10% rabat: {totalPrisMedRabat().toString()} DKK.</span> {/* Antag at priserne er i DKK */}
              </div>
              </tbody>
              </table>
        </div>
      
 
    );
    }
    else {
      return (
        <div className="frameTot">
          <table>
          <tbody>
          <div className="total-sum">
                  <span>Ialt købes for: {totalPrice} DKK. Der gives 10% rabat ved et samlet køb på over 300 DKK.</span> {/* Antag at priserne er i DKK */}
              </div>
              </tbody>
              </table>
        </div>
      );
    } 
    
  };
            
  
  export default ShowTotalPrice;
  
  

