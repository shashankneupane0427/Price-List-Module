import React from 'react';

const Header = ({ onMenuToggle }) => {
  return (
    <header className="header">
      <div className="user-info">
        <button className="mobile-menu-toggle" onClick={onMenuToggle}>
          ☰
        </button>
        <div className="user-avatar">JA</div>
        <div className="user-details">
          <h3>John Andre</h3>
          <p>Storfjord AS</p>
        </div>
      </div>
      <div className="language-display">
        <span>Norsk Bokmål</span>
        <span className="flag">🇳🇴</span>
      </div>
    </header>
  );
};

export default Header;