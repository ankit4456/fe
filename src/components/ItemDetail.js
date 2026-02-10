import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemById } from '../services/api';
import './ItemDetail.css';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const response = await getItemById(id);
        setItem(response.item);
        setError(null);
      } catch (err) {
        setError('Failed to load item details');
        console.error('Error fetching item:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="item-detail-container">
        <div className="loading-container">
          <div className="spinner-large"></div>
          <p>Loading item details...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="item-detail-container">
        <div className="error-container">
          <h2>Item Not Found</h2>
          <p>{error || 'The item you are looking for does not exist.'}</p>
          <button onClick={() => navigate('/')} className="back-button">
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="item-detail-container">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Search
      </button>

      <div className="item-detail-card">
        <div className="item-header">
          <h1 className="item-title">{item.name}</h1>
          <div className="item-category-badge">{item.category}</div>
        </div>

        <div className="item-price-large">₹{item.price.toLocaleString('en-IN')}</div>

        <div className="item-description">
          <h3>Description</h3>
          <p>{item.description}</p>
        </div>

        {item.tags && item.tags.length > 0 && (
          <div className="item-tags">
            <h3>Tags</h3>
            <div className="tags-container">
              {item.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="item-meta">
          <div className="meta-item">
            <span className="meta-label">Category:</span>
            <span className="meta-value">{item.category}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Price:</span>
            <span className="meta-value">₹{item.price.toLocaleString('en-IN')}</span>
          </div>
          {item.createdAt && (
            <div className="meta-item">
              <span className="meta-label">Added:</span>
              <span className="meta-value">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;

