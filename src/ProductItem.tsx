import React, { useState } from 'react';
import './container.css'; 

interface ProductItemProps {
  key: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
 // onQuantityChange: (key: string, quantity: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({key, image, name, price }) => {
  const [amount, setAmount] = useState(1);
  

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value) >= 0 ? Number(event.target.value) : 1);
//    onQuantityChange(key, Number(event.target.value));
  };

  
  const formattedPrice = new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(price * amount);

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
      <span className="product-price">{formattedPrice}</span>
    </div>
  );
};

export default ProductItem;
