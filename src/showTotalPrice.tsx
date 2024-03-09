import React from 'react';
//import ShowTotalPriceCSS from './ShowTotalPrice.css';

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

    
    function Rabat() : number {
      let rabat = 0;
      if (totalPrice > 300) {
        rabat = totalPrice * 0.1;
      }
      return rabat;
    }

    if (totalPrice > 300) {
      
    return (

          <div className="frameTot">
         
        
        <table>
        <tbody>
        <div className="total-sum">
        
                  <span>Ialt købes for: {totalPrice} DKK. </span> 
              </div>
              </tbody>
              </table>
              
        <table>
        <tbody>
        <div className="total-rabat">
        
                  <span> 10% rabat. Sparet: {Rabat().toString()} DKK.</span> 
              </div>
              </tbody>
              </table>
              <table>
        <tbody>
        <div className="total-sum-med-rabat">
        
                  <span> Afregningspris: {totalPrisMedRabat().toString()} DKK.</span> 
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
        
                  <span>Ialt købes for: {totalPrice} DKK. </span> 
              </div>
              </tbody>
              </table>
              
        <table>
        <tbody>
        <div className="ingen-rabat">
        
                  <span> Køb mindre end 300 kr. Ingen rabat</span> 
              </div>
              </tbody>
              </table>
              <table>
        <tbody>
        <div className="total-sum">
        
                  <span> Afregningspris: {totalPrisMedRabat().toString()} DKK.</span> 
              </div>
              </tbody>
              </table>
        </div>
      );
    } 
    
  };
            
  
  export default ShowTotalPrice;
  
  

