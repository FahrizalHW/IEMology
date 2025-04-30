import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

function IemDetail({ iems, onAddReview }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const iem = iems.find(iem => iem.id === parseInt(id));
  
  const [newReview, setNewReview] = useState({
    user: '',
    text: '',
    rating: 5
  });
  
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: name === 'rating' ? parseFloat(value) : value
    });
  };
  
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    if (!newReview.user || !newReview.text) {
      alert('Please fill in all required fields for the review');
      return;
    }
    
    onAddReview(iem.id, newReview);
    
    // Reset the form
    setNewReview({
      user: '',
      text: '',
      rating: 5
    });
  };
  
  if (!iem) {
    return (
      <div className="not-found">
        <h2>IEM Not Found</h2>
        <p>The IEM you're looking for doesn't exist.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }
  
  return (
    <div className="iem-detail-container">
      <div className="iem-detail-header">
        <button onClick={() => navigate('/')} className="back-btn">
          &larr; Back to List
        </button>
        <h2>{iem.name}</h2>
      </div>
      
      <div className="iem-detail-content">
        <div className="iem-detail-image">
          <img src={iem.imageUrl} alt={iem.name} />
        </div>
        
        <div className="iem-detail-info">
          <p className="iem-brand"><strong>Brand:</strong> {iem.brand}</p>
          <p className="iem-price"><strong>Price:</strong> ${iem.price.toFixed(2)}</p>
          <div className="iem-rating">
            <strong>Rating:</strong> 
            <StarRating rating={iem.rating} />
            <span>({iem.rating.toFixed(1)})</span>
          </div>
          <p className="iem-sound"><strong>Sound Signature:</strong> {iem.soundSignature || 'Not specified'}</p>
          <p className="iem-description"><strong>Description:</strong> {iem.description}</p>
          
          <div className="iem-actions">
            <Link to={`/edit/${iem.id}`} className="edit-btn">Edit IEM</Link>
          </div>
        </div>
      </div>
      
      <div className="iem-reviews">
        <h3>Reviews ({iem.reviews.length})</h3>
        
        <div className="review-list">
          {iem.reviews.length > 0 ? (
            iem.reviews.map(review => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <span className="review-user">{review.user}</span>
                  <StarRating rating={review.rating} />
                </div>
                <p className="review-text">{review.text}</p>
              </div>
            ))
          ) : (
            <p className="no-reviews">No reviews yet. Be the first to review!</p>
          )}
        </div>
        
        <div className="add-review">
          <h4>Add Your Review</h4>
          <form onSubmit={handleReviewSubmit} className="review-form">
            <div className="form-group">
              <label>Your Name*</label>
              <input
                type="text"
                name="user"
                value={newReview.user}
                onChange={handleReviewChange}
                required
                placeholder="Your username"
              />
            </div>
            
            <div className="form-group">
              <label>Rating*</label>
              <select 
                name="rating" 
                value={newReview.rating} 
                onChange={handleReviewChange}
              >
                <option value="5">5 - Excellent</option>
                <option value="4.5">4.5 - Great</option>
                <option value="4">4 - Very Good</option>
                <option value="3.5">3.5 - Good</option>
                <option value="3">3 - Average</option>
                <option value="2.5">2.5 - Below Average</option>
                <option value="2">2 - Poor</option>
                <option value="1.5">1.5 - Very Poor</option>
                <option value="1">1 - Terrible</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Your Review*</label>
              <textarea
                name="text"
                value={newReview.text}
                onChange={handleReviewChange}
                required
                rows="4"
                placeholder="Share your experience with this IEM..."
              />
            </div>
            
            <button type="submit" className="submit-review-btn">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default IemDetail;