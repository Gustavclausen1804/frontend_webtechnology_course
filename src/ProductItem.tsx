import React, { useState } from 'react';
import './container.css'; 

interface ProductItemProps {
  productId: string;
  key: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  onQuantityChange: (productId: string, quantity: number) => void;
}

 // onQuantityChange: (key: string, quantity: number) => void;

// const ProductItem: React.FC<ProductItemProps> = ({productId, image, name, price, onQuantityChange }) => {
 // const [amount, setAmount] = useState(1);
  

 // const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//    setAmount(Number(event.target.value) >= 0 ? Number(event.target.value) : 1);
//    onQuantityChange(key, Number(event.target.value));
 // };
 const ProductItem: React.FC<ProductItemProps> = ({ productId, image, name, price, quantity, onQuantityChange }) => {
  const [amount, setAmount] = useState(1);
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
 //   const newQuantity = Number(event.target.value);
    const newAmount = Number(event.target.value);
    setAmount(newAmount); 
    onQuantityChange(productId, quantity = newAmount);
  };
  

  const formattedPrice = new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(price * amount);

  return (
    <tr>
      <td><button className="delete-btn" onClick={lambda => console.log("you deleted " + name)}>X</button></td>
      <td><img src={image} alt={name} className="product-image" /></td>
      <td className="product-name">{name}</td>
      <td>
        <input 
          type="number" 
          className="product-amount" 
          value={amount} 
          onChange={handleAmountChange}
        />
      </td>
      <td className="product-price">{formattedPrice}</td>
    </tr>
  );
};


export default ProductItem;
