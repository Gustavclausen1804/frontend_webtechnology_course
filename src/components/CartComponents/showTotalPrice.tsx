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

      
      return (
        <div className="frameTot">
          <table>
            <tbody>
              <tr className="frameTotprice">
                <td>Total købes for:</td>
                <td id="total-price-before-discount">{totalPrice.toFixed(2)} DKK</td>
              </tr>
              {totalPrice >= 300 && (
                <>
                  <tr className="total-rabat">
                    <td>10% rabat. Sparet:</td>
                    <td>{Rabat().toFixed(2)} DKK</td>
                  </tr>
                  <tr className="total-sum-med-rabat">
                    <td>Afregningspris:</td>
                    <td>{totalPrisMedRabat().toFixed(2)} DKK</td>
                  </tr>
                </>
              )}
              {totalPrice < 300 && (
                <tr className="ingen-rabat">
                  <td>Køb mindre end 300 kr. Ingen rabat</td>
                  <td>Afregningspris: {totalPrisMedRabat().toFixed(2)} DKK</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );
    
  };
            
  
  export default ShowTotalPrice;
  
  