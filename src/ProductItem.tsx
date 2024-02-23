import React, { useState } from 'react';
import {Product, CartItem} from './types';
import './container.css';
import './RemoveButton.tsx';
import RemoveButton from './RemoveButton.tsx';

interface ProductItemProps {
  image: string;
  name: string;
  price: number;
  onDelete: (id: string) => void
}

const ProductItem: React.FC<ProductItemProps> = ({ image, name, price, onDelete }) => {
  const [amount, setAmount] = useState(1);
  

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value) >= 0 ? Number(event.target.value) : 0);
  };

  
  const formattedPrice = new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(price * amount);

  return (
 
  
    <div className="product-item">
      
      <button className="delete-btn" onClick={() => onDelete(ProductItem.name)}>X</button>
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
