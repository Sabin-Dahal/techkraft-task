import api from '../api/axios';
import './PropertyCard.css';
const API_BASE_URL = "http://localhost:5000";

const PropertyCard = ({ property, isFav, setFavourites }) => {
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
      alert("Could not update favorites");
    }
  };

  return (
    <div className="card">
      <img src={`${API_BASE_URL}${property.image}`} alt={property.title} />
      <div className="card-content">
        <h3>{property.title}</h3>
        <p className="price">Nrs.{property.price.toLocaleString()}</p>
        <p className="location">{property.location}</p>
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