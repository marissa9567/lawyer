import React, { useState } from 'react';
import { useCartContext } from '../Context/CartContext';
import ProductForm from '../components/ProductForm';
import ProductModal from '../components/ProductModal';
import { useAuth } from '../Context/AuthContext';
import { getStorage, uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { db } from '../components/firebase'; // Ensure you have this path to Firebase configuration
import { doc, updateDoc } from 'firebase/firestore';
const ProductCard = ({ product, setProduct,onDelete, isEditable, onAddImage, isLoggedIn }) => {
  const { addToCart } = useCartContext();
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [images, setImages] = useState([]);
  const [localProduct, setLocalProduct] = useState(product);
  const [inputText, setInputText] = useState(localProduct.description || "");
  const [isEditing, setIsEditing] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);



  const { currentUser } = useAuth();
  const [price, setPrice] = useState(localProduct.price);  // New state for price
  const storage = getStorage();  // Initialize Firebase storage
  const [borderStyle, setBorderStyle] = useState(product.borderStyle || 'solid');
  const [borderColor, setBorderColor] = useState(product.borderColor || '#000000');
  const [borderWidth, setBorderWidth] = useState(product.borderWidth || 1);
  const handleColorChange = (e) => setSelectedColor(e.target.value);
  const handleSizeChange = (e) => setSelectedSize(e.target.value);
  
  const toggleProductModal = () => setIsModalOpen(!isModalOpen);

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    const wordsArray = text.trim().split(/\s+/);
    const wordCount = wordsArray.length;
    const maxWords = 20;
    const maxCharacters = 100;

    if (wordCount <= maxWords && text.length <= maxCharacters) {
      setInputText(text);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Toggle the modal open/close
  };
  const handleImageUpload = (event) => {
    const uploadedImages = event.target.files;
    const newImages = [...images];

    for (let i = 0; i < uploadedImages.length; i++) {
      newImages.push(uploadedImages[i]);  // Store the file itself for Firebase upload
    }
    
    setImages(newImages);
  };

  const handleSubmit = async () => {
    setUploading(true);
    const uploadedImageUrls = [];

    for (const imageFile of images) {
      const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            console.error('Upload error:', error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              uploadedImageUrls.push(downloadURL);
              resolve();  // Move to the next image in the loop
            });
          }
        );
      });
    }

    setUploadedUrls(uploadedImageUrls);
    setUploading(false);
    setIsModalOpen(false);
  };

  const saveDescription = () => {
    setLocalProduct((prev) => ({ ...prev, description: inputText }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(localProduct.id);
    } else {
      console.error('onDelete function not provided');
    }
  };
  const saveBorderStyles = async () => {
    if (!product.id) {
      console.error("Product ID is missing.");
      return;
    }

    try {
      // Create a reference to the specific product document
      const productRef = doc(db, 'products', product.id);

      // Update the document with the new border style settings
      await updateDoc(productRef, {
        borderColor,
        borderStyle,
        borderWidth,
      });

      alert('Border styles saved successfully!');
    } catch (error) {
      console.error('Error saving border styles:', error);
      alert('Failed to save border styles.');
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select both color and size!');
      return;
    }
    addToCart(product, selectedColor, selectedSize);
  };

  const handleUpdateImages = (newImageUrls) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      images: newImageUrls,
    }));
  };
  const productCardStyle = {
    border: `${borderWidth}px ${borderStyle} ${borderColor}`,  // Dynamic border styles
    padding: '10px',
    margin: '10px',
  };
  return (
    <div className="product-card"style={productCardStyle}>
      <h3>{product.name}</h3>
      <img className="product-images-productcard" src={localProduct.imageUrl} alt={localProduct.name} />
      <h2 className="product-title">{localProduct.title}</h2>
      <button className="add-to-cart-button" onClick={handleAddToCart}>
        Add to Cart
      </button>
     <div 
  className="open-modal-div" 
  onClick={toggleProductModal}
>
  Click here to open modal
</div>
<button onClick={toggleModal}>Open Modal</button>

      {currentUser && isEditable && (
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      )}
        <div className="border-controls">
        <label>Border Color: </label>
        <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
        
        <label>Border Width: </label>
        <input type="number" min="1" max="10" value={borderWidth} onChange={(e) => setBorderWidth(Number(e.target.value))} />
        
        <label>Border Style: </label>
        <select value={borderStyle} onChange={(e) => setBorderStyle(e.target.value)}>
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
          <option value="double">Double</option>
          <option value="groove">Groove</option>
        </select>
        <button onClick={saveBorderStyles} className="save-border-styles-button">Save Border Styles</button>
      
      </div>
      <div>
        <label htmlFor="color">Color: </label>
        <select id="color" value={selectedColor} onChange={handleColorChange}>
          <option value="">Select Color</option>
          {product.colors?.map((color, index) => (
            <option key={index} value={color}>{color}</option>
          ))}
        </select>
      </div>
      {isEditing ? (
        <div>
          <textarea
            className="product-description-input"
            value={inputText}
            onChange={handleDescriptionChange}
            onBlur={saveDescription}
            autoFocus
          />
        </div>
      ) : (
        <p className="product-description" onClick={() => isEditable && setIsEditing(true)}>
          {localProduct.description}
        </p>
      )}
      <p className="product-price">${localProduct.price}</p>
      <div>
        <label htmlFor="size">Size: </label>
        <select id="size" value={selectedSize} onChange={handleSizeChange}>
          <option value="">Select Size</option>
          {product.sizes?.map((size, index) => (
            <option key={index} value={size}>{size}</option>
          ))}
        </select>
      </div>
      {isModalOpen && (
        <ProductModal
          uploading={uploading}
          onImageUpload={handleImageUpload}
          images={images}
          product={localProduct}
       
          onAddImage={onAddImage}
          isLoggedIn={isLoggedIn}
          onUpdateImages={handleUpdateImages}
          handleSubmit={handleSubmit}
          isOpen={isModalOpen} onClose={toggleModal}
        />
      )}
      <ProductForm productId={product.id} />
    </div>
  );
};

export default ProductCard;
