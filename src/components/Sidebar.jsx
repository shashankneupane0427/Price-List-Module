import React from 'react';

const Sidebar = ({ isOpen, onClose, translations }) => {
  const t = translations?.translations || {};
  
  const menuItems = [
    { name: t.invoices || 'Invoices', icon: '📄', active: false },
    { name: t.customers || 'Customers', icon: '👥', active: false },
    { name: t.myBusiness || 'My Business', icon: '⚙️', active: false },
    { name: t.invoiceJournal || 'Invoice Journal', icon: '📊', active: false },
    { name: t.priceList || 'Price List', icon: '💰', active: true },
    { name: t.multipleInvoicing || 'Multiple Invoicing', icon: '📋', active: false },
    { name: t.unpaidInvoices || 'Unpaid Invoices', icon: '⭕', active: false },
    { name: t.offer || 'Offer', icon: '📝', active: false },
    { name: t.inventoryControl || 'Inventory Control', icon: '📦', active: false },
    { name: t.memberInvoicing || 'Member Invoicing', icon: '👤', active: false },
    { name: t.importExport || 'Import/Export', icon: '🔄', active: false },
    { name: t.logOut || 'Log out', icon: '🚪', active: false }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <h3>{t.menu || 'Menu'}</h3>
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li key={index} className={item.active ? 'active' : ''}>
            <span className="menu-icon">{item.icon}</span>
            {item.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;