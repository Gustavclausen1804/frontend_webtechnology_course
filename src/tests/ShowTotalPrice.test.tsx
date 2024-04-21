import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ShowTotalPrice from '../components/CartComponents/showTotalPrice.tsx'; 

// Foreslået af ChatGPT og derefter modificeret af Torben


describe('ShowTotalPrice', () => {
  it('Ingen rabat når totalPrice er under 300 kr. heller ikke ved køb på 1 kr', () => {
    const { queryByText } = render(<ShowTotalPrice totalPrice={1} />);
    expect(queryByText(/10% rabat. Sparet:/)).toBeNull();
    expect(queryByText('Ialt købes for: 1.00 DKK.')).toBeInTheDocument();
  });


  it('Ingen rabat når totalPrice er under 300 kr.', () => {
    const { queryByText } = render(<ShowTotalPrice totalPrice={299} />);
    expect(queryByText(/10% rabat. Sparet:/)).toBeNull();
    expect(queryByText('Ialt købes for: 299.00 DKK.')).toBeInTheDocument();
  });

  it('Rabat når totalPrice er over 300 kr.', () => {
    const { getByText } = render(<ShowTotalPrice totalPrice={300} />);
    expect(getByText('10% rabat. Sparet: 30.00 DKK.')).toBeInTheDocument();
    expect(getByText('Ialt købes for: 300.00 DKK.')).toBeInTheDocument();
    expect(getByText('Afregningspris: 270.00 DKK.')).toBeInTheDocument();
  });

  
  it('Rabat når totalPrice er over 300 kr. også ved køb på 10.000 kr', () => {
    const { getByText } = render(<ShowTotalPrice totalPrice={10000} />);
    expect(getByText('10% rabat. Sparet: 1000.00 DKK.')).toBeInTheDocument();
    expect(getByText('Ialt købes for: 10000.00 DKK.')).toBeInTheDocument();
    expect(getByText('Afregningspris: 9000.00 DKK.')).toBeInTheDocument();
  });
});
