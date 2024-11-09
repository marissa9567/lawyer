// CartDisplay.js
import React from 'react';
import { useCart } from '../Context/CartContext';

const CartDisplay = () => {
  const { cartItems } = useCart(); // Use the Cart context

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <img src={item.imageUrl} alt={item.title} style={{ width: '100px' }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartDisplay;
