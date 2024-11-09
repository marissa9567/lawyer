import React, { useState } from 'react';
import { db, storage, auth } from '../components/firebase';
import { serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { addDoc, collection } from 'firebase/firestore'; 
import '../styles/Product.css';
import { useCart } from '../Context/CartContext'; // Import your CartContext

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('medium'); // State for image size
  const [title, setTitle] = useState(''); // State for product title
  const [uploading, setUploading] = useState(false);
  const [category, setCategory] = useState(''); // New category state
  const [imageSize, setImageSize] = useState(null); // State for image size
  const [wordLimitError, setWordLimitError] = useState(''); // State to handle word limit error

  const { addProduct } = useCart(); // Get addProduct function from CartContext

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageSize(e.target.files[0].size); // Set the image size in bytes
    }
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    const wordCount = newDescription.split(/\s+/).filter(Boolean).length; // Split by whitespace and count words

    if (wordCount <= 10) {
      setDescription(newDescription);
      setWordLimitError(''); // Clear the error message if within limit
    } else {
      setWordLimitError('Description can be up to 50 words only.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const user = auth.currentUser; // Get the currently logged-in user
    if (user && image) {
      try {
        const storageRef = ref(storage, `products/${image.name}`);
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);

        // Add product to Firestore
        await addDoc(collection(db, 'products'), {
          title,
          price: parseFloat(price),
          imageUrl,
          description,
          size,
          category, // Include category
          userId: user.uid,
          createdAt: serverTimestamp(),
          imageSize, // Save image size in Firestore
        });

        // Add product to cart context
        addProduct({ title, price, imageUrl, category });

        // Reset form fields
        setTitle('');
        setPrice('');
        setDescription('');
        setImage(null);
        setSize('medium');
        setCategory('');
        setImageSize(null); // Reset image size
        console.error('uploaded successfully');
      } catch (error) {
        console.error('Error uploading product:', error);
      } finally {
        setUploading(false);
      }
    } else {
      console.error('User is not logged in or image is not selected');
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleImageChange}  />
      <input
        type="text"
        placeholder="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
        required
      />
      {wordLimitError && <p style={{ color: 'red' }}>{wordLimitError}</p>} {/* Display word limit error */}
      <input 
        type="text" 
        placeholder="Category" 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
        required 
      />
      <select value={size} onChange={(e) => setSize(e.target.value)}>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
      <button type="submit" disabled={uploading || wordLimitError}>
        {uploading ? 'Uploading...' : 'Add Product'}
      </button>
    </form>
  );
};

export default AddProduct;
