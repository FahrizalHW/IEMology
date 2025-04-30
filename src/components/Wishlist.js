import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

function Wishlist({ iems, wishlist, onToggleWishlist, compareList, onToggleCompare }) {
  const wishlistItems = iems.filter(iem => wishlist.includes(iem.id));
  
  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      
      {wishlistItems.length > 0 ? (
        <div className="iem-grid">
          {wishlistItems.map(iem => (
            <div key={iem.id} className="iem-card">
              <img src={iem.imageUrl} alt={iem.name} className="iem-image" />
              <h3>{iem.name}</h3>
              <p className="iem-brand">{iem.brand}</p>
              <p className="iem-price">${iem.price.toFixed(2)}</p>
              <div className="iem-rating">
                <StarRating rating={iem.rating} />
                <span>({iem.rating.toFixed(1)})</span>
              </div>
              
              <div className="iem-actions primary">
                <Link to={`/iem/${iem.id}`} className="view-btn">View Details</Link>
              </div>
              
              <div className="iem-actions secondary">
                <button 
                  className="wishlist-btn active"
                  onClick={() => onToggleWishlist(iem.id)}
                  title="Remove from Wishlist"
                >
                  ★
                </button>
                
                <button 
                  className={`compare-btn ${compareList.includes(iem.id) ? 'active' : ''}`}
                  onClick={() => onToggleCompare(iem.id)}
                  title={compareList.includes(iem.id) ? "Remove from Compare" : "Add to Compare"}
                >
                  {compareList.includes(iem.id) ? "✓" : "⊕"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>Your wishlist is empty.</p>
          <Link to="/" className="back-link">Browse IEMs</Link>
        </div>
      )}
    </div>
  );
}

export default Wishlist;