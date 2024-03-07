// products.test.ts
import { describe, it, expect } from 'vitest';
import { products, findProductById, isUpsellProductEligible } from '../products';

describe('findProductById', () => {
  it('finds a product by its ID', () => {
    const testProductId = products[0].id; // Assuming your products have at least one item for testing
    const product = findProductById(testProductId, products);
    expect(product).toBeDefined();
    expect(product?.id).toBe(testProductId);
  });

  it('returns undefined for a non-existing product ID', () => {
    const nonExistingId = 'non-existing-id';
    const product = findProductById(nonExistingId, products);
    expect(product).toBeUndefined();
  });
});


describe('isUpsellProductEligible', () => {
    it('returns true for an eligible upsell product', () => {
      // Mock setup
      const cartItems = [{ product: products[products.length - 2], quantity: 1, giftWrap: false }];
      const upsellProduct = products.find(p => p.id === products[products.length - 1].id);
  
      if (upsellProduct) {
        const result = isUpsellProductEligible(upsellProduct, cartItems);
        expect(result).toBe(true);
      } else {
        throw new Error('Upsell product not found for testing');
      }
    });
  
    it('returns false for a non-eligible upsell product', () => {
      // Product already in cart should not be eligible
      const cartItems = [{ product: products[0], quantity: 1, giftWrap: false }];
      const result = isUpsellProductEligible(products[0], cartItems);
      expect(result).toBe(false);
    });
  });
  