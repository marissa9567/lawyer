import React, { useState, useEffect,useRef } from 'react';
import { updateDoc } from 'firebase/firestore';
import '../styles/ProductModal.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../Context/AuthContext';
import { useCartContext } from '../Context/CartContext';
import ProductForm from '../components/ProductForm';
import SizeAndColorSelection from '../components/Sizecolorselection';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function
import Imageslider from '../components/Imageslider';
import { db } from '../components/firebase'; // Your Firebase config import
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions


const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const ProductModal = ({ product = {}, product: initialProduct, onClose, onUpdateImages }) => {


  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [newSize, setNewSize] = useState('');
  const storage = getStorage();

  const [uploadedUrls, setUploadedUrls] = useState([]);

  const [localProduct, setLocalProduct] = useState(initialProduct);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(product.images?.[0]?.url || '');
  const [error, setError] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState({ color: '', size: '', stock: '', other: '' });
  const [title, setTitle] = useState(product.title || '');
 
  const [price, setPrice] = useState(product.price || 0);
  const [category, setCategory] = useState(product.category || '');
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [productData, setProductData] = useState(product);
  const { currentUser } = useAuth();
  const [images, setImages] = useState([]);
  const [productId, setProductId] = useState(uuidv4()); 
  const { addToCart } = useCartContext();
  const [details, setDetails] = useState(product.details || '');
  const [isVisible, setIsVisible] = useState(true);
  const [description, setDescription] = useState(product.description || '');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const modalRef = useRef(null); 
  const handleDeletedescription = () => {
    setIsVisible(false); // Hide the alert when delete button is clicked
  };


  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) return;
      const productRef = doc(db, 'products', productId);
      const docSnap = await getDoc(productRef);
      if (docSnap.exists()) {
        const productData = docSnap.data();
        setSizes(productData.sizes || []);
        setColors(productData.colors || []);
      }
    };

    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    if (product && product.id !== productData.id) {
      setProductData(product);
      setSelectedColor(colors[0] || '');
      setSelectedSize(sizes[0] || '');
      setTitle(product.title);
      setDescription(limitDescription(product.description)); // Apply the limit here
      setPrice(product.price);
      setCategory(product.category);
      setSelectedImage(product.images?.[0]?.url || '');
      setDetails(product.details);
    }
  }, [product, colors, sizes]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  const limitDescription = (text, wordLimit = 10) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };
  const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // If the modal is closed, render nothing.
  
    // Handle modal content click to prevent closing when clicking inside the modal.
    const handleModalContentClick = (e) => {
      e.stopPropagation(); // Prevent click event from propagating to the overlay
    };
  const handleImageUpload = (event) => {
    const selectedFiles = event.target.files;
    const fileArray = Array.from(selectedFiles);
    setImages((prevImages) => [...prevImages, ...fileArray]);
  };

  const handleImageUploadToFirebase = async () => {
    if (!currentUser) {
      alert("Please log in to upload images.");
      return;
    }

    setUploading(true);
    const uploadedUrls = [];
    try {
      for (let i = 0; i < images.length; i++) {
        const imageFile = images[i];
        const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);

        console.log(`Uploading file: ${imageFile.name}`); // Log the file being uploaded

        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Optional: track progress
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done for ${imageFile.name}`);
            },
            (error) => {
              console.error("Upload failed:", error);
              reject(error);
            },
            async () => {
              // Get the download URL once upload is complete
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log(`File uploaded successfully. URL: ${downloadURL}`);
              uploadedUrls.push(downloadURL); // Push the URL to the array
              resolve();
            }
          );
        });
      }

      // Check if URLs were successfully uploaded
      if (uploadedUrls.length > 0) {
        console.log("All files uploaded:", uploadedUrls);
        // Update parent component with the uploaded URLs
        onUpdateImages(uploadedUrls);
      } else {
        console.log("No files were uploaded.");
      }

      setImages([]);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleImagesSubmit = async () => {
    setUploading(true);
    const uploadedImageUrls = [];

    for (let i = 0; i < images.length; i++) {
      const imageFile = images[i];
      const storageRef = ref(storage, `images/${Date.now()}-${i}`);

      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error('Upload error:', error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            uploadedImageUrls.push(downloadURL); // Collect URLs
            resolve();
          }
        );
      });
    }

    setUploadedUrls(uploadedImageUrls); // Save URLs
    setLocalProduct((prev) => ({ ...prev, imageUrls: uploadedImageUrls })); // Store URLs in product
    setUploading(false);
  
  };


  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
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
        description: limitDescription(description), // Apply the limit here
        price,
        details,
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

  const handleAddToCart = () => {
    if (product && selectedColor && selectedSize) {
      addToCart(product, selectedColor, selectedSize);
      onClose();
    } else {
      console.log('Please select both color and size');
    }
  };


  if (!product.id) {
    return <div>Loading...</div>;  
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Your submission logic here
  };

  return (
  
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content11" onClick={handleModalContentClick}>
    

          {/* Display the default image if any */}
          
        <button className="close-modal" onClick={onClose}>X</button>

        <div className="product-details">
          <label>
            <input className='product-modal-title1'
              type="text"
              value={title}
              placeholder='edit title'
              onChange={(e) => setTitle(e.target.value)}
            />
            <h2 className='product-modal-title1-display'>{title}</h2>
          </label>
         
            <label htmlFor="color"></label>
            <select id="color" className='modal-select-color-input'value={selectedColor} onChange={handleColorChange}>
              <option className=""value="">Select Color</option>
              {product.colors?.map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
          <div>
       
            <label htmlFor="size"> </label>
            <select className='modal-select-size-input'
            id="size" value={selectedSize} onChange={handleSizeChange}>
              <option value="">Select Size</option>
              {product.sizes?.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          

            {images.length > 0 && (
            <div>
     
              {images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded Image ${index}`}
                  style={{ width: "100px" }}
                />
              ))}
            </div>
          )}
<div className='imageslider'>
    <Imageslider/>
       </div>  
          <div>
           
            <label>
            {isVisible && (
            <p className='description-alert'>
              The description is on the product card on the shop homepage, not in the module
              <button className="delete-btn-description" onClick={handleDeletedescription}>Delete</button>
            </p>
          )}
              <textarea
              className='productmodule-description-text'
                value={description}
                placeholder='edit description'
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>

            <button className="save-description-content-button"onClick={handleSaveContent} disabled={uploading}>Save description Content</button>
          
            <div>
             
             
             
                <input
                 className='productmodule-price'
                name="price"
                type="number"
                value={additionalInfo.price}
                onChange={handleAdditionalInfoChange}
                placeholder="price"
              />
              <div className='price-display'>

                    {price}
              </div>
              
          
                 <input
                 className='productmodule-category-text'
                name="category"
                type="text"
                value={additionalInfo.category}
                onChange={handleAdditionalInfoChange}
                placeholder="category"
              />
              <div className='category-display'>

                 {category} 
              </div>
            
              <input
              className='productmodule-details-text'
                name="details"
                type="text"
                value={additionalInfo.details}
                onChange={handleAdditionalInfoChange}
                placeholder="details"
              />
              <div className='details-display'>
                {details} 
              </div>
             
              <button className="productmodule-additional-info-button"onClick={handleSubmitAdditionalInfo}>Submit Additional Info</button>
            </div>
           
            <button className='productmodule-addtocart-button' onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
     </div>
  )
};

export default ProductModal;
