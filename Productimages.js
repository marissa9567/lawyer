import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';  // For generating unique IDs
import { storage, db } from './firebase'; // Assuming your Firebase setup
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

const ProductImages = ({ product, onAddImage }) => {
    const [newImageFiles, setNewImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [error, setError] = useState('');
    const [selectedImage, setSelectedImage] = useState('');

    // Handle image file selection and preview
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImageFiles(files);
        
        // Generate previews
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    // Handle image upload and assigning unique IDs
    const handleImageUpload = async (e) => {
        e.preventDefault();
        if (newImageFiles.length === 0) return;

        const updatedImages = [...(product.images || [])]; // Keep existing images
        const uploadPromises = newImageFiles.map(async (file) => {
            const imageId = uuidv4(); // Generate a unique ID for the image
            try {
                const storageRef = ref(storage, `products/${product.id}/${file.name}`);
                await uploadBytes(storageRef, file);
                const imageUrl = await getDownloadURL(storageRef);
                
                // Save both image URL and ID
                updatedImages.push({ id: imageId, url: imageUrl });

                return { id: imageId, url: imageUrl };
            } catch (error) {
                console.error('Error uploading file:', error);
                setError('Error uploading files. Please try again.');
            }
        });

        try {
            await Promise.all(uploadPromises); // Wait for all uploads to complete
            const productRef = doc(db, 'products', product.id);
            await updateDoc(productRef, { images: updatedImages }); // Save images with IDs in Firestore

            onAddImage(updatedImages); // Notify parent of new images
            setNewImageFiles([]); // Reset file input
            setImagePreviews([]); // Reset previews
            setSelectedImage(updatedImages[0]?.url || ''); // Set the first uploaded image as selected

            alert('Images uploaded successfully!');
        } catch (error) {
            console.error('Error updating product images:', error);
            setError('Error updating product images. Please try again.');
        }
    };

    // Handle deleting an image by ID
    const handleDeleteImage = async (id) => {
        try {
            const updatedImages = product.images.filter(image => image.id !== id);
            const productRef = doc(db, 'products', product.id);
            await updateDoc(productRef, { images: updatedImages }); // Update Firestore

            onAddImage(updatedImages); // Update parent component with new images
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    return (
        <div className="product-images">
            <h2>Upload Product Images</h2>

            {/* Image Upload Form */}
            <form onSubmit={handleImageUpload}>
                <input type="file" accept="image/*" multiple onChange={handleImageChange} />
                <button type="submit">Upload Images</button>
            </form>

            {/* Image Previews */}
            <div className="image-previews">
                {imagePreviews.length > 0 && (
                    <div>
                        <h3>Image Previews:</h3>
                        {imagePreviews.map((preview, index) => (
                            <img key={index} src={preview} alt={`Preview ${index + 1}`} />
                        ))}
                    </div>
                )}
            </div>

            {/* Image Gallery */}
            <div className="image-gallery">
                <h3>Existing Images:</h3>
                {product.images && product.images.length > 0 ? (
                    product.images.map((image, index) => (
                        <div key={image.id} className="image-container">
                            <img src={image.url} alt={`Product image ${index + 1}`} />
                            <button onClick={() => handleDeleteImage(image.id)}>Delete Image</button>
                        </div>
                    ))
                ) : (
                    <p>No images available.</p>
                )}
            </div>

            {/* Display error message if any */}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default ProductImages;
