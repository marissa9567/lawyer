import React from 'react';
import '../styles/ProductCard.css';
import { useCart } from '../Context/CartContext';
import ProductModal from '../components/ProductModal';

const Productcardmodule = ({ product, onDelete, isLoggedIn }) => {
  const { addToCart } = useCart();
  const [showModal, setShowModal] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  // Check if the product is defined; if not, return a placeholder
  if (!product) {
    return <div className="product-card">Product not found.</div>;
  }

  const handleAddToCart = () => {
    try {
      addToCart(product);
      alert(`${product.title} added to cart!`);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(product.id);
    } else {
      console.error('onDelete function not provided');
    }
  };

  const getImageSize = (size) => {
    switch (size) {
      case 'small':
        return { width: '100px', height: '100px' };
      case 'medium':
        return { width: '200px', height: '200px' };
      case 'large':
        return { width: '300px', height: '300px' };
      default:
        return { width: '200px', height: '200px' }; // Default size
    }
  };

  const handleCardClick = () => {
    setSelectedProduct(product);
    setShowModal(true);
  };
/*this sets up product card on shop page*/
  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="individualaddinproducts">
        <h2>{product.title}</h2>
        <img src={product.imageUrl} alt={product.name} style={getImageSize(product.size)} />
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <button onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}>
          Add to Cart
        </button>

        {/* Show the delete button only if the user is logged in */}
        {isLoggedIn && (
          <button className="delete-button" onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the card click
              handleDelete();
            }}>
            Delete
          </button>
        )}
      </div>

      {/* Render the modal if it's open and product is selected */}
      {showModal && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Productcardmodule;
