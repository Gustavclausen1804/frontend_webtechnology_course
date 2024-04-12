export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    currency: string;
    rebatePercent: number;
    rebateQuantity: number;
  //  quantityInStock: number;
    upsellProductId: string | null;
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
    giftWrap: boolean;

  }





  
  