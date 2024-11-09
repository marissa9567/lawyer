// src/components/ItemComponent.js

import React from 'react';
import { useCart } from '../Context/CartContext';

const ItemComponent = () => {
    const { addToCart } = useCart();

    const item = {
        id: 1,
        name: 'Sample Item',
        price: 20
    };

    return (
        <div>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
    );
};

export default ItemComponent;
