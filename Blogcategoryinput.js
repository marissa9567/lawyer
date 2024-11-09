import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CategoryInput = ({ onAddCategory }) => {
    const [category, setCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (category.trim()) {
            onAddCategory(category.trim());
            setCategory('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter a category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            />
            <button type="submit">Add Category</button>
        </form>
    );
};

CategoryInput.propTypes = {
    onAddCategory: PropTypes.func.isRequired,
};

export default CategoryInput;
