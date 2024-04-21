import React from 'react';
import ProductItem from './ProductItem';
import ShowTotalPrice from './showTotalPrice';
import UpSellProductList from '../UpsellProductComponents/UpSellProductsList';
import { Link } from 'react-router-dom';
import { getTotalPrice } from '../../utils/CartUtils';
import { useAppState } from '../../hooks/useAppState';
import { useFetchProducts } from '../../hooks/useFetchProducts';

const CartList: React.FC = () => {
    const { cartItems } = useAppState();

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
                    {cartItems.map((item) => (
                        <ProductItem
                            item={item}  
                        />
                    ))}
                </tbody>
            </table>
            <ShowTotalPrice totalPrice={getTotalPrice( cartItems)} />
            <Link to="/checkout">
                <button>Gå til registrering</button>
            </Link>
            <UpSellProductList />
        </div>
    );
};

export default CartList;
