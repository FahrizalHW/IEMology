import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

function IemList({ iems, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  
  const filteredIems = iems.filter(iem => 
    iem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    iem.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedIems = [...filteredIems].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="iem-list-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or brand..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>
      
      <div className="iem-grid">
        {sortedIems.length > 0 ? (
          sortedIems.map(iem => (
            <div key={iem.id} className="iem-card">
              <img src={iem.imageUrl} alt={iem.name} className="iem-image" />
              <h3>{iem.name}</h3>
              <p className="iem-brand">{iem.brand}</p>
              <p className="iem-price">${iem.price.toFixed(2)}</p>
              <div className="iem-rating">
                <StarRating rating={iem.rating} />
                <span>({iem.reviews.length} reviews)</span>
              </div>
              <div className="iem-actions">
                <Link to={`/iem/${iem.id}`} className="view-btn">View Details</Link>
                <Link to={`/edit/${iem.id}`} className="edit-btn">Edit</Link>
                <button 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this IEM?')) {
                      onDelete(iem.id);
                    }
                  }}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No IEMs found. Try a different search term.</p>
        )}
      </div>
    </div>
  );
}

export default IemList;