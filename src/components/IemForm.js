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
    category: '',
    driverType: '',
    impedance: '',
    sensitivity: '',
    frequencyResponse: '',
    frequencyResponseChart: '',
    imageUrl: '/api/placeholder/300/300',
  };
  
  const [formData, setFormData] = useState(emptyForm);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewChart, setPreviewChart] = useState(null);
  
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
    
    // Handle numeric values
    if (name === 'price' || name === 'impedance' || name === 'sensitivity') {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({
          ...formData,
          imageUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleChartUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewChart(reader.result);
        setFormData({
          ...formData,
          frequencyResponseChart: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
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
        <div className="form-section">
          <h3>Basic Information</h3>
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
            <label>Category</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="Budget">Budget (&lt; $50)</option>
              <option value="Mid-Fi">Mid-Fi ($50 - $200)</option>
              <option value="Hi-Fi">Hi-Fi ($200 - $500)</option>
              <option value="Premium">Premium ($500+)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
            {(previewImage || formData.imageUrl) && (
              <div className="image-preview">
                <img 
                  src={previewImage || formData.imageUrl} 
                  alt="IEM preview" 
                  width="150" 
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="form-section">
          <h3>Technical Specifications</h3>
          <div className="form-group">
            <label>Driver Type</label>
            <select 
              name="driverType" 
              value={formData.driverType} 
              onChange={handleChange}
            >
              <option value="">Select driver type</option>
              <option value="Dynamic">Dynamic Driver</option>
              <option value="Balanced Armature">Balanced Armature</option>
              <option value="Planar Magnetic">Planar Magnetic</option>
              <option value="Hybrid">Hybrid (Dynamic + BA)</option>
              <option value="Multi-driver">Multi-driver BA</option>
              <option value="Tribrid">Tribrid (Dynamic + BA + EST)</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Impedance (ohms)</label>
            <input
              type="number"
              name="impedance"
              value={formData.impedance}
              onChange={handleChange}
              placeholder="32"
            />
          </div>
          
          <div className="form-group">
            <label>Sensitivity (dB/mW)</label>
            <input
              type="number"
              name="sensitivity"
              value={formData.sensitivity}
              onChange={handleChange}
              placeholder="100"
            />
          </div>
          
          <div className="form-group">
            <label>Frequency Response (Hz)</label>
            <input
              type="text"
              name="frequencyResponse"
              value={formData.frequencyResponse}
              onChange={handleChange}
              placeholder="20Hz - 20kHz"
            />
          </div>
          
          <div className="form-group">
            <label>Frequency Response Chart</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleChartUpload}
              className="file-input"
            />
            {(previewChart || formData.frequencyResponseChart) && (
              <div className="chart-preview">
                <img 
                  src={previewChart || formData.frequencyResponseChart} 
                  alt="Frequency response chart" 
                  width="300" 
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="form-section">
          <h3>Sound Characteristics</h3>
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
              placeholder="Describe the IEM's sound, build quality, comfort, etc..."
            />
          </div>
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