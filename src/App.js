import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import IemList from './components/IemList';
import IemForm from './components/IemForm';
import IemDetail from './components/IemDetail';
import './App.css';

function App() {
  const [iems, setIems] = useState(() => {
    const savedIems = localStorage.getItem('iems');
    return savedIems ? JSON.parse(savedIems) : [
      {
        id: 1,
        name: "Moondrop Aria",
        brand: "Moondrop",
        price: 79.99,
        description: "Single dynamic driver IEM with excellent tonal balance",
        soundSignature: "Harman-inspired",
        imageUrl: "https://down-th.img.susercontent.com/file/cn-11134207-7r98o-looxrc5az4wha0",
        rating: 4.5,
        reviews: [
          { id: 1, user: "audiophile123", text: "Great value for money. Natural sound signature with decent bass.", rating: 4.5 }
        ]
      },
      {
        id: 2,
        name: "KZ ZSN Pro X",
        brand: "KZ",
        price: 29.99,
        description: "Hybrid IEM with 1 dynamic driver and 1 balanced armature",
        soundSignature: "V-shaped",
        imageUrl: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/107/MTA-148637366/kz_kz-zsn-pro-x-knowledge-zenith-earphone_full01.jpg",
        rating: 4.0,
        reviews: [
          { id: 1, user: "basshead_87", text: "Crisp highs and punchy bass. Great for the price!", rating: 4.0 }
        ]
      },
      {
        id: 3,
        name: "Tanchjim Bunny",
        brand: "Tanchjim",
        price: 22.00,
        description: "Neutral IEM with standard treble and bass response",
        soundSignature: "Neutral",
        imageUrl: "https://m.media-amazon.com/images/I/71rJiHiCueL._AC_UF894,1000_QL80_.jpg",
        rating: 4.5,
        reviews: [
          { id: 1, user: "basshead_87", text: "Crisp highs and punchy bass. Great for the price!", rating: 4.5 }
        ]
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('iems', JSON.stringify(iems));
  }, [iems]);

  const addIem = (newIem) => {
    newIem.id = iems.length > 0 ? Math.max(...iems.map(iem => iem.id)) + 1 : 1;
    newIem.reviews = [];
    newIem.rating = 0;
    setIems([...iems, newIem]);
  };

  const updateIem = (updatedIem) => {
    setIems(iems.map(iem => iem.id === updatedIem.id ? updatedIem : iem));
  };

  const deleteIem = (id) => {
    setIems(iems.filter(iem => iem.id !== id));
  };

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

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>IEM Review Catalog</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/add">Add New IEM</Link>
          </nav>
        </header>
        
        <main className="app-content">
          <Routes>
            <Route path="/" element={<IemList iems={iems} onDelete={deleteIem} />} />
            <Route path="/add" element={<IemForm onSubmit={addIem} />} />
            <Route path="/edit/:id" element={<IemForm iems={iems} onSubmit={updateIem} isEditing={true} />} />
            <Route path="/iem/:id" element={<IemDetail iems={iems} onAddReview={addReview} />} />
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