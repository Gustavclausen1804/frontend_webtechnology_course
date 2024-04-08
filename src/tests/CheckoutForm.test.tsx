import { describe, beforeEach, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import CheckoutForm from '../components/CheckoutForm';

describe('CheckoutForm Component Tests', () => {
  beforeEach(async () => {
    // Wrap the component in MemoryRouter during testing
    render(
      <MemoryRouter>
        <CheckoutForm />
      </MemoryRouter>
    );
  });
  // test to see if initial ui appears
  it('renders CheckoutForm component', async () => {
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
  });

  // test to check all error messages appear if no input and submit is clicked
  it('validates form submission with invalid input', async () => {
    fireEvent.click(screen.getByText('Submit'));
    expect(screen.getByText('First Name is required')).toBeInTheDocument();
    expect(screen.getByText('Last Name is required')).toBeInTheDocument();
    expect(screen.getByText('Address Line 1 is required')).toBeInTheDocument();
    expect(screen.getByText('Phone must be 8 digits')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid email address')).toBeInTheDocument();
    expect(screen.getByText('Company Name is required')).toBeInTheDocument();
    expect(screen.getByText('Not Valid Zip Code')).toBeInTheDocument();
    expect(screen.getByText('City is required')).toBeInTheDocument();
  });

  // test to check if enter (first name + last name) -> submit -> names are still there and error messages are not
  it('enter input into input field exists after submit', () => {
    // enter first name
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    const inputFieldFN = screen.getByLabelText('First Name');
    fireEvent.change(inputFieldFN, { target: { value: 'Johnny' } });
    
    // enter last name
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    const inputFieldLN = screen.getByLabelText('Last Name');
    fireEvent.change(inputFieldLN, { target: { value: 'Walrus' } });

    fireEvent.click(screen.getByText('Submit'));

    // check after submit
    expect(inputFieldFN).toHaveValue('Johnny');
    expect(screen.queryByLabelText('First Name is required')).not.toBeInTheDocument(); 
    expect(inputFieldLN).toHaveValue('Walrus');
    expect(screen.queryByLabelText('Last Name is required')).not.toBeInTheDocument();   
  });

  //switches page after correct submit
  it('', () => {

    //NAMES

    // enter first name
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    const inputFieldFN = screen.getByLabelText('First Name');
    fireEvent.change(inputFieldFN, { target: { value: 'Johnny' } });
    
    
    // enter last name
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    const inputFieldLN = screen.getByLabelText('Last Name');
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

    fireEvent.click(screen.getByText('Submit'));

    // check after submit
    expect(inputFieldFN).toHaveValue('Johnny');
    expect(screen.queryByLabelText('First Name is required')).not.toBeInTheDocument(); 
    expect(inputFieldLN).toHaveValue('Walrus');
    expect(screen.queryByLabelText('Last Name is required')).not.toBeInTheDocument();   
  })
});
