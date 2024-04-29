import '../../styles/container.css';

import { CartItem } from '../../types/types';
import { useShoppingDispatch } from '../../hooks/useShoppingDispatch';
import { handleQuantityChange, handleRemove } from '../../utils/cartService';
import { calculateDiscountedPrice, formatNumber, formatPrice, shouldShowDiscountNudge, shuoldProductBeDiscounted } from '../../utils/CartUtils';


interface ProductItemProps {
  item: CartItem;

}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  const { product, quantity } = item;
  const dispatch = useShoppingDispatch();
  

  const displayPopup = shouldShowDiscountNudge(quantity, product.rebateQuantity) ? 'block' : 'none';



  


  return (
 
  
    <tr className="product-item">
    <td className="slet">
      <button className="delete-btn" onClick={() => handleRemove(dispatch, product.id)}>X</button>
    </td>
    <td className='produktBillede'> <img src={product.imageUrl} alt={product.name} className="product-image" onError={(e) => e.currentTarget.style.opacity = '0'} /></td>
    <td className="produkt">
      <span className="product-name">{product.name}</span>
    </td>
    <td className="antal">
      <input
        type="number"
        className="product-amount"
        value={quantity}
        onChange={(e) => handleQuantityChange(dispatch, product.id, formatNumber(parseInt(e.target.value)))}
      />
    </td>
    <td className="prispr">
      <span className={shuoldProductBeDiscounted(quantity, product.rebateQuantity) ? "product-price-discount" : "product-price"}>
        {formatPrice(calculateDiscountedPrice(product.price, quantity, product.rebateQuantity, product.rebatePercent))}
      </span>
    </td>
    <td className="prisalt">
      <span className={shuoldProductBeDiscounted(quantity, product.rebateQuantity) ? "product-total-discount" : "product-total"}>
        {formatPrice(calculateDiscountedPrice(product.price, quantity, product.rebateQuantity, product.rebatePercent) * quantity)}
      </span>
      <div className= "discountNudgeContainer">
        <div id="discountNudge" style={{ display: displayPopup }}>
          <p>Tilføj endnu en {product.name.split(",")[0]} til kurven for at spare {product.rebatePercent}%!</p>
        </div>
      </div>
    </td>
  </tr>
  );
};

export default ProductItem;
