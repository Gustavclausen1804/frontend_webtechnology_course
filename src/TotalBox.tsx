type ShowTotalPriceProps = {
    totalPrice: number;
  }

function ShowTotalPrice ({ totalPrice }: ShowTotalPriceProps)  {
 

    return (

        <div className="frame">
       
      
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
  
  

