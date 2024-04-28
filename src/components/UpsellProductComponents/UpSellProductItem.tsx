import React from 'react';
import "../../styles/UpSell.css";
import { Product } from '../../types/types';


interface UpSellProductItemProps {
  product: Product;
  replacementProduct: Product;
  onAddToCart: (product: Product) => void;
  onReplaceInCart: (currentProduct: Product) => void;
  isInCart: boolean; // Indicates if the product is already in the cart
}

const UpSellProductItem: React.FC<UpSellProductItemProps> = ({ product, replacementProduct, onAddToCart, onReplaceInCart }) => {
  const { name, price, currency, imageUrl } = product;
 
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const handleReplaceInCart = () => {
    onReplaceInCart(product);
  };

  return (
    <div className="upsell-product-item">
      <div className="product-details">
        <img className="upsell-product-item-image" src={imageUrl}  alt={name} />
        <span className="product-name">{name + " "}</span>
        <span className="product-price">{`${price} ${currency}`}</span>
      </div>
      <div className="product-actions">
        { 
          <><button onClick={handleReplaceInCart}>Erstat <em>{replacementProduct.name}</em> i indkøbskurven</button><button onClick={handleAddToCart}>Tilføg til indkøbskurv</button></>
        }
      </div>
    </div>
  );
};

export default UpSellProductItem;
