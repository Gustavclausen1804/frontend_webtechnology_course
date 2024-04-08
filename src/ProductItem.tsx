import './container.css'; 

interface ProductItemProps {
 // image: string; TODO: tilføj billeder senere. 
  name: string;
  price: number;
  onClickDelete: (name: string) => void;
  onChangeAmount: (name : string, amount: number) => void;
  productQuantity: number;
}

const ProductItem: React.FC<ProductItemProps> = ({  name, price, onClickDelete, productQuantity, onChangeAmount }) => {

  // TODO: Behøves ikke her, da vi har state i CartList. 

  
  //simple lambda expression for if we have 3 or more products then we get a 10% discount
  const discount = productQuantity >= 3 ? 0.9 : 1;
 
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newAmount = Number(event.target.value);
    if (isNaN(newAmount) || newAmount < 1) {
     newAmount = 1;
  } else if (newAmount > 999 ) {
    newAmount  = 999;
  }
      onChangeAmount(name, newAmount);
      
    }

    

  function formatPrice(value: number): string {
    return new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(value);
  }

  

  const displayPopup = productQuantity == 2 ? 'block' : 'none';

  

  return (
 
  
    <div className="product-item">
      <button className="delete-btn" onClick={() => onClickDelete(name)}>X</button>
      {/* TODO: Tilføj billede her senere. <img src={image} alt={name} className="product-image" /> */}
      <span className="product-name">{name}</span>
      <input 
        type="number"  
        className="product-amount" 
        value={productQuantity} 
        onChange={handleAmountChange}
      />
      <div id="discountNudge" style={{ display: displayPopup }}>
        <p>Buy 3 of the same item to get a 10% discount!</p>
      </div>
      <span className={discount === 1 ? "product-price" : "product-price-discount"}>{formatPrice(price * discount)}</span>
      
      <span className={discount === 1 ? "product-total" : "product-total-discount"}>
  {formatPrice(price * productQuantity * discount)}
</span>
     
  )
      
    </div>
  );
};

export default ProductItem;
