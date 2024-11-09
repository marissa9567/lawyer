import React, { useState } from 'react';
import { useCartContext } from '../Context/CartContext'; // Correct import
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import "../styles/Checkout.css";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [receipt, setReceipt] = useState(null);

  // Access cart and removeItem from context
  const { cart, removeItem } = useCartContext();  // Correct cart variable name
  
  // Calculate total amount from the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0) * 100; // Convert to cents for Stripe
  };

  console.log('cart:', cart);  // Log the cart to ensure it's being received correctly

  // Early return if cart is empty
  if (cart.length === 0) {
    return <p>Your cart is empty. Please add items before proceeding.</p>;
  }

  const handleRemoveItem = (uuid) => {
    removeItem(uuid); // Remove the item from the cart using its unique uuid
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const totalAmount = calculateTotalAmount();

    if (totalAmount === 0) {
      alert("Please add items to the cart.");
      return;
    }

    const response = await fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: totalAmount,
        customerEmail: email,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      alert('Error creating payment: ' + error);
      return;
    }

    const { clientSecret } = await response.json();

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
      const receiptMessage = `
        Thank you for your purchase, ${firstName} ${lastName}!
        Your total amount is $${(totalAmount / 100).toFixed(2)}.
        Shipping to: ${address}.
      `;
      setReceipt(receiptMessage); // Set the receipt to state
      // Optionally clear the cart after successful payment
      // clearCart();  // Uncomment if you want to clear the cart after purchase
    }
  };

  return (
    <div>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2 className='checkout-title'>Checkout</h2>
        <div className='checkout-items-container'>
          {cart.map((item) => (
            <div key={item.uuid} className="checkout-item"> {/* Use uuid for key */}
              <p>{item.name} x {item.quantity}</p>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
              <button type="button" onClick={() => handleRemoveItem(item.uuid)}> {/* Remove using uuid */}
                Remove
              </button>
            </div>
          ))}
        </div>
        <h3 className='checkout-total'>Total Amount: ${(calculateTotalAmount() / 100).toFixed(2)}</h3>

        <div className="checkout-user-info">
          <label>
            First Name:
            <input 
              type="text" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              required 
            />
          </label>
          <label>
            Last Name:
            <input 
              type="text" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              required 
            />
          </label>
          <label>
            Address:
            <input 
              type="text" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              required 
            />
          </label>
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

        <div className="checkout-card-element">
          <CardElement />
        </div>
        <button type="submit" className="checkout-submit-button" disabled={!stripe}>
          Pay
        </button>
      </form>

      {receipt && (
        <div className="receipt-container">
          <h3 className='receipt-title'>Your Receipt:</h3>
          <p>{receipt}</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
