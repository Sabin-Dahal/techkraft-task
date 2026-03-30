import api from '../api/axios';
import { useState } from 'react';
import './PropertyCard.css';
const API_BASE_URL = "http://localhost:5000";

const PropertyCard = ({ property, isFav, setFavourites }) => {
  const [error, setError] = useState("");
  const toggleFavorite = async () => {
    try {
      if (isFav) {
        await api.delete(`/favourites/${property.id}`);
        setFavourites(prev => prev.filter(id => id !== property.id));
      } else {
        await api.post(`/favourites/${property.id}`);
        setFavourites(prev => [...prev, property.id]);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Failed to update favourites");
    }
  };

  return (
    <div className="card">
      <div className="image-container">
        <img src={`${API_BASE_URL}${property.image}`} alt={property.title} />
      </div>
      
      <div className="card-content">
        <div className="title-row">
          <div className="text-group">
            <h3 title={property.title}>{property.title}</h3>
            <p className="location" title={property.location}> {property.location}</p>
          </div>
          <p className="price">Rs.{property.price.toLocaleString('en-IN')}</p>
        </div>
        {error && <p className="error">{error}</p>}
        <button 
          onClick={toggleFavorite} 
          className={`fav-btn ${isFav ? 'active' : ''}`}
        >
          {isFav ? '❤️ Favourited' : '🤍 Add to Favourites'}
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;