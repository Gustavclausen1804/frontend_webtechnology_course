import React from 'react';
import "../../styles/UpSell.css";
import { useCartState } from '../../hooks/useAppState';
import UpSellProductItem from './UpSellProductItem';

import { Product } from '../../types/types';
import { findEligibleUpsellProducts, findOriginalCartItem } from '../../utils/products';

const UpSellProductList: React.FC = () => {
  const { cartItems, products } = useCartState();

  const eligibleUpsellProducts = findEligibleUpsellProducts(cartItems, products);

  const renderProductRow = (): JSX.Element => (
    <div className="upsell-product-row">
      {eligibleUpsellProducts.map((upsellProduct: Product) => (
        <UpSellProductItem
          key={`upsell-product-${upsellProduct.id}`}
          product={upsellProduct}
          replacementProduct={findOriginalCartItem(upsellProduct.id, cartItems) ?? upsellProduct}
        />
      ))}
    </div>
  );
  

  const upsellProductRow = renderProductRow();

  return (
    <div className="upsell-product-list">
      {eligibleUpsellProducts.length > 0 ? (
        <>
          <h2>Anbefalede opgraderinger</h2>
          {upsellProductRow}
        </>
      ) : (
        <p>Ingen anbefalede opgraderinger tilgængelige.</p>
      )}
    </div>
  );
};

export default UpSellProductList;
