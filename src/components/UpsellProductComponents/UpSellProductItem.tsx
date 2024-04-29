import React from 'react';
import "../../styles/UpSell.css";
import { Product } from '../../types/types';
import { useShoppingDispatch } from '../../hooks/useShoppingDispatch';
import { handleAddToCart, handleReplaceInCart } from '../../utils/cartService';


interface UpSellProductItemProps {
  product: Product;
  replacementProduct: Product;
}

const UpSellProductItem: React.FC<UpSellProductItemProps> = ({ product, replacementProduct,  }) => {
  const dispatch = useShoppingDispatch();

  const { name, price, currency, imageUrl } = product;

 
  const onAddToCart = () => {
    handleAddToCart(dispatch, product);
  };

  const onReplaceInCart = () => {
    handleReplaceInCart(dispatch, replacementProduct, product);
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
          <><button onClick={onReplaceInCart}>Erstat <em>{replacementProduct.name}</em> i indkøbskurven</button><button onClick={onAddToCart}>Tilføj til indkøbskurv</button></>
        }
      </div>
    </div>
  );
};

export default UpSellProductItem;
