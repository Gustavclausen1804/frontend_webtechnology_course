import React from 'react';
import "../../styles/UpSell.css";
import { useCartDispatch } from '../../hooks/useAppDispatch'; // Assuming this is the correct path
import { Product } from '../../types/types';
import { handleAddToCart, handleReplaceInCart } from '../../utils/cartService';
import { useCartState } from '../../hooks/useAppState';
import UpSellProductItem from './UpSellProductItem';

const UpSellProductList: React.FC = () => {
  const { cartItems, products } = useCartState();
  const dispatch = useCartDispatch();

  const renderProductRows = (): JSX.Element[] => {
    const rows: JSX.Element[] = [];
    let rowItems: JSX.Element[] = [];
    const eligibleUpsellProducts: Product[] = [];

    cartItems.forEach(cartItem => {
      const product = cartItem.product;
      if (product.upsellProductId) {
        const upsellProduct = products.find(p => p.id === product.upsellProductId);
        const isInCart = cartItems.some(item => item.product.id === upsellProduct?.id);
        const isAlreadyListed = eligibleUpsellProducts.some(item => item.id === upsellProduct?.id);

        if (upsellProduct && !isInCart && !isAlreadyListed) {
          eligibleUpsellProducts.push(upsellProduct);
        }
      }
    });

    eligibleUpsellProducts.forEach((upsellProduct, index) => {
      const originalCartItem = cartItems.find(item => item.product.upsellProductId === upsellProduct.id)?.product ?? upsellProduct;

      rowItems.push(
        <UpSellProductItem
          key={upsellProduct.id}
          replacementProduct={originalCartItem}
          product={upsellProduct}
          onAddToCart={() => handleAddToCart(dispatch, upsellProduct)}
          onReplaceInCart={(newProduct) => handleReplaceInCart(dispatch, originalCartItem, newProduct)}
          isInCart={false}
        />
      );

      if (rowItems.length === 5 || index === eligibleUpsellProducts.length - 1) {
        rows.push(
          <div key={`row-${index}`} className="upsell-product-row">
            {rowItems}
          </div>
        );
        rowItems = []; // Reset for the next row
      }
    });

    return rows;
  };

  return (
    <div className="upsell-product-list">
      <h2>Anbefalede opgraderinger</h2>
      {renderProductRows()}
    </div>
  );
};

export default UpSellProductList;