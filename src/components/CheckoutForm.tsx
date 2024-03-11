import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';


interface FormData {
  addressLine1: string;
  addressLine2: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  companyName: string;
  vatNumber: string;
  city: string;
  zipCode: string;
}

const CheckoutForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    addressLine1: '',
    addressLine2: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    companyName: '',
    vatNumber: '',
    city: '',
    zipCode: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  //NEW
  const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [validZipCodes, setValidZipCodes] = useState<string[]>([]);

    useEffect(() => {
        getValidZipCodes();
    }, []);


    function zipCodeChanged(e : any){
        var value = e.target.value;
        if( /^\d{0,4}$/.test(value)){
            errors.zipCode = "";
            setZipCode(value);
            if (value.length == 4){
                if (validZipCodes.includes(value)){
                    getCity(value)
                }
                else {
                    setCity("");
                    errors.zipCode = "Not Valid Zip Code";
                }
            }
        }
    }

    function cityChange(e : any){
        setCity(e.target.value);
    }

    async function getValidZipCodes(){
        const url = `https://api.dataforsyningen.dk/postnumre`;
        
        const response = await fetch(url);
        const zipCodes = (await response.json()) as [{
            nr: string;
        }];
        setValidZipCodes(zipCodes.map(({ nr }) => nr));
    }

    async function getCity(zipCode: string){
      const url = `https://api.dataforsyningen.dk/postnumre/${zipCode}`;
      const response = await fetch(url);
      const city = (await response.json()) as {
          navn: string;
      };
      setCity(city.navn);
    }
      //NEW

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validation
    const validationErrors: Partial<FormData> = {};

    if (!formData.addressLine1.trim()) {
      validationErrors.addressLine1 = 'Address Line 1 is required';
    }

    if (!formData.firstName.trim() || /\d/.test(formData.firstName)) {
      validationErrors.firstName =
        'First Name is required';
    }

    if (!formData.lastName.trim() || /\d/.test(formData.lastName)) {
      validationErrors.lastName =
        'Last Name is required';
    }

    if (!/^\d{8}$/.test(formData.phone)) {
      validationErrors.phone = 'Phone must be 8 digits';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = 'Enter a valid email address';
    }

    if (!formData.companyName.trim()) {
      validationErrors.companyName = 'Company Name is required';
    }

    //NEW 
    formData.zipCode = zipCode;
    if (!/^\d{4}$/.test(formData.zipCode)) {
      validationErrors.zipCode = 'Zip code must be 4 digits';
    }
    if (!validZipCodes.includes(formData.zipCode)){
      validationErrors.zipCode = "Not Valid Zip Code";
    }

    formData.city = city;
    if (!formData.city.trim()) {
      validationErrors.city = 'City is required';
    }
    //NEW

    // if (formData.vatNumber && !/^\d{8}$/.test(formData.vatNumber)) {
    //   validationErrors.vatNumber = 'VAT Number must be 8 digits';
    // }

    setErrors(validationErrors);

    // Check if there are no validation errors
    setIsValid(Object.keys(validationErrors).length === 0);

    // Perform actions if the form is valid
    if (isValid) {
      console.log('Form submitted successfully:', formData);
      // Redirect to the payment page
      navigate('/payment');
    }
  };

  return (
    
    <form onSubmit={handleFormSubmit}>


      

    
      {/* ----------------------------- NAMES ----------------------------- */}

      <div className="name-fields">
    <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
            <label htmlFor="firstName">First Name</label>
        </div>
        
        <div style={{ width: '50%' }}>
            <label htmlFor="lastName">Last Name</label>
        </div>
    </div>

    <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
            <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
            />
            <div> 
                {errors.firstName && <span>{errors.firstName}</span>}
            </div>
        </div>

        <div style={{ width: '50%' }}>
            <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
            />
            <div>
                {errors.lastName && <span>{errors.lastName}</span>}
            </div>
        </div>
    </div>
</div>

    
    {/* ----------------------------- ADDRESSES ----------------------------- */}

    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <label>Address Line 1</label>
      </div>
      <div style={{ width: '50%' }}>
        <label>Address Line 2</label>
      </div>
    </div>

    <div style={{ display: 'flex' }}>    
      <div style={{ width: '50%' }}>
        <input
          type="text"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleInputChange}
        /> 
        <div>
        {errors.addressLine1 && <span>{errors.addressLine1}</span>}
        </div>
      </div>

      
      <div style={{ width: '50%' }}>
        <input
          type="text"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={handleInputChange}
        />
        </div>
      </div>

    {/* ----------------------------- Phone and Email ----------------------------- */}

    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
          <label>Phone</label>
        </div>
        <div style={{ width: '50%' }}>
          <label>Email</label>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <div>
        {errors.phone && <span>{errors.phone}</span>}
        </div>
      </div>

      <div style={{ width: '50%' }}>
        
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <div>
        {errors.email && <span>{errors.email}</span>}
        </div>
      </div>
      </div>

    {/* ----------------------------- CompanyName and VAT ----------------------------- */}

    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <label>Company Name</label>
      </div>
      <div style={{ width: '50%' }}>
        <label>VAT Number</label>
      </div>
    </div>


        
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
        />
        <div>
        {errors.companyName && <span>{errors.companyName}</span>}
        </div>
      </div>

      <div style={{ width: '50%' }}>
        <input
          type="text"
          name="vatNumber"
          value={formData.vatNumber}
          onChange={handleInputChange}
        />
        <div>
            {errors.vatNumber && <span>{errors.vatNumber}</span>}
        </div>
      </div>
      </div>

      {/* ----------------------------- ZipCode and City ----------------------------- */}
      <div style={{ display: 'flex' }}>
              <div style={{ width: '50%' }}>
                <label>ZipCode</label>
              </div>
              <div style={{ width: '50%' }}>
                <label>City</label>
              </div>
            </div>


        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%' }}>
            <input type="text"value={zipCode} onChange={zipCodeChanged} ></input>
            <div>
              {errors.zipCode && <span>{errors.zipCode}</span>}
            </div>
          </div>


          <div style={{ width: '50%' }}>
            <input id="city" type="text" value={city} onChange={cityChange} ></input>
            <div>
              {errors.city && <span>{errors.city}</span>}
            </div>
          </div> 
        </div>
      
      

      
      <button type="submit">
        Submit
      </button>
    </form>
  );
};

export default CheckoutForm;
