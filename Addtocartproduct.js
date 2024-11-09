import React from 'react';
import { useCartContext } from '../Context/CartContext';

const AddProductToCart = () => {
  const { cart, removeFromCart } = useCartContext();

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((product, index) => (
            <li key={index}>
              <p>{product.name}</p>
              <p>Price: {product.price}</p>
              <button onClick={() => removeFromCart(product.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddProductToCart;
