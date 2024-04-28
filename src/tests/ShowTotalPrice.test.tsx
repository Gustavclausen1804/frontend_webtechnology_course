import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ShowTotalPrice from '../components/CartComponents/showTotalPrice.tsx'; 

// Foreslået af ChatGPT og derefter modificeret af Torben


// Tilpasset tekst matcher funktion
/*
const customTextMatcher = (text: string) => (content: string, element: Element | null) => {
  const normalizedContent = content.trim().replace(/\s+/g, ' ');
  return normalizedContent.includes(text);
};


describe('ShowTotalPrice', () => {
  it('Rabat når totalPrice er over 300 kr. også ved køb på 10.000 kr', () => {
    const { getByText } = render(<ShowTotalPrice totalPrice={10000} />);
    expect(getByText(customTextMatcher('10% rabat. Sparet:'))).toBeInTheDocument();
    expect(getByText(customTextMatcher('1000.00 DKK'))).toBeInTheDocument();
    expect(getByText(customTextMatcher(' Total købes for: '))).toBeInTheDocument();
    expect(getByText(customTextMatcher('10000.00 DKK'))).toBeInTheDocument();
    expect(getByText(customTextMatcher(' Afregningspris: '))).toBeInTheDocument();
    expect(getByText(customTextMatcher('9000.00 DKK'))).toBeInTheDocument();
  */

/*  
  it('Ingen rabat når totalPrice er under 300 kr. heller ikke ved køb på 1 kr', () => {
    const { queryByText } = render(<ShowTotalPrice totalPrice={1} />);
    expect(queryByText('Køb mindre end 300 kr. Ingen rabat')).toBeNull();
    expect(queryByText('Afregningspris: 150.00 DKK')).toBeInTheDocument();
  });

*/
  it('Ingen rabat når totalPrice er under 300 kr.', () => {
    const { queryByText } = render(<ShowTotalPrice totalPrice={299} />);
    expect(queryByText('Køb mindre end 300 kr. Ingen rabat')).toBeInTheDocument();
    expect(queryByText('Afregningspris: 299.00 DKK')).toBeInTheDocument();
    
  });
  

  it('Rabat når totalPrice er over 300 kr.', () => {
    const { getByText } = render(<ShowTotalPrice totalPrice={300} />);
   
    expect(getByText('Total købes for:')).toBeInTheDocument();
    expect(getByText('300.00 DKK')).toBeInTheDocument();
    expect(getByText('10% rabat. Sparet:')).toBeInTheDocument();
    expect(getByText('30.00 DKK')).toBeInTheDocument();
    expect(getByText('Afregningspris:')).toBeInTheDocument();
    expect(getByText('270.00 DKK')).toBeInTheDocument();
  });

  
  it('Rabat når totalPrice er over 300 kr. også ved køb på 10.000 kr', () => {
    const { getByText } = render(<ShowTotalPrice totalPrice={10000} />);
    expect(getByText('Total købes for:')).toBeInTheDocument();
    expect(getByText('10000.00 DKK')).toBeInTheDocument();
    expect(getByText('10% rabat. Sparet:')).toBeInTheDocument();
    expect(getByText('1000.00 DKK')).toBeInTheDocument();
    expect(getByText('Afregningspris:')).toBeInTheDocument();
    expect(getByText('9000.00 DKK')).toBeInTheDocument();
  });
  
  
//})});
