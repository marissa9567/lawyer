import React, { useState } from 'react';
import '../styles/ProductCard.css';
import { useCart } from '../Context/CartContext';
import ProductModal from '../components/ProductModal';

const ProductCard = ({ product, onDelete, isEditable, onAddImage, isLoggedIn }) => {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);  // State for modal visibility
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product

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

  // Function to open the modal and set the selected product
  const openModal = () => {
    setSelectedProduct(product);
    setIsModalOpen(true);  // Open modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false);  // Close modal
    setSelectedProduct(null); // Reset selected product
  };

  /* This sets up product card on the shop page */
  return (
    <div className="product-card">
      <div className="individualaddinproducts" onClick={openModal}>
        <h2>{product.title}</h2>
        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: 'auto' }} />
        <p>Size: {(product.imageSize / 1024).toFixed(2)} KB</p> {/* Display image size next to the image */}
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>

        <button onClick={(e) => {
          e.stopPropagation();  // Prevent triggering the card click
          handleAddToCart();
        }}>
          Add to Cart
        </button>

        {/* Show the delete button only if on the edit page */}
        {isEditable && (
          <button className="delete-button" onClick={(e) => {
            e.stopPropagation();  // Prevent triggering the card click
            handleDelete();
          }}>
            Delete
          </button>
        )}

        {/* Add Additional Information button */}
        {isEditable && (
          <button className="additional-info-button" onClick={openModal}>
            Add Additional Information
          </button>
        )}
      </div>

      {isModalOpen && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleModalClose} // Pass close function to modal
          onAddImage={onAddImage}
          isLoggedIn={isLoggedIn}
        />
      )}
    </div>
  );
};

export default ProductCard;
