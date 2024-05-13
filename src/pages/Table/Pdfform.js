import React, { useState } from 'react';
import "./pdfform.css"

const Pdfform = ({ addNewEntry }) => {
  const [formData, setFormData] = useState({
    Name: '',
    Age: '',
    Address: '',
    place: '',
    designation: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.Name && formData.Age && formData.Address && formData.place && formData.designation) {
      addNewEntry(formData);
      setFormData({
        Name: '',
        Age: '',
        Address: '',
        place: '',
        designation: '',
      });
    }
  };

  return (
    <div className="pdf-form">
    <h1 className='custom-h1'>PDF Form</h1>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Enter the name</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleInputChange}
            placeholder="Enter Name"
            required
          />
        </div>
    
        <div className="form-group">
          <label htmlFor="age" className="form-label">Enter the Age</label>
          <input
            type="text"
            name="Age"
            value={formData.Age}
            onChange={handleInputChange}
            placeholder="Enter Age"
            required
          />
        </div>
    
        <div className="form-group">
          <label htmlFor="address" className="form-label">Enter the Address</label>
          <input
            type="text"
            name="Address"
            value={formData.Address}
            onChange={handleInputChange}
            placeholder="Enter Address"
            required
          />
        </div>
    
        <div className="form-group">
          <label htmlFor="email" className="form-label">Enter the place</label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleInputChange}
            placeholder="Enter Place"
            required
          />
        </div>
      
        <div className="form-group">
          <label htmlFor="email" className="form-label">Enter the Designation</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            placeholder="Enter Designation"
            required
          />
        </div>
    
        <div className="pdf-form-buttons">
        <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Pdfform;
