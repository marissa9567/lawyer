import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const orders = [
        { id: 'order1', status: 'Shipped', details: 'Your order is on the way!' },
        { id: 'order2', status: 'Pending', details: 'Your order will be shipped soon.' },
        { id: 'practiceOrder', status: 'Delivered', details: 'Your practice order has been delivered!' }, // Practice order
    ];

    return (
        <div>
            <h1>Your Orders</h1>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <span>Order ID: {order.id} - Status: {order.status}</span>
                        <Link to={`/order-tracking/${order.id}`}>
                            <button style={{ marginLeft: '10px' }}>Track Order</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDashboard;

