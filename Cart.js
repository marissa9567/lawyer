// src/pages/Cart.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../Context/CartContext';

const Cart = () => {
  const { cart, removeFromCart } = useCartContext();
  const navigate = useNavigate();

  // Calculate the total cost of items in the cart
  const totalCost = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

  const handleRemoveFromCart = (product) => {
    // Remove the product using its unique identifier (id, color, size)
    removeFromCart(product.id, product.selectedColor, product.selectedSize);
  };

  const handleCheckout = () => {
    navigate('/checkoutform'); // Directly navigate to checkout page
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((product) => (
            <div
              key={`${product.id}-${product.selectedColor}-${product.selectedSize}`} // Use combination of product's attributes to make the key unique
              className="cart-item"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{product.name}</h3>
                <p>Color: {product.selectedColor}</p>
                <p>Size: {product.selectedSize}</p>
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.quantity}</p>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemoveFromCart(product)} // Pass the item to the removal handler
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Total: ${totalCost.toFixed(2)}</h3>
          <button
            className="checkout-btn"
            onClick={handleCheckout} // Proceed to checkout
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
