import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import IemList from './components/IemList';
import IemForm from './components/IemForm';
import IemDetail from './components/IemDetail';
import CompareIems from './components/CompareIems';
import Wishlist from './components/Wishlist';
import './App.css';

function App() {
  const [iems, setIems] = useState(() => {
    // Load from localStorage if available
    const savedIems = localStorage.getItem('iems');
    return savedIems ? JSON.parse(savedIems) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [compareList, setCompareList] = useState(() => {
    const savedCompareList = localStorage.getItem('compareList');
    return savedCompareList ? JSON.parse(savedCompareList) : [];
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('iems', JSON.stringify(iems));
  }, [iems]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  // Add a new IEM
  const addIem = (newIem) => {
    newIem.id = iems.length > 0 ? Math.max(...iems.map(iem => iem.id)) + 1 : 1;
    newIem.reviews = [];
    newIem.rating = 0;
    setIems([...iems, newIem]);
  };

  // Update an existing IEM
  const updateIem = (updatedIem) => {
    setIems(iems.map(iem => iem.id === updatedIem.id ? updatedIem : iem));
  };

  // Delete an IEM
  const deleteIem = (id) => {
    setIems(iems.filter(iem => iem.id !== id));
    // Also remove from wishlist and compare list if present
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(itemId => itemId !== id));
    }
    if (compareList.includes(id)) {
      setCompareList(compareList.filter(itemId => itemId !== id));
    }
  };

  // Add a review to an IEM
  const addReview = (iemId, review) => {
    const iemToUpdate = iems.find(iem => iem.id === iemId);
    if (iemToUpdate) {
      review.id = iemToUpdate.reviews.length > 0 
        ? Math.max(...iemToUpdate.reviews.map(r => r.id)) + 1 
        : 1;
      
      const updatedReviews = [...iemToUpdate.reviews, review];
      const updatedRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
      
      const updatedIem = {
        ...iemToUpdate, 
        reviews: updatedReviews,
        rating: Math.round(updatedRating * 10) / 10
      };
      
      updateIem(updatedIem);
    }
  };

  // Toggle item in wishlist
  const toggleWishlist = (iemId) => {
    if (wishlist.includes(iemId)) {
      setWishlist(wishlist.filter(id => id !== iemId));
    } else {
      setWishlist([...wishlist, iemId]);
    }
  };

  // Toggle item in compare list
  const toggleCompare = (iemId) => {
    if (compareList.includes(iemId)) {
      setCompareList(compareList.filter(id => id !== iemId));
    } else {
      // Limit to 3 items for comparison
      if (compareList.length < 3) {
        setCompareList([...compareList, iemId]);
      } else {
        alert('You can compare maximum 3 IEMs at once. Please remove one from the comparison list first.');
      }
    }
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>IEM Review Catalog</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/add">Add New IEM</Link>
            <Link to="/wishlist">Wishlist {wishlist.length > 0 && `(${wishlist.length})`}</Link>
            <Link to="/compare" className={compareList.length < 2 ? 'disabled-link' : ''}>
              Compare {compareList.length > 0 && `(${compareList.length})`}
            </Link>
          </nav>
        </header>
        
        <main className="app-content">
          <Routes>
            <Route path="/" element={
              <IemList 
                iems={iems} 
                onDelete={deleteIem} 
                wishlist={wishlist}
                compareList={compareList}
                onToggleWishlist={toggleWishlist}
                onToggleCompare={toggleCompare}
              />
            } />
            <Route path="/add" element={<IemForm onSubmit={addIem} />} />
            <Route path="/edit/:id" element={<IemForm iems={iems} onSubmit={updateIem} isEditing={true} />} />
            <Route path="/iem/:id" element={
              <IemDetail 
                iems={iems} 
                onAddReview={addReview}
                wishlist={wishlist}
                compareList={compareList}
                onToggleWishlist={toggleWishlist}
                onToggleCompare={toggleCompare}
              />
            } />
            <Route path="/wishlist" element={
              <Wishlist 
                iems={iems} 
                wishlist={wishlist} 
                onToggleWishlist={toggleWishlist}
                compareList={compareList}
                onToggleCompare={toggleCompare}
              />
            } />
            <Route path="/compare" element={
              <CompareIems 
                iems={iems} 
                compareList={compareList}
                onToggleCompare={toggleCompare}
              />
            } />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <p>© 2025 IEM Review Catalog</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;