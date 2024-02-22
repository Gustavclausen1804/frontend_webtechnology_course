import React, { useState } from 'react';
import './container.css'; 

interface ProductItemProps {
  image: string;
  name: string;
  price: number;
}

const ProductItem: React.FC<ProductItemProps> = ({ image, name, price }) => {
  const [amount, setAmount] = useState(1);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value) >= 0 ? Number(event.target.value) : 0);
  };

  function formatPrice(value: number): string {
    return new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(value);
  }
  

  return (
 
  
    <div className="product-item">
      <button className="delete-btn" onClick={lambda => console.log("you deleted " + name)}>X</button>
      <img src={image} alt={name} className="product-image" />
      <span className="product-name">{name}</span>
      <input 
        type="number" 
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
