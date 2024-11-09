import React, { useState, useEffect } from 'react';
import { db, storage } from '../components/firebase'; // Ensure Firebase is initialized correctly
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import "../styles/ProductModal.css";
const Productmoduleimageuploader = () => {
    const [file, setFile] = useState(null);
    const [productID, setProductID] = useState('a2df9762-b0db-4653-9650-3fcbd782ec48'); // Example productID
    const [productData, setProductData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(''); // State to hold error message
  
    // Handle file selection
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        // Check if file size exceeds 10MB (10 * 1024 * 1024 bytes)
        if (selectedFile.size > 10 * 1024 * 1024) {
          setErrorMessage('File size must be less than or equal to 10MB.');
        } else {
          setFile(selectedFile);
          setErrorMessage(''); // Clear any previous error messages
        }
      }
    };
  
    // Handle image upload
    const handleImageUpload = async () => {
      if (!file) return; // If no file selected, do nothing
      try {
        // Create a unique filename for the image
        const fileName = `${uuidv4()}_${file.name}`;

        // Upload the image to Firebase Storage
        const storageRef = ref(storage, `productImages/${fileName}`);
        await uploadBytes(storageRef, file);

        // Get the download URL of the uploaded image
        const imageUrl = await getDownloadURL(storageRef);

        // Save the image URL to Firestore under the relevant product document
        const productRef = doc(db, 'products', productID);
        const productDoc = await getDoc(productRef);
        
        let updatedImages = [];
        if (productDoc.exists()) {
          // If product exists, update images array
          updatedImages = [...productDoc.data().images, imageUrl];
          await updateDoc(productRef, {
            images: updatedImages,
          });
        } else {
          // If product doesn't exist, create a new one
          updatedImages = [imageUrl];
          await setDoc(productRef, {
            images: updatedImages,
            id: productID,
          });
        }

        // Update local state to reflect the newly uploaded image
        setProductData((prevData) => ({
          ...prevData,
          images: updatedImages,
        }));

        console.log("Image uploaded and saved to Firestore!");
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    };

    // Delete image from Firebase Storage and remove URL from Firestore
    const deleteImage = async (imageUrl) => {
      try {
        // Get the image file reference in Firebase Storage
        const imageRef = ref(storage, imageUrl);

        // Delete the image from Firebase Storage
        await deleteObject(imageRef);

        // Remove the image URL from the Firestore document
        const productRef = doc(db, 'products', productID);
        const productDoc = await getDoc(productRef);
        
        if (productDoc.exists()) {
          // Filter out the deleted image URL
          const updatedImages = productDoc.data().images.filter((url) => url !== imageUrl);
          
          // Update the Firestore document with the new list of images
          await updateDoc(productRef, {
            images: updatedImages,
          });

          // Update local state to reflect the deletion
          setProductData((prevData) => ({
            ...prevData,
            images: updatedImages,
          }));

          console.log("Image deleted from Firestore and Firebase Storage!");
        }
      } catch (error) {
        console.error("Error deleting image: ", error);
      }
    };

    // Fetch product data (including images) from Firestore
    const fetchProductData = async () => {
      try {
        const docRef = doc(db, 'products', productID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProductData(docSnap.data());
          console.log("Fetched product data:", docSnap.data());
        } else {
          console.log("No document found for this product");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
  
    // Use effect to fetch product data on page load
    useEffect(() => {
      fetchProductData();
    }, []); // Empty dependency array means this will run only once when the component mounts
  
    return (
      <div className='Productmoduleimageuploader-main-container'>
     
        
        <input className="Productmodulimageuploader-browse-button"type="file" onChange={handleFileChange} />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error if file is too large */}
        <button className="Productmoduleimageuploader-upload-button"onClick={handleImageUpload}>Upload Image</button>
  
        {productData && productData.images && (
          <div>
          
            {productData.images.map((imageUrl, index) => (
              <div className="productmodule-images-container"key={index} >
                <img src={imageUrl} alt={`Product image ${index}`} className='Productmoduleimageuploader-img' />
                <button className="Productmoduleimageuploader-delete-button"onClick={() => deleteImage(imageUrl)} >Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default Productmoduleimageuploader;
