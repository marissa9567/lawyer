import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundPatterns from '../components/Patterns'; // Adjust the import path as needed
import { db, storage } from '../components/firebase'; // Adjust this path as necessary
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import yellowDots from '../images/yellowdots.jpg';
import ladyLiberty from '../images/ladyliberty.png';


const borderSizes = [
    { value: 0, label: 'No Border (0px)' },
    { value: 1, label: 'Thin Border (1px)' },
    { value: 2, label: 'Thin Border (2px)' },
    { value: 3, label: 'Medium Border (3px)' },
    { value: 4, label: 'Medium Border (4px)' },
    { value: 5, label: 'Thick Border (5px)' },
    { value: 6, label: 'Thick Border (6px)' },
    { value: 7, label: 'Very Thick Border (7px)' },
    { value: 8, label: 'Very Thick Border (8px)' },
    { value: 9, label: 'Extra Thick Border (9px)' },
    { value: 10, label: 'Extra Thick Border (10px)' },
];
const AddPost = ({ onPostAdded }) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [articleUrl, setArticleUrl] = useState('');
    const [titleFontColor, setTitleFontColor] = useState('#000000');
    const [contentFontColor, setContentFontColor] = useState('#000000');
    const [titleFontSize, setTitleFontSize] = useState(16);
    const [contentFontSize, setContentFontSize] = useState(14);
    const [titleFontStyle, setTitleFontStyle] = useState('Arial');
    const [contentFontStyle, setContentFontStyle] = useState('Arial');
    const [borderColor, setBorderColor] = useState('#000000');
    const [borderWidth, setBorderWidth] = useState(1);
    const [borderStyle, setBorderStyle] = useState('solid');
    const [borderSize, setBorderSize] = useState(0); // Default to 0px
    const [imageFile, setImageFile] = useState(null);
    const [imageBlobUrl, setImageBlobUrl] = useState(null);
    const [articleImageUrl, setArticleImageUrl] = useState('');
    const [category, setCategory] = useState(''); // Category input state
    const [date, setDate] = useState(''); // Date input state
    const [isSubmitting, setIsSubmitting] = useState(false); // Add this line
    const [selectedBackground, setSelectedBackground] = useState(backgroundPatterns[0]);
  const [backgroundPattern, setBackgroundPattern] = useState(backgroundPatterns[0].value); // Default pattern

  useEffect(() => {
    // Clean up the Blob URL when component unmounts or image changes
    return () => {
        if (imageBlobUrl) {
            URL.revokeObjectURL(imageBlobUrl);
        }
    };
}, [imageBlobUrl]);


const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
      const blobUrl = URL.createObjectURL(file);
      setImageBlobUrl(blobUrl); // Set Blob URL for preview
      setImageFile(file); // Store the file for later upload
  }
};
const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
      const blobUrl = URL.createObjectURL(file);
      setImageBlobUrl(blobUrl); // Set Blob URL for preview
      setImageFile(file); // Store the file for later upload
  }
};
const handleBackgroundChange = (event) => {
  setBackgroundPattern(event.target.value);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitting) return; // Prevent multiple submissions
  setIsSubmitting(true); // Set to true to prevent further submissions

  let uploadedImageUrl = ''; // Initialize an empty string for the uploaded image URL

  if (imageFile) {
      // Here you should upload the image to your storage and get the URL
      const storageRef = ref(storage, `images/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      uploadedImageUrl = await getDownloadURL(storageRef); // Get the uploaded image URL
      setImageUrl(uploadedImageUrl); // Set the uploaded image URL for saving
  }

  try {
      // Create a new post object
      const newPost = {
          title,
          content,
          imageUrl: uploadedImageUrl, // Use the uploaded image URL
          articleUrl,
          backgroundPattern,
          titleFontColor,
          contentFontColor,
          titleFontSize,
          contentFontSize,
          titleFontStyle,
          contentFontStyle,
          borderColor,
          borderWidth,
          borderStyle,
          borderSize,
          articleImageUrl,
          category,
          date,
      };

      // Add the post to Firestore
      await addDoc(collection(db, 'posts'), newPost);

      // Reset the form after submission
      resetForm();

      // Call the onPostAdded callback to refresh the post list in the parent component
      if (typeof onPostAdded === 'function') {
          onPostAdded(newPost); // Pass the new post to the callback
      }
  } catch (error) {
      console.error('Error adding post: ', error);
  } finally {
      setIsSubmitting(false); // Reset submission state
  }

  // Clean up temporary URL object after preview
  if (imageFile) {
      URL.revokeObjectURL(uploadedImageUrl);
  }
};

// Function to reset form fields
const resetForm = () => {
  setTitle('');
  setContent('');
  setImageUrl('');
  setArticleUrl('');
  setBackgroundPattern('none');
  setTitleFontColor('#000000');
  setContentFontColor('#000000');
  setTitleFontSize(16);
  setContentFontSize(14);
  setTitleFontStyle('Arial');
  setContentFontStyle('Arial');
  setBorderColor('#000000');
  setBorderWidth(1);
  setBorderStyle('solid');
  setBorderSize(2);
  setImageFile(null);
  setImageBlobUrl(null);
  setArticleImageUrl('');
  setCategory('');
  setDate('');
};
  return (
    <div>
    <form onSubmit={handleSubmit}>
        <div>
            <label>Title:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
        </div>

        <div>
            <label>Content:</label>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
        </div>
       
     
 
               
            
               
               


<label>Background Pattern:</label>
                <select value={backgroundPattern} onChange={handleBackgroundChange}>
                    {backgroundPatterns.map((pattern) => (
                        <option key={pattern.label} value={pattern.value}>
                            {pattern.label}
                        </option>
                    ))}
                </select>
                
          
             
                <button type="submit">Add Post</button>




     </form>
    
        </div>

   
  );
};

export default AddPost;
