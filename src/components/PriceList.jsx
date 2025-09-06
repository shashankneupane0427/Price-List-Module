import React, { useState, useEffect, useRef, useCallback } from 'react';
import ProductRow from './ProductRow';
import apiService from '../services/api';

const PriceList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Store debounce timers for each product
  const updateTimeout = useRef({});

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getProducts();

      if (response.success) {
        setProducts(response.data);
      } else {
        setError('Failed to load products');
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleProductSelect = (productId) => {
    setSelectedProduct(selectedProduct === productId ? null : productId);
  };

  // Debounced product update
  const handleProductUpdate = useCallback((productId, field, value) => {
    // Update UI immediately
    setProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, [field]: value } : p))
    );

    // Clear previous timer
    if (updateTimeout.current[productId]) {
      clearTimeout(updateTimeout.current[productId]);
    }

    // Set new debounce timer
    updateTimeout.current[productId] = setTimeout(async () => {
      try {
        const updateData = { [field]: value };
        const response = await apiService.updateProduct(productId, updateData);
        if (!response.success) {
          console.error('Failed to update:', response.error);
        }
      } catch (err) {
        console.error('Server error:', err);
      }
    }, 800); // 800ms debounce
  }, []);

  // Immediate update on Enter key
  const handleImmediateUpdate = async (productId, field, value) => {
    // Cancel any existing debounce timer
    if (updateTimeout.current[productId]) {
      clearTimeout(updateTimeout.current[productId]);
    }

    // Update UI immediately
    setProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, [field]: value } : p))
    );

    // Send immediate API request
    try {
      const updateData = { [field]: value };
      const response = await apiService.updateProduct(productId, updateData);
      if (!response.success) {
        console.error('Failed to update:', response.error);
      }
    } catch (err) {
      console.error('Server error:', err);
    }
  };

  const formatNumber = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('no-NO').format(Number(value));
  };

  if (loading) {
    return (
      <div className="content-area">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-area">
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={loadProducts} className="btn btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="content-area">
      <div className="content-header">
        <div className="search-controls">
          <input type="text" placeholder="Search Article No ..." className="search-input" disabled />
          <input type="text" placeholder="Search Product ..." className="search-input" disabled />
        </div>
        <div className="action-buttons">
          <button className="btn btn-primary">+ New Product</button>
          <button className="btn btn-secondary">Print List</button>
          <button className="btn btn-info">Advanced mode</button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="price-table desktop-view">
        <div className="table-header">
          <div></div>
          <div>Article No. ↕</div>
          <div>Product/Service ↕</div>
          <div className="in-price">In Price</div>
          <div>Price</div>
          <div>Unit</div>
          <div>In Stock</div>
          <div className="description">Description</div>
        </div>
        <div className="table-body">
          {products.map(product => (
            <ProductRow
              key={product.id}
              product={product}
              isSelected={selectedProduct === product.id}
              onSelect={handleProductSelect}
              onUpdate={handleProductUpdate}
              onEnterSave={handleImmediateUpdate}
              viewType="desktop"
            />
          ))}
        </div>
      </div>

      {/* Tablet Table */}
      <div className="price-table tablet-view">
        <div className="tablet-header">
          <div></div>
          <div>Article No.</div>
          <div>Product/Service</div>
          <div>Price</div>
          <div>In Stock</div>
          <div>Unit</div>
          <div></div>
        </div>
        <div className="table-body">
          {products.map(product => (
            <ProductRow
              key={product.id}
              product={product}
              isSelected={selectedProduct === product.id}
              onSelect={handleProductSelect}
              onUpdate={handleProductUpdate}
              onEnterSave={handleImmediateUpdate}
              viewType="tablet"
            />
          ))}
        </div>
      </div>

      {/* Mobile Landscape */}
      <div className="mobile-landscape-view">
        {products.map(product => (
          <div key={product.id} className="mobile-landscape-card">
            <div className="mobile-landscape-header">
              <span>Product/Service</span>
              <span>Price</span>
            </div>
            <div className="mobile-landscape-row">
              <input
                type="text"
                value={product.product_service}
                onChange={(e) => handleProductUpdate(product.id, 'product_service', e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleImmediateUpdate(product.id, 'product_service', e.target.value);
                }}
                className="mobile-landscape-input"
              />
              <input
                type="text"
                value={product.price}
                onChange={(e) => handleProductUpdate(product.id, 'price', e.target.value.replace(/\D/g, ''))}
                onBlur={(e) => e.target.value = formatNumber(product.price)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleImmediateUpdate(product.id, 'price', e.target.value.replace(/\D/g, ''));
                }}
                className="mobile-landscape-input price-input"
              />
              <button className="mobile-more-actions">⋯</button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Portrait */}
      <div className="mobile-portrait-view">
        {products.map(product => (
          <div key={product.id} className="mobile-portrait-card">
            <div className="mobile-portrait-header">
              <span>Product/Service</span>
            </div>
            <input
              type="text"
              value={product.product_service}
              onChange={(e) => handleProductUpdate(product.id, 'product_service', e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleImmediateUpdate(product.id, 'product_service', e.target.value);
              }}
              className="mobile-portrait-input"
            />
            <div className="mobile-portrait-header">
              <span>Price</span>
            </div>
            <div className="mobile-portrait-price-row">
              <input
                type="text"
                value={product.price}
                onChange={(e) => handleProductUpdate(product.id, 'price', e.target.value.replace(/\D/g, ''))}
                onBlur={(e) => e.target.value = formatNumber(product.price)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleImmediateUpdate(product.id, 'price', e.target.value.replace(/\D/g, ''));
                }}
                className="mobile-portrait-input price-input"
              />
              <button className="mobile-more-actions">⋯</button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && !loading && (
        <div className="no-products">
          <p>No products found.</p>
        </div>
      )}
    </div>
  );
};

export default PriceList;
