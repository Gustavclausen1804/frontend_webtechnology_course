export interface Product {
    id: string;
    name: string;
    price: number;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
  //  quantityInStock: number;
    upsellProductId: string | null;
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
    giftWrap: boolean;

  }





  
  