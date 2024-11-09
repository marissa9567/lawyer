import React, { useState } from 'react';

const ImageUpload = ({ initialImageUrl, onImageChange }) => {
    const [imagePreview, setImagePreview] = useState(initialImageUrl || null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            onImageChange(previewUrl); // Notify parent component
        }
    };

    return (
        <div>
            <label>Upload Image:</label>
            <input type="file" onChange={handleImageUpload} />
            {imagePreview && <img src={imagePreview} alt="Uploaded Preview" style={{ width: '100px' }} />}
        </div>
    );
};

export default ImageUpload;
