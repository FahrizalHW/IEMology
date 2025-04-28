import React from 'react';

function StarRating({ rating }) {
  const roundedRating = Math.round(rating * 2) / 2;
  
  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(<span key={i} className="star full">★</span>);
      } else if (i - 0.5 === roundedRating) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star empty">☆</span>);
      }
    }
    
    return stars;
  };
  
  return <div className="star-rating">{renderStars()}</div>;
}

export default StarRating;

