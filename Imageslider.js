import React, { useState, useEffect } from 'react';
import { db, storage } from '../components/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage';
import "../styles/ProductModal.css";
const ImageSlider = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch images from Firestore on component mount
  useEffect(() => {
    const fetchImages = async () => {
      const imageCollection = collection(db, 'images');
      const imageDocs = await getDocs(imageCollection);
      const imageUrls = imageDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setImages(imageUrls);
    };
    fetchImages();
  }, []);

  // Handle image uploads
  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);

    for (const file of files) {
      const storageRef = ref(storage, `images/${file.name}`);
      
      // Upload the image to Firebase Storage
      await uploadBytes(storageRef, file);

      // Get the image URL from Firebase Storage
      const url = await getDownloadURL(storageRef);

      // Save the image URL in Firestore
      const docRef = await addDoc(collection(db, 'images'), { url, name: file.name });

      // Update the images state to include the new image
      setImages((prevImages) => [
        ...prevImages,
        { id: docRef.id, url, name: file.name }
      ]);
    }
  };

  // Go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle image deletion
  const deleteImage = async (id, name) => {
    // Delete the image from Firebase Storage
    const imageRef = ref(storage, `images/${name}`);
    await deleteObject(imageRef);

    // Delete the image record from Firestore
    const imageDoc = doc(db, 'images', id);
    await deleteDoc(imageDoc);

    // Remove the image from the local state
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div className="slider-container">
      <div className="slider">
        {images.length > 0 ? (
          <img
            src={images[currentIndex].url}
            alt={`Slide ${currentIndex + 1}`}
            className="slide"
          />
        ) : (
          <div className="no-images">No images uploaded</div>
        )}
      </div>
      {images.length > 0 && (
        <>
          <button className="nav prev" onClick={prevSlide}>
            ❮
          </button>
          <button className="nav next" onClick={nextSlide}>
            ❯
          </button>
        </>
      )}

      <form className="upload-form">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
      </form>

      {/* Image Thumbnails and Delete Button */}
      <div className="image-thumbnails-1">
        {images.map((image, index) => (
          <div key={image.id} className="thumbnail-container">
            <img src={image.url} alt={`Thumbnail ${index}`} className="thumbnail-pic" />
            <button 
              className="delete-btn-imageslider" 
              onClick={() => deleteImage(image.id, image.name)}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
