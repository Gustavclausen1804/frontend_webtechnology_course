import React from 'react';
import UpSellProductItem from './UpSellProductItem'; // Adjust the import path as necessary
import { CartItem, Product } from './types'; // Assuming the types are in a file named types.ts
import { products, findProductById, isUpsellProductEligible } from './products'


interface UpSellProductListProps {
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onReplaceInCart: (currentProduct: Product, newProduct : Product) => void;
}

const UpSellProductList: React.FC<UpSellProductListProps> = ({ cartItems, onAddToCart, onReplaceInCart }) => {

  const renderProductRows = (): JSX.Element[] => {
    const rows: JSX.Element[] = [];
    let rowItems: JSX.Element[] = [];
    const eligibleUpsellProducts: Product[] = [];

    cartItems.forEach(cartItem => {

      const product = cartItem.product;
      if (product.upsellProductId) {
        const upsellProduct = findProductById(product.upsellProductId, products);
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
          product={upsellProduct}
          onAddToCart={() => onAddToCart(upsellProduct)}
          onReplaceInCart={() => onReplaceInCart(originalCartItem, upsellProduct)}
          isInCart={false}
        />
      );

      // If rowItems length reaches 5 or it's the last item, create a new row
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
      {renderProductRows()}
    </div>
  );
};


export default UpSellProductList;




