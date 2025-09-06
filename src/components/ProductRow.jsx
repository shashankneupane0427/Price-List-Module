import React from 'react';

const ProductRow = ({ product, isSelected, onSelect, onUpdate, viewType }) => {
  const formatNumber = (value) => {
    return new Intl.NumberFormat('no-NO').format(value);
  };

  if (viewType === 'tablet') {
    return (
      <div className={`tablet-row ${isSelected ? 'selected' : ''}`}>
        <div className="row-selector" onClick={() => onSelect(product.id)}>
          {isSelected && <div className="select-arrow"></div>}
        </div>
        <input
          type="text"
          value={product.article_no}
          onChange={(e) => onUpdate(product.id, 'article_no', e.target.value)}
          className="editable-field"
        />
        <input
          type="text"
          value={product.product_service}
          onChange={(e) => onUpdate(product.id, 'product_service', e.target.value)}
          className="editable-field"
        />
        <input
          type="text"
          value={formatNumber(product.price)}
          onChange={(e) => onUpdate(product.id, 'price', e.target.value.replace(/\D/g, ''))}
          className="editable-field"
        />
        <input
          type="text"
          value={formatNumber(product.in_stock)}
          onChange={(e) => onUpdate(product.id, 'in_stock', e.target.value.replace(/\D/g, ''))}
          className="editable-field"
        />
        <input
          type="text"
          value={product.unit}
          onChange={(e) => onUpdate(product.id, 'unit', e.target.value)}
          className="editable-field"
        />
        <div className="actions">
          <button className="more-actions">⋯</button>
        </div>
      </div>
    );
  }

  // Desktop view
  return (
    <div className={`product-row ${isSelected ? 'selected' : ''}`}>
      <div className="row-selector" onClick={() => onSelect(product.id)}>
        {isSelected && <div className="select-arrow"></div>}
      </div>
      <input
        type="text"
        value={product.article_no}
        onChange={(e) => onUpdate(product.id, 'article_no', e.target.value)}
        className="editable-field"
      />
      <input
        type="text"
        value={product.product_service}
        onChange={(e) => onUpdate(product.id, 'product_service', e.target.value)}
        className="editable-field"
      />
      <input
        type="text"
        value={formatNumber(product.in_price || 0)}
        onChange={(e) => onUpdate(product.id, 'in_price', e.target.value.replace(/\D/g, ''))}
        className="editable-field in-price"
      />
      <input
        type="text"
        value={formatNumber(product.price)}
        onChange={(e) => onUpdate(product.id, 'price', e.target.value.replace(/\D/g, ''))}
        className="editable-field"
      />
      <input
        type="text"
        value={product.unit}
        onChange={(e) => onUpdate(product.id, 'unit', e.target.value)}
        className="editable-field"
      />
      <input
        type="text"
        value={formatNumber(product.in_stock)}
        onChange={(e) => onUpdate(product.id, 'in_stock', e.target.value.replace(/\D/g, ''))}
        className="editable-field"
      />
      <input
        type="text"
        value={product.description || ''}
        onChange={(e) => onUpdate(product.id, 'description', e.target.value)}
        className="editable-field description"
      />
      <div className="actions">
        <button className="more-actions">⋯</button>
      </div>
    </div>
  );
};

export default ProductRow;