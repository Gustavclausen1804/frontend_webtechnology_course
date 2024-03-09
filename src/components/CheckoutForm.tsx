import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  addressLine1: string;
  addressLine2: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  companyName: string;
  vatNumber: string;
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
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validation
    const validationErrors: Partial<FormData> = {};

    if (!formData.addressLine1.trim()) {
      validationErrors.addressLine1 = 'Address Line 1 is required';
    }

    if (!formData.firstName.trim() || /\d/.test(formData.firstName)) {
      validationErrors.firstName =
        'First Name is required and should not contain numbers';
    }

    if (!formData.lastName.trim() || /\d/.test(formData.lastName)) {
      validationErrors.lastName =
        'Last Name is required and should not contain numbers';
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

    if (formData.vatNumber && !/^\d{8}$/.test(formData.vatNumber)) {
      validationErrors.vatNumber = 'VAT Number must be 8 digits';
    }

    setErrors(validationErrors);

    // Perform actions if the form is valid
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted successfully:', formData);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label>Address Line 1</label>
        <input
          type="text"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleInputChange}
        />
        {errors.addressLine1 && <span>{errors.addressLine1}</span>}
      </div>

      <div>
        <label>Address Line 2</label>
        <input
          type="text"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={handleInputChange}
        />
      </div>

      <div className="name-fields">
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
          {errors.firstName && <span>{errors.firstName}</span>}
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
          {errors.lastName && <span>{errors.lastName}</span>}
        </div>
      </div>

      <div>
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        {errors.phone && <span>{errors.phone}</span>}
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div>
        <label>Company Name</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
        />
        {errors.companyName && <span>{errors.companyName}</span>}
      </div>

      <div>
        <label>VAT Number</label>
        <input
          type="text"
          name="vatNumber"
          value={formData.vatNumber}
          onChange={handleInputChange}
        />
        {errors.vatNumber && <span>{errors.vatNumber}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CheckoutForm;
