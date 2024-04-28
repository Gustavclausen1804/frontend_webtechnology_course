import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

import { useNavigate, Link } from 'react-router-dom';


interface FormData {
  addressLine1: string;
  addressLine2: string;
  optionalComment: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  companyName: string;
  vatNumber: string;
  city: string;
  zipCode: string;
  country: string;

  //delivery form//
  activateDeliveryAddress: boolean;

  deliveryCountry: string;
  deliveryFirstName: string;
  deliveryLastName: string;
  deliveryaddressLine1: string;
  deliveryaddressLine2: string;
  deliveryZipCode: string;
  deliveryCity: string;
  deliveryEmail: string;
  deliveryPhone: string;
  
  newsLetter: boolean;
}

type ZipCode = {
  nr: string;
  navn: string;
};
type DeliveryZipCode = {
  nr: string;
  navn: string;
};

const CheckoutForm: React.FC<any> = (itemList) => {
  const [formData, setFormData] = useState<FormData>({
    addressLine1: '',
    addressLine2: '',
    optionalComment: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    companyName: '',
    vatNumber: '',
    city: '',
    zipCode: '',
    country: 'Denmark',
    newsLetter: false,

    activateDeliveryAddress: false, // Add this line


    deliveryCountry: 'Denmark',
    deliveryFirstName: '',
    deliveryLastName: '',
    deliveryaddressLine1: '',
    deliveryaddressLine2: '',
    deliveryZipCode: '',
    deliveryCity: '',
    deliveryPhone: '',
    deliveryEmail: '',
     
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

  // handleCommentChange function is created by Copilot

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNesLetterChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      ["newsLetter"]: !prevData.newsLetter,
    }));
  };
  
  
  const [zipCode, setZipCode] = useState("");
  const [deliveryZipCode, setDeliveryZipCode] = useState("");

  const [city, setCity] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");

  const [validZipCodes, setValidZipCodes] = useState<ZipCode[]>([]);
  const [validDeliveryZipCodes, setValidDeliveryZipCodes] = useState<DeliveryZipCode[]>([]);

  const [term, setTerm] = useState(false);
  const [termError, setTermError ] = useState("")

    useEffect(() => {
        getValidZipCodes();
        getValidDeliveryZipCodes();
    }, []);

      // Used ai in the first if, to find the 
      // right regex to the zip code formular for danish zip codes
    function zipCodeChanged(e : any){
        var value = e.target.value;
        if( /^\d{0,4}$/.test(value)){
            errors.zipCode = "";
            setZipCode(value);
            if (value.length == 4){
                var validZipCode = validZipCodes.find(z => z.nr == value)
                if (validZipCode){
                  setCity(validZipCode.navn);
                }
                else {
                    setCity("");
                    errors.zipCode = "Forkert Post Nummer";
                }
            }
        }
    }
    function deliveryZipCodeChanged(e : any){
      var value = e.target.value;
      if( /^\d{0,4}$/.test(value)){
          errors.deliveryZipCode = "";
          setDeliveryZipCode(value);
          if (value.length == 4){
              var validDeliveryZipCode = validDeliveryZipCodes.find(z => z.nr == value)
              if (validDeliveryZipCode){
                setDeliveryCity(validDeliveryZipCode.navn);
              }
              else {
                  setDeliveryCity("");
                  errors.deliveryZipCode = "Forkert Post Nummer";
              }
          }
      }
  }

    function cityChange(e : any){
        setCity(e.target.value);
    }
    function deliveryCityChange(e : any){
      setDeliveryCity(e.target.value);
  }

    async function getValidZipCodes(){
        const url = `https://api.dataforsyningen.dk/postnumr`;
        const response = await fetch(url);
        const zipCodes = (await response.json()) as [{
            nr: string;
            navn: string;

        }];
        setValidZipCodes(zipCodes);
    }

    //
    const handleActivateDeliveryAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        activateDeliveryAddress: checked,
      }));
    };
    
    //



    async function getValidDeliveryZipCodes(){
      const url = `https://api.dataforsyningen.dk/postnumr`;
      const response = await fetch(url);
      const deliveryZipCodes = (await response.json()) as [{
          nr: string;
          navn: string;

      }];
      setValidDeliveryZipCodes(deliveryZipCodes);
  }

    
  function sendData(){
    let body = JSON.stringify({
      formData: formData,
      items: itemList,
    });
    console.log(body);
    fetch('https://mywebsite.com/endpoint/', { // byttes med det rigtige end point
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body
    });
  }
  
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
    if (!validZipCodes.find(z => z.nr == formData.zipCode)){
      validationErrors.zipCode = "Ikke korrekt Postnummer";
    }

    formData.city = city;
    if (!formData.city.trim()) {
      validationErrors.city = 'Postnummer forventet';
    }
    formData.deliveryCity = deliveryCity;
    if (!formData.deliveryCity.trim()) {
      validationErrors.deliveryCity = 'Postnummer forventet';
    }

    
    if (term) {
      setTermError("");
    }
    else {
      setTermError("Feltet skal udfyldes.");
    }
   
    



    setErrors(validationErrors);

    // Check if there are no validation errors
    setIsValid(Object.keys(validationErrors).length === 0);

    // Perform actions if the form is valid
    if (isValid) {
      sendData();
      console.log('Form submitted successfully:', formData);
      // Redirect to the payment page

      navigate('/payment');
    }
  };
  


  // NEW
  const InputField: React.FC<{
    label: string;
    name: keyof FormData;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error: string | undefined;
  }> = ({ label, name, value, onChange, error }) => (
    <div style={{ display: 'flex', marginBottom: '10px' }}>
      <div style={{ width: '20%', marginRight: '10px' }}>
        <label htmlFor={name}>{label}</label>
      </div>
      <div style={{ flex: '1' }}>
        <input type="text" id={name} name={name} value={value} onChange={onChange} />
        <div>{error && <span>{error}</span>}</div>
      </div>
    </div>
  );
  
  // Usage:
  
  
  
  
  
  
  
  // Repeat this for other fields like last name, address line 1, address line 2, phone, email, company name, and VAT.
  
  // NEW

  return (
    
    <form onSubmit={handleFormSubmit} className="formStyling">


      
      {/* Country */}
      <div>
        <label htmlFor="country" style={{ marginBottom: '20px' }}>Land</label>
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

    
    
    {/* ----------------------------- ADDRESSES ----------------------------- */}

    <div style={{ display: 'flex' }}>
      <div style={{ width: '25%' }}>
        <label>Adresse linje 1</label>
      </div>
      <div style={{ width: '100%' }}>
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
      <div style={{ width: '10%' }}>
          <label>Telefonnummer</label>
        </div>
        <div style={{ width: '100%' }}>
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

      <div style={{ width: '120%' }}>
        
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
      <div style={{ width: '35%' }}>
        <label>Virksomheds Navn</label>
      </div>
      <div style={{ width: '100%' }}>
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
      <div style={{ display: 'flex'}}>
              <div style={{ width: '20%' }}>
                <label>Postnummer</label>
              </div>
              <div style={{ width: '100%' }}>
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
      
       {/* ----------------------------- Optionel comment ----------------------------- */}
        <p>
       <label htmlFor="optionalComment    ">Optional Comment</label>
        <br />
        <textarea
          cols={35}
          rows={5}  
          name="optionalComment"
          value={formData.optionalComment}
          onChange={handleCommentChange}
        />
        </p>

     
      
      
      


      <div>
        <input id="newsLetter" type="checkbox" checked={formData.newsLetter} onChange={handleNesLetterChange} ></input>
        <label htmlFor="newsLetter">Tilmeld mig nyhedsbrevet</label>
      </div>
      
      
      <div>
        <input id="term" type="checkbox" checked={term} onChange={() => setTerm(!term)}></input>
        <label htmlFor="term">Jeg accepterer købs og forretningsbetingelser</label>
        <div>
          {termError && <span>{termError}</span>}
        </div>
      </div>

      
      



        {/*---------------------------------------------------------------*/}
      
    {<h3>leverings adresse</h3>}

    <div>
      <input
        id="activateDeliveryAddress"
        type="checkbox"
        checked={formData.activateDeliveryAddress}
        onChange={handleActivateDeliveryAddressChange}
      />
      <label htmlFor="activateDeliveryAddress">Brug anden leverings adresse</label>
    </div>


{/* ----------------------------- deliveryNAMES -----------------------------*/}
{formData.activateDeliveryAddress && (
  <div>
<div className="deliveryname-fields">
    <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
            <label htmlFor="deliveryFirstName">Fornavn</label>
        </div>
        
        <div style={{ width: '50%' }}>
            <label htmlFor="deliveryLastName">Efternavn</label>
        </div>
    </div>

    <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
            <input
                type="text"
                id="deliveryFirstName"
                name="deliveryFirstName"
                value={formData.deliveryFirstName}
                onChange={handleInputChange}
            />
            <div> 
                {errors.deliveryFirstName && <span>{errors.deliveryFirstName}</span>}
            </div>
        </div>

        <div style={{ width: '50%' }}>
            <input
                type="text"
                id="deliveryLastName"
                name="deliveryLastName"
                value={formData.deliveryLastName}
                onChange={handleInputChange}
            />
            <div>
                {errors.deliveryLastName && <span>{errors.deliveryLastName}</span>}
            </div>
        </div>
    </div>
</div>

    
    {/* ----------------------------- ADDRESSES -----------------------------*/}

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
          name="deliveryaddressLine1"
          value={formData.deliveryaddressLine1}
          onChange={handleInputChange}
        /> 
        <div>
        {errors.deliveryaddressLine1 && <span>{errors.deliveryaddressLine1}</span>}
        </div>
      </div>

      
      <div style={{ width: '50%' }}>
        <input
          type="text"
          name="deliveryaddressLine2"
          value={formData.deliveryaddressLine2}
          onChange={handleInputChange}
        />
        </div>
      </div>

    {/* ----------------------------- Phone and Email -----------------------------*/}

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
          type="deliveryPhone"
          name="deliveryPhone"
          value={formData.deliveryPhone}
          onChange={handleInputChange}
        />
        <div>
        {errors.deliveryPhone && <span>{errors.deliveryPhone}</span>}
        </div>
      </div>

      <div style={{ width: '50%' }}>
        
        <input
          type="deliveryEmail"
          name="deliveryEmail"
          value={formData.deliveryEmail}
          onChange={handleInputChange}
        />
        <div>
        {errors.deliveryEmail && <span>{errors.deliveryEmail}</span>}
        </div>
      </div>
      </div>


        {/* ----------------------------- ZipCode and City -----------------------------*/}
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
            <input type="text"value={deliveryZipCode} onChange={deliveryZipCodeChanged} ></input>
            <div>
              {errors.deliveryZipCode && <span>{errors.deliveryZipCode}</span>}
            </div>
          </div>


          <div style={{ width: '50%' }}>
            <input id="deliveryCity" type="text" value={deliveryCity} onChange={deliveryCityChange} ></input>
            <div>
              {errors.deliveryCity && <span>{errors.deliveryCity}</span>}
            </div>
          </div> 
        </div>
      

      
      <button type="submit">
        Til Betaling
      </button>
      <div>
        <Link to="/cart">
          <button type = "submit">Tilbage til indkøbskurv</button>
        </Link>
      </div>
    </div>
)}

    </form>
    
    
  );
};

export default CheckoutForm;
