import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import ItemDetail from './components/ItemDetail';
import './App.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    navigate(`/item/${item._id}`);
  };

  return (
    <div className="App">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">Fuzzy Search with Autocomplete</h1>
          <p className="app-subtitle">
            Smart search powered by Fuse.js - Try typing with typos!
          </p>
        </header>

        <SearchBar onItemSelect={handleItemSelect} />

        {selectedItem && (
          <div className="selected-item-preview">
            <p>Selected: <strong>{selectedItem.name}</strong></p>
          </div>
        )}

        <div className="features-section">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Fuzzy Matching</h3>
              <p>Find results even with typos and partial words</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Real-time Search</h3>
              <p>Instant suggestions as you type with debouncing</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⌨️</div>
              <h3>Keyboard Navigation</h3>
              <p>Use arrow keys to navigate suggestions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Responsive Design</h3>
              <p>Works perfectly on all devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/item/:id" element={<ItemDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

