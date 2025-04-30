import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

function CompareIems({ iems, compareList, onToggleCompare }) {
  const navigate = useNavigate();
  const compareItems = iems.filter(iem => compareList.includes(iem.id));
  
  // If less than 2 items to compare, redirect to home
  if (compareItems.length < 2) {
    return (
      <div className="comparison-error">
        <h2>Compare IEMs</h2>
        <p>Please select at least 2 IEMs to compare.</p>
        <Link to="/" className="back-link">Browse IEMs</Link>
      </div>
    );
  }
  
  // Get all unique specs across all items
  const allSpecs = [...new Set(compareItems.flatMap(iem => Object.keys(iem)))];
  
  // Filter to show only relevant specs for comparison
  const specsToCompare = [
    'brand',
    'price',
    'rating',
    'category',
    'driverType',
    'soundSignature',
    'impedance',
    'sensitivity',
    'frequencyResponse'
  ].filter(spec => allSpecs.includes(spec));
  
  return (
    <div className="compare-container">
      <div className="compare-header">
        <h2>Compare IEMs</h2>
        <button onClick={() => navigate('/')} className="back-btn">
          &larr; Back to List
        </button>
      </div>
      
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="feature-column">Feature</th>
              {compareItems.map(iem => (
                <th key={iem.id} className="iem-column">
                  <div className="compare-iem-header">
                    <img src={iem.imageUrl} alt={iem.name} className="compare-image" />
                    <h3>{iem.name}</h3>
                    <button 
                      className="remove-compare-btn"
                      onClick={() => onToggleCompare(iem.id)}
                      title="Remove from comparison"
                    >
                      ✕
                    </button>
                    <Link to={`/iem/${iem.id}`} className="view-details-link">View Details</Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specsToCompare.map(spec => (
              <tr key={spec}>
                <td className="feature-name">
                  {spec.charAt(0).toUpperCase() + spec.slice(1).replace(/([A-Z])/g, ' $1')}
                </td>
                {compareItems.map(iem => (
                  <td key={`${iem.id}-${spec}`} className="feature-value">
                    {spec === 'price' ? (
                      `$${iem[spec].toFixed(2)}`
                    ) : spec === 'rating' ? (
                      <div className="rating-cell">
                        <StarRating rating={iem[spec]} />
                        <span>({iem[spec].toFixed(1)})</span>
                      </div>
                    ) : (
                      iem[spec] || 'N/A'
                    )}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="feature-name">Frequency Response Chart</td>
              {compareItems.map(iem => (
                <td key={`${iem.id}-chart`} className="feature-value chart-cell">
                  {iem.frequencyResponseChart ? (
                    <img 
                      src={iem.frequencyResponseChart} 
                      alt={`${iem.name} frequency response`} 
                      className="response-chart" 
                    />
                  ) : (
                    <span>No chart available</span>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompareIems;
