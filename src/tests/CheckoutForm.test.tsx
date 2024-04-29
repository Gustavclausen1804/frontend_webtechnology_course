import { describe, beforeEach, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import CheckoutForm from '../components/CheckOutComponents/CheckoutForm';


//import { useCartState } from '../hooks/useAppState'; // Import CartStateProvider
import { CartStateContext } from '../Context/appContext';
import { CartItem, Product } from '../types/types';

/*
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string; // Add any missing properties from the Product interface
  currency: string;
  rebatePercent: number;
  rebateQuantity: number;
  upsellProductId: number;
}

interface CartItem {
  productId: number;
  quantity: number;
}*/


describe('CheckoutForm Component Tests', () => {


  // Define the mock context value
  const mockProducts: Product[] = [
    { id: "1", name: 'Product 1', price: 10.99, imageUrl: 'url1', currency: 'DKK', rebatePercent: 0, rebateQuantity: 0, upsellProductId: "0" },
    { id: "2", name: 'Product 2', price: 20.99, imageUrl: 'url2', currency: 'DKK', rebatePercent: 0, rebateQuantity: 0, upsellProductId: "0" },
    { id: "3", name: 'Product 3', price: 15.99, imageUrl: 'url3', currency: 'DKK', rebatePercent: 0, rebateQuantity: 0, upsellProductId: "0" },
  ];
  

  const mockCartItems: CartItem[] = [
    { product: mockProducts[0], quantity: 1, giftWrap: false }, // Two units of Product 1
    { product: mockProducts[1], quantity: 2, giftWrap: false },
    { product: mockProducts[2], quantity: 3, giftWrap: false  }, // One unit of Product 3
  ];

  const mockContextValue = {
    products: mockProducts,
    cartItems: mockCartItems,
  };


  beforeEach(async () => {
    // Wrap the component in MemoryRouter during testing
    render(
      <MemoryRouter>
        <CartStateContext.Provider value={mockContextValue}>
          <CheckoutForm />
        </CartStateContext.Provider>
      </MemoryRouter>
    );
  });
  // test to see if initial ui appears
  it('renders CheckoutForm component', async () => {
    expect(screen.getByLabelText('Fornavn')).toBeInTheDocument();
    expect(screen.getByLabelText('Efternavn')).toBeInTheDocument();
  });

  // test to check all error messages appear if no input and Til Betaling is clicked
  it('validates form submission with invalid input', async () => {
    fireEvent.click(screen.getByText('Til Betaling'));
    expect(screen.getByText('Fornavn nødvendigt')).toBeInTheDocument();
    expect(screen.getByText('Efternavn nødvendigt')).toBeInTheDocument();
    expect(screen.getByText('Address Line 1 is required')).toBeInTheDocument();
    expect(screen.getByText('Telefonnummer skal være 8 numre')).toBeInTheDocument();
    expect(screen.getByText('indtast en email')).toBeInTheDocument();
    expect(screen.getByText('Ikke korrekt Postnummer')).toBeInTheDocument();
    expect(screen.getByText('Postnummer forventet')).toBeInTheDocument();
  });

  // test to check if enter (first name + Efternavn) -> Til Betaling -> names are still there and error messages are not
  it('enter input into input field exists after Til Betaling', () => {
    // enter first name
    expect(screen.getByLabelText('Fornavn')).toBeInTheDocument();
    const inputFieldFN = screen.getByLabelText('Fornavn');
    fireEvent.change(inputFieldFN, { target: { value: 'Johnny' } });
    
    // enter Efternavn
    expect(screen.getByLabelText('Efternavn')).toBeInTheDocument();
    const inputFieldLN = screen.getByLabelText('Efternavn');
    fireEvent.change(inputFieldLN, { target: { value: 'Walrus' } });


    fireEvent.click(screen.getByText('Til Betaling'));

    // check after Til Betaling
    expect(inputFieldFN).toHaveValue('Johnny');
    expect(screen.queryByLabelText('Fornavn is required')).not.toBeInTheDocument(); 
    expect(inputFieldLN).toHaveValue('Walrus');
    expect(screen.queryByLabelText('Efternavn is required')).not.toBeInTheDocument();   
  });

  //switches page after correct Til Betaling
  it('', () => {

    //NAMES

    // enter first name
    expect(screen.getByLabelText('Fornavn')).toBeInTheDocument();
    const inputFieldFN = screen.getByLabelText('Fornavn');
    fireEvent.change(inputFieldFN, { target: { value: 'Johnny' } });
    
    
    // enter Efternavn
    expect(screen.getByLabelText('Efternavn')).toBeInTheDocument();
    const inputFieldLN = screen.getByLabelText('Efternavn');
    fireEvent.change(inputFieldLN, { target: { value: 'Walrus' } });
    /*
    //ADDRESSES

    // enter address line 1
    expect(screen.getByLabelText('Address Line 1')).toBeInTheDocument();
    const inputFieldAL1 = screen.getByLabelText('Address Line 1');
    fireEvent.change(inputFieldAL1, { target: { value: 'Johnny' } });
    
    // enter address line 2
    expect(screen.getByLabelText('Address Line 2')).toBeInTheDocument();
    const inputFieldAL2 = screen.getByLabelText('Address Line 2');
    fireEvent.change(inputFieldAL2, { target: { value: 'Walrus' } });

    //--------------------PHONE and EMAIL

    // enter phone
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
    const inputFieldP = screen.getByLabelText('Phone');
    fireEvent.change(inputFieldP, { target: { value: 'Johnny' } });
    
    // enter email
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    const inputFieldE = screen.getByLabelText('Email');
    fireEvent.change(inputFieldE, { target: { value: 'somemail@gmail.com' } });

    //CompanyName and VAT

    // enter CompanyName
    expect(screen.getByLabelText('Company Name')).toBeInTheDocument();
    const inputFieldCN = screen.getByLabelText('Company Name');
    fireEvent.change(inputFieldCN, { target: { value: 'Johnny' } });
    
    // enter VAT
    expect(screen.getByLabelText('VAT')).toBeInTheDocument();
    const inputFieldV = screen.getByLabelText('VAT');
    fireEvent.change(inputFieldV, { target: { value: 'Walrus' } });

    //ZipCode and City

    // enter ZipCode
    expect(screen.getByLabelText('>ipCode')).toBeInTheDocument();
    const inputFieldZC = screen.getByLabelText('ZipCode');
    fireEvent.change(inputFieldZC, { target: { value: '2800' } });
    
    // enter City
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    const inputFieldC = screen.getByLabelText('City');
    fireEvent.change(inputFieldC, { target: { value: 'Walrus' } });

    */
    fireEvent.click(screen.getByText('Jeg accepterer købs og forretningsbetingelser'));

    fireEvent.click(screen.getByText('Til Betaling'));

    // check after Til Betaling
    expect(inputFieldFN).toHaveValue('Johnny');
    expect(screen.queryByLabelText('Fornavn is required')).not.toBeInTheDocument(); 
    expect(inputFieldLN).toHaveValue('Walrus');
    expect(screen.queryByLabelText('Efternavn is required')).not.toBeInTheDocument();   
  })
});
