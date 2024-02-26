import { useState } from 'react';
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

  const [amount, setAmount] = useState(productQuantity);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newAmount = Number(event.target.value);
    if (isNaN(newAmount)) {
     newAmount = 0;
  } else if (newAmount > 999 ) {
    newAmount  = 999;
  }
      setAmount(newAmount);
      onChangeAmount(name, newAmount);
      
    }

    

  function formatPrice(value: number): string {
    return new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(value);
  }
  


  return (
 
  
    <div className="product-item">
      <button className="delete-btn" onClick={() => onClickDelete(name)}>X</button>
      {/* TODO: Tilføj billede her senere. <img src={image} alt={name} className="product-image" /> */}
      <span className="product-name">{name}</span>
      <input 
        type="text" 
        className="product-amount" 
        value={amount} 
        onChange={handleAmountChange}
      />
      <span className="product-price">{formatPrice(price)}</span>
      <span className="product-total">{formatPrice(price * amount)}</span>
    </div>
  );
};

export default ProductItem;
