// Modal.js
import { useState } from 'react';
import React from 'react';
import '../styles/ProductModal.css';  // Optional: for styling the modal


const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // If the modal is closed, render nothing.

  // Handle modal content click to prevent closing when clicking inside the modal.
  const handleModalContentClick = (e) => {
    e.stopPropagation(); // Prevent click event from propagating to the overlay
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleModalContentClick}>
        <h2>My Modal</h2>
        <p>This is a simple pop-up modal!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;