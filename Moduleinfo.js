import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ProductCard.css';

const Moduleinfo = ({ product, onDelete, isLoggedIn, setSelectedProduct, setShowModal }) => {
  
  const handleDelete = () => {
    if (onDelete) {
      onDelete(product.id);
    } else {
      console.error('onDelete function not provided');
    }
  };

  const handleCardClick = () => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Define the getImageSize function if needed
  const getImageSize = (size) => {
    switch (size) {
      case 'small':
        return { width: '100px', height: '100px' };
      case 'medium':
        return { width: '200px', height: '200px' };
      case 'large':
        return { width: '300px', height: '300px' };
      default:
        return { width: '150px', height: '150px' }; // Default size
    }
  };

  /* This sets up product card on shop page */
  return (
    <div className="product-card" onClick={handleCardClick}>
      <h2>{product.describe}</h2>
      <img src={product.imageUrl} alt={product.title} style={getImageSize(product.size)} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>

      {isLoggedIn && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the card click
            handleDelete();
          }}>
          Delete
        </button>
      )}
    </div>
  );
};

// Prop Types for validation
Moduleinfo.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    size: PropTypes.string, // Optional size property
  }).isRequired,
  onDelete: PropTypes.func,
  isLoggedIn: PropTypes.bool.isRequired,
  setSelectedProduct: PropTypes.func.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default Moduleinfo;
