import React, { useState, useEffect, useRef } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../components/firebase';
import '../styles/ProductModal.css';
import { useCart } from '../Context/CartContext';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../Context/AuthContext';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const ProductModal = ({ product: initialProduct, product, onClose, onUpdateImages }) => {
    const storage = getStorage();
    const { addToCart } = useCart();
    const { currentUser } = useAuth();
    
    // State variables
    const [newImageFiles, setNewImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [localProduct, setLocalProduct] = useState(initialProduct);
    const [selectedImage, setSelectedImage] = useState(product.images?.[0]?.url || '');
    const [error, setError] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState({ color: '', size: '', stock: '', other: '' });
    const [title, setTitle] = useState(product.title || '');
    const [description, setDescription] = useState(product.description || '');
    const [price, setPrice] = useState(product.price || 0);
    const [category, setCategory] = useState(product.category || '');
    const [isEditingContent, setIsEditingContent] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [inputText, setInputText] = useState(localProduct.description || "");
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandTimeoutId, setExpandTimeoutId] = useState(null);
    const modalRef = useRef(null); // Ref for the modal
    const maxWords = 100; // Set your desired maximum number of words
    const maxCharacters = 500; // Set your desired maximum number of characters
    useEffect(() => {
        if (product) {
            setAdditionalInfo({
                color: product.color || '',
                size: product.size || '',
                stock: product.stock || '',
                other: product.other || '',
            });
            setTitle(product.title);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setSelectedImage(product.images?.[0]?.url || '');
        }
    }, [product]);

    useEffect(() => {
        return () => {
            imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
        };
    }, [imagePreviews]);
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const closeModal = () => {
        setIsExpanded(false); // Close the modal
        onClose(); // Call the onClose function passed as a prop
    };

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal(); // Close the modal when clicking outside
        }
    };


    const handleClick = (e) => {
        e.stopPropagation(); // Prevent closing when clicking inside
        if (!isExpanded) {
            setIsExpanded(true); // Open the modal if it is not already open
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const invalidFiles = files.filter(file => file.size > MAX_FILE_SIZE);

        if (invalidFiles.length > 0) {
            setError(`The following files are too large: ${invalidFiles.map(file => file.name).join(', ')} (Max: 10 MB)`);
            setNewImageFiles([]);
            setImagePreviews([]);
            return;
        }

        setError('');
        setNewImageFiles(files);
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const uploadImages = async () => {
        if (!currentUser) {
            setError('You must be logged in to upload images.');
            return;
        }

        if (newImageFiles.length === 0) {
            setError('Please select at least one image to upload.');
            return;
        }

        setUploading(true);
        setError('');
        const updatedImages = [...(product.images || [])];

        const uploadPromises = newImageFiles.map(async (file) => {
            const imageId = uuidv4();
            const storageRef = ref(storage, `products/${product.id}/${file.name}`);
            await uploadBytes(storageRef, file);
            const imageUrl = await getDownloadURL(storageRef);
            updatedImages.push({ id: imageId, url: imageUrl });
        });

        try {
            await Promise.all(uploadPromises);
            const productRef = doc(db, 'products', product.id);
            await updateDoc(productRef, { images: updatedImages });

            if (typeof onUpdateImages === 'function') {
                onUpdateImages(updatedImages);
            }

            setNewImageFiles([]);
            setImagePreviews([]);
            setSelectedImage(updatedImages[0]?.url || '');
            alert('Images uploaded successfully!');
        } catch (error) {
            console.error('Error updating product images:', error);
            setError('Error updating product images. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleDescriptionChange = (e) => {
        const text = e.target.value;
        const wordsArray = text.trim().split(/\s+/);
        const wordCount = wordsArray.length;
    
        // Check if the word count and character length are within limits
        if (wordCount <= maxWords && text.length <= maxCharacters) {
            setDescription(text);
        } else {
            // Optionally, set an error message if limits are exceeded
            setError(`Description should not exceed ${maxWords} words or ${maxCharacters} characters.`);
        }
    };

    const handleDeleteImage = async (id) => {
        try {
            const updatedImages = product.images.filter(image => image.id !== id);
            const productRef = doc(db, 'products', product.id);
            await updateDoc(productRef, { images: updatedImages });

            setSelectedImage(updatedImages[0]?.url || '');

            if (typeof onUpdateImages === 'function') {
                onUpdateImages(updatedImages);
            }

            alert('Image deleted successfully!');
        } catch (error) {
            console.error('Error deleting image:', error);
            setError('Error deleting image. Please try again.');
        }
    };

    const handleAdditionalInfoChange = (e) => {
        const { name, value } = e.target;
        setAdditionalInfo(prevInfo => ({ ...prevInfo, [name]: value }));
    };

    const handleSubmitAdditionalInfo = async () => {
        try {
            const productRef = doc(db, 'products', product.id);
            await updateDoc(productRef, additionalInfo);
            alert('Additional information updated successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating additional information:', error);
            setError('Error updating additional information. Please try again.');
        }
    };

    const handleSaveContent = async () => {
        try {
            const productRef = doc(db, 'products', product.id);
            await updateDoc(productRef, {
                title,
                description,
                price,
                category,
                ...additionalInfo,
            });
            setIsEditingContent(false);
            alert('Product content updated successfully!');
        } catch (error) {
            console.error('Error updating product content:', error);
            setError('Error updating product content. Please try again.');
        }
    };

    const handleMoveProduct = async () => {
        try {
            const productRef = doc(db, 'products', product.id);
            await updateDoc(productRef, { category });
            alert(`Product moved to ${category}!`);
            onClose(); 
        } catch (error) {
            console.error("Error moving product:", error);
            setError('Error moving product. Please try again.');
        }
    };

    if (!product || Object.keys(product).length === 0) return <div>No product available</div>;

    return ( <div >
       
            <div className="product-box" ref={modalRef} onClick={handleClick}>
                <div    onClick={handleClick}className='content'>
                <button className="close-button" onClick={onClose}>Close</button>
                    <div className="product-details">
                        <div className="image-column">
                            {product.images && product.images.map((image) => (
                                <div key={image.id} className="image-container">
                                    <img
                                        className="product-images"
                                        src={image.url}
                                        alt={`Product Image ${image.id}`}
                                        onClick={() => setSelectedImage(image.url)}
                                    />
                                    <button onClick={() => handleDeleteImage(image.id)}>Delete</button>
                                </div>
                            ))}
                        </div>
                        <div className="info-column">
                            <h2>{title}</h2>
                            <p>{description}</p>
                            <h3>Price: ${price}</h3>
                            <h3>Category: {category}</h3>
                        </div>
                    </div>
                </div>
            
                <div>
                    <label htmlFor="image-upload">Upload Images:</label>
                    <input type="file" id="image-upload" accept="image/*" multiple onChange={handleImageChange} />
                    <button onClick={uploadImages} disabled={uploading}>Upload</button>
                </div>
            </div>
            
                <div >
                    <textarea value={description} onChange={handleDescriptionChange} />
                    <button onClick={handleSaveContent}>Save</button>
                    <button onClick={handleMoveProduct}>Move Product</button>
                    <div>
                        <h4>Add Additional Info</h4>
                        <input
                            type="text"
                            name="color"
                            value={additionalInfo.color}
                            onChange={handleAdditionalInfoChange}
                            placeholder="Color"
                        />
                        <input
                            type="text"
                            name="size"
                            value={additionalInfo.size}
                            onChange={handleAdditionalInfoChange}
                            placeholder="Size"
                        />
                        <input
                            type="number"
                            name="stock"
                            value={additionalInfo.stock}
                            onChange={handleAdditionalInfoChange}
                            placeholder="Stock"
                        />
                        <input
                            type="text"
                            name="other"
                            value={additionalInfo.other}
                            onChange={handleAdditionalInfoChange}
                            placeholder="Other Info"
                        />
                        <button onClick={handleSubmitAdditionalInfo}>Submit</button>
                    </div>
                </div>
            
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default ProductModal;
