import { describe, it, expect } from 'vitest';
import { deleteItem, getTotalPrice, updateItemQuantity, replaceItem, addItemToCart, formatNumber, formatPrice, calculateDiscountedTotalPrice } from '../utils/CartUtils';
import { CartItem, Product } from '../types/types';

// Products Data
const productsData: Product[] = [
  {
    id: "vitamin-d-90-120",
    name: "D-vitamin, 90ug, 120 stk",
    price: 116,
    currency: "DKK",
    rebateQuantity: 3,
    rebatePercent: 10,
    upsellProductId: null,
    imageUrl: "https://apopro.dk/Images/d3-vitamin-staerk-kapsler-90-%C2%B5g-kosttilskud-120-stk-214878"
  },
  {
    id: "vitamin-c-500-200",
    name: "C-vitamin, 500mg, 200 stk",
    price: 150,
    currency: "DKK",
    rebateQuantity: 2,
    rebatePercent: 25,
    upsellProductId: "vitamin-c-depot-500-250",
    imageUrl: "https://images.matas.dk/Assets_v3/600001-700000/636001-637000/636601-636700/636640/productlist_v1_x2.jpg"
  }
];

const cartItems: CartItem[] = [
  { product: productsData[0], quantity: 2, giftWrap: false },
  { product: productsData[1], quantity: 4, giftWrap: true },
];

describe('Cart Utils', () => {

  describe('deleteItem', () => {
    it('should remove the correct item from the cart', () => {
      const updatedCart = deleteItem(cartItems, 'vitamin-d-90-120');
      expect(updatedCart.length).toBe(1);
      expect(updatedCart[0].product.id).toBe('vitamin-c-500-200');
    });

    it('should do nothing if product ID not found', () => {
      const updatedCart = deleteItem(cartItems, 'non-existing-id');
      expect(updatedCart.length).toBe(2);
    });
  });

  describe('getTotalPrice', () => {
    it('should calculate the total price correctly', () => {
      const total = getTotalPrice(cartItems);
      expect(total).toBe(116 * 2 + 150 * 4 * (1 - 25 / 100)); // Applies discount to Vitamin C
    });
  });

  describe('updateItemQuantity', () => {
    it('should update the quantity of a specific item', () => {
      const updatedCart = updateItemQuantity(cartItems, 'vitamin-d-90-120', 5);
      expect(updatedCart.find((item: { product: { id: string; }; }) => item.product.id === 'vitamin-d-90-120')?.quantity).toBe(5);
    });

    it('should not modify other items', () => {
      const updatedCart = updateItemQuantity(cartItems, 'vitamin-d-90-120', 5);
      expect(updatedCart.find((item: { product: { id: string; }; }) => item.product.id === 'vitamin-c-500-200')?.quantity).toBe(4);
    });
  });

  describe('replaceItem', () => {
    const newProduct: Product = { 
      id: "vitamin-d-90-120",
      name: "D-vitamin, 90ug, 100 stk",
      price: 100,
      currency: "DKK",
      rebateQuantity: 0,
      rebatePercent: 0,
      upsellProductId: null,
      imageUrl: "https://example.com/d-vitamin-new.jpg"
    };
    it('should replace an existing product with a new product', () => {
      const updatedCart = replaceItem(cartItems, productsData[0], newProduct);
      expect(updatedCart.find((item: { product: { id: string; }; }) => item.product.id === 'vitamin-d-90-120')?.product.name).toBe('D-vitamin, 90ug, 100 stk');
    });

    it('should not modify other items', () => {
      const updatedCart = replaceItem(cartItems, productsData[0], newProduct);
      expect(updatedCart.find((item: { product: { id: string; }; }) => item.product.id === 'vitamin-c-500-200')?.product.name).toBe('C-vitamin, 500mg, 200 stk');
    });
  });

  describe('addItemToCart', () => {
    it('should add a new product to the cart if not already present', () => {
      const newProduct: Product = {
        id: "new-vitamin",
        name: "New Vitamin",
        price: 200,
        currency: "DKK",
        rebateQuantity: 0,
        rebatePercent: 0,
        upsellProductId: null,
        imageUrl: "https://example.com/new-vitamin.jpg"
      };
      const updatedCart = addItemToCart(cartItems, newProduct);
      expect(updatedCart.length).toBe(3);
      expect(updatedCart.find((item: { product: { id: string; }; }) => item.product.id === 'new-vitamin')?.quantity).toBe(1);
    });

    it('should increase quantity if product already exists', () => {
      const updatedCart = addItemToCart(cartItems, productsData[0]);
      expect(updatedCart.find((item: { product: { id: string; }; }) => item.product.id === 'vitamin-d-90-120')?.quantity).toBe(3);
    });
  });

  describe('formatNumber', () => {
    it('should correct invalid numbers', () => {
      expect(formatNumber(0)).toBe(1);
      expect(formatNumber(-10)).toBe(1);
      expect(formatNumber(100)).toBe(99);
    });
  });

  describe('formatPrice', () => {
    it('should return formatted price string', () => {
        expect(formatPrice(1000)).toMatch(/^1\.000,00\s*kr\.?$/);
    });
  });


  describe('calculateDiscountedTotalPrice', () => {
    it('should calculate the total price with discount', () => {
      expect(calculateDiscountedTotalPrice(100, 5, 3, 10)).toBe(450); // 5 items with a 10% discount each costs 90
    });

    it('should return regular price if quantity is below rebate quantity', () => {
      expect(calculateDiscountedTotalPrice(100, 2, 3, 10)).toBe(200);
    });
  });

});
