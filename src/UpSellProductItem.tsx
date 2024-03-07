import React from 'react';
import { Product } from './types'; // Assuming the types are in a file named types.ts
import './UpSell.css';


interface UpSellProductItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onReplaceInCart: (currentProduct: Product) => void;
  isInCart: boolean; // Indicates if the product is already in the cart
}

const UpSellProductItem: React.FC<UpSellProductItemProps> = ({ product, onAddToCart, onReplaceInCart }) => {
  const { name, price, currency } = product;

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const handleReplaceInCart = () => {
    onReplaceInCart(product);
  };

  return (
    <div className="upsell-product-item">
      <div className="product-details">
        <span className="product-name">{name + " "}</span>
        <span className="product-price">{`${price} ${currency}`}</span>
      </div>
      <div className="product-actions">
        { 
          <><button onClick={handleReplaceInCart}>Replace in Cart</button><button onClick={handleAddToCart}>Add to Cart</button></>
        }
      </div>
    </div>
  );
};

export default UpSellProductItem;
