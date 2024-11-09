import React, { useState } from 'react';
import { useCart } from '../Context/CartContext';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const { cartItems, clearCart, removeItem } = useCart();
  const stripe = useStripe();
  const elements = useElements();

  // State for user information
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState(''); // New state for email

  // Calculate total amount based on cart items
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price, 0) * 100; // Total in cents
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const totalAmount = calculateTotalAmount();

    // Call your backend to create the PaymentIntent
    const response = await fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        amount: totalAmount, // Use the total amount calculated in cents
        customerEmail: email, // Include the customer's email
      }),
    });

    const { clientSecret } = await response.json();

    // Confirm the payment with Stripe
    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: `${firstName} ${lastName}`,
          address: {
            line1: address,
          },
        },
      },
    });

    if (error) {
      alert('Payment failed: ' + error.message);
    } else {
      alert('Payment successful!'); // Success alert
      clearCart(); // Clear the cart after payment
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <div>
        {cartItems.map(item => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <img src={item.imageUrl} alt={item.title} style={{ width: '100px' }} />
            <p>Price: ${item.price}</p>
            <button type="button" onClick={() => removeItem(item.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <h3>Total Amount: ${(calculateTotalAmount() / 100).toFixed(2)}</h3>
      
      <div>
        <label>
          First Name:
          <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            required 
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            required 
          />
        </label>
      </div>
      <div>
        <label>
          Address:
          <input 
            type="text" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            required 
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </label>
      </div>
      <div>
        <CardElement />
      </div>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
