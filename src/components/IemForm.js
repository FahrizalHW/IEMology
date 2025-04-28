import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function IemForm({ iems, onSubmit, isEditing }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const emptyForm = {
    name: '',
    brand: '',
    price: '',
    description: '',
    soundSignature: '',
    imageUrl: '/api/placeholder/300/300',
  };
  
  const [formData, setFormData] = useState(emptyForm);
  
  useEffect(() => {
    if (isEditing && iems) {
      const iemToEdit = iems.find(iem => iem.id === parseInt(id));
      if (iemToEdit) {
        setFormData(iemToEdit);
      }
    }
  }, [isEditing, iems, id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.brand || !formData.price) {
      alert('Please fill in all required fields (name, brand, price)');
      return;
    }
    
    onSubmit(formData);
    navigate('/');
  };
  
  return (
    <div className="iem-form-container">
      <h2>{isEditing ? 'Edit IEM' : 'Add New IEM'}</h2>
      <form onSubmit={handleSubmit} className="iem-form">
        <div className="form-group">
          <label>Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="IEM name"
          />
        </div>
        
        <div className="form-group">
          <label>Brand*</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            placeholder="Manufacturer"
          />
        </div>
        
        <div className="form-group">
          <label>Price (USD)*</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>
        
        <div className="form-group">
          <label>Sound Signature</label>
          <select 
            name="soundSignature" 
            value={formData.soundSignature} 
            onChange={handleChange}
          >
            <option value="">Select a sound signature</option>
            <option value="Neutral">Neutral</option>
            <option value="Bright">Bright</option>
            <option value="Warm">Warm</option>
            <option value="V-shaped">V-shaped</option>
            <option value="Harman-inspired">Harman-inspired</option>
            <option value="Bass-heavy">Bass-heavy</option>
            <option value="Mid-forward">Mid-forward</option>
            <option value="Analytical">Analytical</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe the IEM..."
          />
        </div>
        
        <div className="form-buttons">
          <button type="button" onClick={() => navigate('/')} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            {isEditing ? 'Update IEM' : 'Add IEM'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default IemForm;