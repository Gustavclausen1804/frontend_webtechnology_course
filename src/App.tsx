import { useState, useEffect } from 'react'
import './App.css'
import { products } from './products'
import { Product, CartItem } from './types'
import CartList from './CartList'
import ProductItem from './ProductItem'


import ShowTotalPrice from './TotalBox'






const App: React.FC = () => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

//  const handleQuantityChange = (key: string, quantity: number) => {
 //   setQuantities(prevQuantities => ({ ...prevQuantities, [key]: quantity }));
 // };
  
  const [totalPrice, setTotalPrice] = useState(0);

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities(prevQuantities => ({ ...prevQuantities, [productId]: quantity }));
  };
  

  const sampleCartItems: CartItem[] = products.slice(0, 10).map((product: Product) => ({
    product: product,
    quantity: 1,
    giftWrap: false,
    quantities: { [product.id]: 1 }
  }));

  
  // Beregn den samlede pris når sampleCartItems ændres
  useEffect(() => {
    const newTotalPrice = sampleCartItems.reduce((sum, item) => {
 //     return sum + (item.product.price * item.quantity);
        const itemTotal = item.product.price * (quantities[item.product.id] || item.quantity);
        return sum + itemTotal;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [quantities]); // Afhængighedsarrayet sikrer at effekten kun kører når sampleCartItems ændres


  return (
    <>
      <CartList items={sampleCartItems}  onQuantityChange={handleQuantityChange}></CartList>
      <ShowTotalPrice totalPrice={totalPrice}/>
    </>
  )
}

export default App
