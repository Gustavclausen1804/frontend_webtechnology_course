import React from 'react';
//import './ShowTotalPrice.css';


type ShowTotalPriceProps = {
  totalPrice: number;
}

  const ShowTotalPrice: React.FC<ShowTotalPriceProps> = ({ totalPrice }) => {
  
 
    function totalPrisMedRabat() : number {
      let rabat = 0;
      if (totalPrice >= 300) {
        rabat = totalPrice * 0.1;
      }
      return totalPrice - rabat;
    }

    
    function Rabat() : number {
      let rabat = 0;
      if (totalPrice >= 300) {
        rabat = totalPrice * 0.1;
      }
      return rabat;
    }

    if (totalPrice >= 300) {
      
    return (

          

          <div className="frameTot">
         
        
        <table>
        <tbody>
        <div className="frameTotprice">
        
                  <span>Ialt købes for: {totalPrice.toFixed(2)} DKK. </span> 
              </div>
              </tbody>
              </table>
              
        <table>
        <tbody>
        <div className="total-rabat">
        
                  <span> 10% rabat. Sparet: {Rabat().toFixed(2)} DKK.</span> 
              </div>
              </tbody>
              </table>
              <table>
        <tbody>
        <div className="total-sum-med-rabat">
        
                  <span> Afregningspris: {totalPrisMedRabat().toFixed(2)} DKK.</span> 
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
        <div className="frameTotprice">
        
                  <span>Ialt købes for: {totalPrice.toFixed(2)} DKK. </span> 
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
        <div className="total-sum-uden-rabat">
        
                  <span> Afregningspris: {totalPrisMedRabat().toFixed(2)} DKK.</span> 
              </div>
              </tbody>
              </table>
        </div>
      );
    } 
    
  };
            
  
  export default ShowTotalPrice;
  
  

