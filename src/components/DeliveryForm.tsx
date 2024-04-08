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
  country: string;
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
    zipCode: '',
    country: 'Denmark'
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

      // Used ai in the first if, to find the 
      // right regex to the zip code formular for danish zip codes
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
                    errors.zipCode = "Forkert Post Nummer";
                }
            }
        }
    }

    function cityChange(e : any){
        setCity(e.target.value);
    }

    async function getValidZipCodes(){
        const url = `https://api.dataforsyningen.dk/postnumre/he`;
        
        const response = await fetch(url);
        const zipCodes = (await response.json()) as [{
            nr: string;
        }];
        setValidZipCodes(zipCodes.map(({ nr }) => nr));
    }

    async function getCity(zipCode: string){
      const url = `https://api.dataforsyningen.dk/postnumre/he/${zipCode}`;
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
        'Fornavn nødvendigt';
    }

    if (!formData.lastName.trim() || /\d/.test(formData.lastName)) {
      validationErrors.lastName =
        'Efternavn nødvendigt';
    }

    if (!/^\d{8}$/.test(formData.phone)) {
      validationErrors.phone = 'Telefonnummer skal være 8 numre';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = 'indtast en email';
    }

    if (!formData.companyName.trim()) {
      validationErrors.companyName = 'Foretningsnavn forventet';
    }
    if (!formData.country.trim()) {
      validationErrors.country = 'Land nødvendigt';
    }

    //NEW 
    formData.zipCode = zipCode;
    if (!/^\d{4}$/.test(formData.zipCode)) {
      validationErrors.zipCode = 'Postnummer skal være 4 cifre';
    }
    if (!validZipCodes.includes(formData.zipCode)){
      validationErrors.zipCode = "Ikke korrekt Postnummer";
    }

    formData.city = city;
    if (!formData.city.trim()) {
      validationErrors.city = 'Postnummer forventet';
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


      
      {/* Country */}
      <div>
        <label htmlFor="country">Land</label>
        <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
            /><div> 
            {errors.country && <span>{errors.country}</span>}
        </div>

      </div>
    
      {/* ----------------------------- NAMES ----------------------------- */}

      <div className="name-fields">
    <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
            <label htmlFor="firstName">Fornavn</label>
        </div>
        
        <div style={{ width: '50%' }}>
            <label htmlFor="lastName">Efternavn</label>
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
        <label>Adresse linje 1</label>
      </div>
      <div style={{ width: '50%' }}>
        <label>Adresse linje 2</label>
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
          <label>Telefonnummer</label>
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
        <label>Virksomheds Navn</label>
      </div>
      <div style={{ width: '50%' }}>
        <label>CVR</label>
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
                <label>Postnummer</label>
              </div>
              <div style={{ width: '50%' }}>
                <label>By</label>
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
      <div>
        <Link to="/cart">
          <button type = "submit">Back to Cart</button>
        </Link>
      </div>

    </form>
  );
};

export default CheckoutForm;
