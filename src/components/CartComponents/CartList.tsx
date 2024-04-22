import React from 'react';
import ProductItem from './ProductItem';
import ShowTotalPrice from './showTotalPrice';
import UpSellProductList from '../UpsellProductComponents/UpSellProductsList';
import { Link } from 'react-router-dom';
import { getTotalPrice } from '../../utils/CartUtils';
import { useCartState } from '../../hooks/useAppState';
import { useFetchProducts } from '../../hooks/useFetchProducts';

const CartList: React.FC = () => {
    const { cartItems } = useCartState();

    useFetchProducts();



    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th className="slet">Slet</th>
                        <th className="produkt">Produkt:</th>
                        <th className="antal">Antal:</th>
                        <th className="prispr">Pris pr. stk.:</th>
                        <th className="prisalt">Pris i alt:</th>
                    </tr>
                </thead>
                <tbody>
                {cartItems.length > 0  ? ( (cartItems.map((item) => (
                        <ProductItem
                            item={item}  
                        />
                    ))) ) : (
                        <p> Der er ingen varer i kurven</p>
                        )}
                </tbody>
            </table>

            <div style={{ textAlign: 'right' }}>
            <h6> Når du har fået 10% mængderabat
                er farven på prisen er <span style={{ color: 'rgb(36, 207, 59)' }}>grøn</span></h6>
            </div>
            <ShowTotalPrice totalPrice={getTotalPrice( cartItems)} />
            <Link to="/checkout">
                <button>Gå til registrering</button>
            </Link>
            <UpSellProductList />
        </div>
    );
};

export default CartList;
