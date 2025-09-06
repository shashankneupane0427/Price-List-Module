import React from 'react';

const Header = ({ onMenuToggle }) => {
  // Replace this with your flag URL
  const englishFlagUrl = 'https://example.com/uk-flag.png';

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
        <span>English</span>
        <img src="https://img.freepik.com/free-vector/illustration-uk-flag_53876-18166.jpg?semt=ais_hybrid&w=740&q=80" alt="English" className="flag" style={{ width: '45px', height: '24px' }} />
      </div>
    </header>
  );
};

export default Header;
