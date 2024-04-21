import '../../styles/container.css';

import { CartItem } from '../../types/types';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { handleQuantityChange, handleRemove } from '../../utils/cartService';
import { calculateDiscountedPrice, formatPrice, shouldShowDiscountNudge } from '../../utils/CartUtils';


interface ProductItemProps {
  item: CartItem;

}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  const { product, quantity } = item;
  const dispatch = useAppDispatch();
  

  const displayPopup = shouldShowDiscountNudge(quantity, product.rebateQuantity) ? 'block' : 'none';


  return (
 
  
    <div className="product-item">
      <button className="delete-btn" onClick={() => handleRemove(dispatch, product.id)}>X</button>
      {/* hvis img ikke får et billede vil den gøre sigselv gennemsnigtig for ikke at ødelægge vores tekst struktur*/}
      <img src={product.imageUrl} alt={product.name} className="product-image" onError={e => e.currentTarget.style.opacity = '0'}/>
      <span className="product-name">{product.name}</span>
      <input 
        type="number"  
        className="product-amount" 
        value={quantity} 
        onChange={(e) => handleQuantityChange(dispatch, product.id, parseInt(e.target.value, 10))}
      />
      <div id="discountNudge" style={{ display: displayPopup }}>
      <p>Tilføj endnu en {product.name.split(",")[0]} til kurven for at spare {product.rebatePercent}%!</p>
      </div>
      <span className={quantity >= product.rebateQuantity ? "product-price-discount" : "product-price"}>
        {formatPrice(calculateDiscountedPrice(product.price, quantity, product.rebateQuantity, product.rebatePercent))}
      </span>
      <span className={quantity >= product.rebateQuantity ? "product-total-discount" : "product-total"}>
        {formatPrice(calculateDiscountedPrice(product.price, quantity, product.rebateQuantity, product.rebatePercent) * quantity)}
      </span>
    </div>
  );
};

export default ProductItem;
