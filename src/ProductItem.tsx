import './container.css'; 

interface ProductItemProps {
 // image: string; TODO: tilføj billeder senere. 
  name: string;
  price: number;
  imageUrl: string;
  rebatePercent: number;
  rebateQuantity: number;
  onClickDelete: (name: string) => void;
  onChangeAmount: (name : string, amount: number) => void;
  productQuantity: number;
}

const ProductItem: React.FC<ProductItemProps> = ({  name, price, imageUrl, rebateQuantity, rebatePercent, onClickDelete, productQuantity, onChangeAmount }) => {
  // TODO: Behøves ikke her, da vi har state i CartList. 
  

  console.log(rebatePercent)

  //simple lambda expression for if we have 3 or more products then we get a 10% discount
  const discount = productQuantity >= rebateQuantity ? 1-(rebatePercent/100) : 1;
  
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newAmount = Number(event.target.value);
    if (isNaN(newAmount) || newAmount < 0) {
     newAmount = 0;
  } else if (newAmount > 99 ) {
    newAmount  = 99;
  }
      onChangeAmount(name, newAmount);
      console.log(discount + ": "+ rebateQuantity);
    }

    

  function formatPrice(value: number): string {
    return new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(value);
  }

  

  const displayPopup = (productQuantity == rebateQuantity-1 && rebateQuantity > 0 && productQuantity > 1) ? 'block' : 'none';

  

  return (
 
  
    <div className="product-item">
      <button className="delete-btn" onClick={() => onClickDelete(name)}>X</button>
      {/* hvis img ikke får et billede vil den gøre sigselv gennemsnigtig for ikke at ødelægge vores tekst struktur*/}
      <img src={imageUrl} alt={name} className="product-image" onError={e => e.currentTarget.style.opacity = '0'}/>
      <span className="product-name">{name}</span>
      <input 
        type="number"  
        className="product-amount" 
        value={productQuantity} 
        onChange={handleAmountChange}
      />
      <div id="discountNudge" style={{ display: displayPopup }}>
        <p>Tilføj endnu en {name.split(",")[0]} til kurven for at spare 10%!</p>
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
