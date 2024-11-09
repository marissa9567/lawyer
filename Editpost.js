import React, { useState } from 'react';
import { useImage } from '../Context/ImageContext'; // Import your context

const EditPost = () => {
    const { setImageUrl } = useImage(); // Access the context function
    const [image, setImage] = useState(null);
    
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Set image for preview
                setImageUrl(reader.result); // Set image URL in context
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <h2>Edit Your Post</h2>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {image && <img src={image} alt="Preview" style={{ width: '100px', height: '100px' }} />}
            {/* Other editing fields like title, content, etc. */}
        </div>
    );
};

export default EditPost;
