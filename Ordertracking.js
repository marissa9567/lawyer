import React from 'react';

const OrderTracking = ({ user }) => {
  return (
    <div>
      <h2>Order Tracking</h2>
      <p>Welcome, {user.email}! Here you can track your orders.</p>
      {/* Fetch and display order tracking information here */}
    </div>
  );
};

export default OrderTracking;
