import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PriceList from './components/PriceList';
import './styles/main.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-container">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={handleSidebarClose} 
      />
      <div className="main-content">
        <Header 
          onMenuToggle={handleMenuToggle}
        />
        <PriceList />
      </div>
    </div>
  );
}

export default App;