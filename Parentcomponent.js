import React, { useState } from 'react';
import Shophomepage from '../pages/Shophomepage';

const ParentComponent = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
        console.log('Added to cart:', product);
    };

    return (
        <div>
            <h1>My E-Commerce Store</h1>
            <Shophomepage addToCart={addToCart} />
            {/* Display Cart for demonstration */}
            <h2>Cart Items:</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        {item.name} - ${item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ParentComponent;
