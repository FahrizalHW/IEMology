import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

function IemList({ iems, onDelete, wishlist, compareList, onToggleWishlist, onToggleCompare }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  const filteredIems = iems.filter(iem => {
    const matchesSearch = 
      iem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      iem.brand.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = 
      categoryFilter === '' || iem.category === categoryFilter;
      
    return matchesSearch && matchesCategory;
  });
  
  const sortedIems = [...filteredIems].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    } else if (sortBy === 'priceDesc') {
      return b.price - a.price;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="iem-list-container">
      <div className="filter-section">
        <div className="search-filters">
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
            <option value="price">Sort by Price (Low to High)</option>
            <option value="priceDesc">Sort by Price (High to Low)</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
        
        <div className="category-filters">
          <button 
            className={categoryFilter === '' ? 'category-btn active' : 'category-btn'}
            onClick={() => setCategoryFilter('')}
          >
            All
          </button>
          <button 
            className={categoryFilter === 'Budget' ? 'category-btn active' : 'category-btn'}
            onClick={() => setCategoryFilter('Budget')}
          >
            Budget
          </button>
          <button 
            className={categoryFilter === 'Mid-Fi' ? 'category-btn active' : 'category-btn'}
            onClick={() => setCategoryFilter('Mid-Fi')}
          >
            Mid-Fi
          </button>
          <button 
            className={categoryFilter === 'Hi-Fi' ? 'category-btn active' : 'category-btn'}
            onClick={() => setCategoryFilter('Hi-Fi')}
          >
            Hi-Fi
          </button>
          <button 
            className={categoryFilter === 'Premium' ? 'category-btn active' : 'category-btn'}
            onClick={() => setCategoryFilter('Premium')}
          >
            Premium
          </button>
        </div>
      </div>
      
      {sortedIems.length > 0 ? (
        <div className="iem-grid">
          {sortedIems.map(iem => (
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
                  className={`wishlist-btn ${wishlist.includes(iem.id) ? 'active' : ''}`}
                  onClick={() => onToggleWishlist(iem.id)}
                  title={wishlist.includes(iem.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  {wishlist.includes(iem.id) ? "★" : "☆"}
                </button>
                
                <button 
                  className={`compare-btn ${compareList.includes(iem.id) ? 'active' : ''}`}
                  onClick={() => onToggleCompare(iem.id)}
                  title={compareList.includes(iem.id) ? "Remove from Compare" : "Add to Compare"}
                >
                  {compareList.includes(iem.id) ? "✓" : "⊕"}
                </button>
                
                <Link to={`/edit/${iem.id}`} className="edit-btn" title="Edit">
                  ✎
                </Link>
                
                <button 
                  className="delete-btn" 
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ${iem.name}?`)) {
                      onDelete(iem.id);
                    }
                  }}
                  title="Delete"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No IEMs match your search criteria.</p>
        </div>
      )}
    </div>
  );
}

export default IemList;