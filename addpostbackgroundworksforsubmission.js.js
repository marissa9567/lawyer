import React, { useState,useEffect } from 'react';
import Green from "../images/green.png";
 // Adjust the import path as needed the import path as needed
import yellowDots from '../images/yellowdots.jpg';
import ladyLiberty from '../images/ladyliberty.png';
import { db, storage } from '../components/firebase'; // Adjust this path as necessary
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';


const newPatterns = [
  { value: 'pattern1', label: 'Pattern 1', url: yellowDots }, // Use the imported variable
  { value: 'pattern2', label: 'Pattern 2', url: Green }, // Use the imported variable

  // Add more patterns as needed
];
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
    const [backgroundPattern, setBackgroundPattern] = useState(newPatterns[0].value);
    const [selectedBackground, setSelectedBackground] = useState(newPatterns[0].url);
    useEffect(() => {
      // Update selectedBackground whenever backgroundPattern changes
      const pattern = newPatterns.find(p => p.value === backgroundPattern);
      setSelectedBackground(pattern ? pattern.url : null);
    }, [backgroundPattern]);
  
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
            <div>
                <label>Upload Main Image</label>
                <input type="file" onChange={handleImageUpload} />
                {imageUrl && <img src={imageUrl} alt="Image Preview" style={{ width: '100px' }} />}
            </div>
            {imageBlobUrl && (
                      <div>
                      <label>Upload Image:</label>
                      <input type="file" onChange={handleImageChange} />
                      {imageBlobUrl && (
                          <div style={{ marginTop: '10px' }}>
                              <img src={imageBlobUrl} alt="Preview" style={{ width: '100%', height: 'auto' }} />
                          </div>
                      )}
                  </div>
                )}
            <div>
                <label>Article URL:</label>
                <input
                    type="text"
                    value={articleUrl}
                    onChange={(e) => setArticleUrl(e.target.value)}
                />
            </div>

            <label>article image url</label>
            <input
                type="text"
                placeholder="Article Image URL"
                value={articleImageUrl}
                onChange={(e) => setArticleImageUrl(e.target.value)} // Handle article image URL
            />



              
              
            <div>
                
                <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            {/* Date Input */}
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
                <div
                    style={{
                        marginTop: '10px',
                        width: '100%',
                        height: '100px',
                        background:
                        newPatterns === 'yellowdots'
                                ? `url(${yellowDots})`
                                : newPatterns === 'ladyLiberty'
                                ? `url(${ladyLiberty})`
                                : 'none',
                    }}
                />
            </div>

            {/* Font and Border Settings */}
            <div>
                <h3>Title Font</h3>
                <label>Font Color:</label>
                <input
                    type="color"
                    value={titleFontColor}
                    onChange={(e) => setTitleFontColor(e.target.value)}
                />
                <label>Font Size:</label>
                <input
                    type="number"
                    value={titleFontSize}
                    onChange={(e) => setTitleFontSize(e.target.value)}
                />
                <label>Font Style:</label>
                <select
                    value={titleFontStyle}
                    onChange={(e) => setTitleFontStyle(e.target.value)}
                >
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                </select>
            </div>

            <div>
                <h3>Content Font</h3>
                <label>Font Color:</label>
                <input
                    type="color"
                    value={contentFontColor}
                    onChange={(e) => setContentFontColor(e.target.value)}
                />
                <label>Font Size:</label>
                <input
                    type="number"
                    value={contentFontSize}
                    onChange={(e) => setContentFontSize(e.target.value)}
                />
                <label>Font Style:</label>
                <select
                    value={contentFontStyle}
                    onChange={(e) => setContentFontStyle(e.target.value)}
                >
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                </select>
            </div>

            <div>
                <h3>Border Settings</h3>
                <label>Border Color:</label>
                <input
                    type="color"
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                />
                <div>
    <h3>Border Settings</h3>
    <select
    value={borderSize}
    onChange={(e) => setBorderSize(Number(e.target.value))} // Ensure the value is a number
>
    {borderSizes.map(size => (
        <option key={size.value} value={size.value}>
            {size.label} {/* Show description */}
        </option>
    ))}
</select>
</div>


<div>
          <h3>Select Background Pattern:</h3>
          <select value={backgroundPattern} onChange={handleBackgroundChange}>
            {newPatterns.map(pattern => (
              <option key={pattern.value} value={pattern.value}>
                {pattern.label}
              </option>
            ))}
          </select>
          <div
            style={{
              marginTop: '10px',
              width: '100%',
              height: '100px',
              backgroundImage: `url(${selectedBackground})`,
              backgroundSize: 'cover',
            }}
          />
        </div>
                <label>Border Style:</label>
                <select
                    value={borderStyle}
                    onChange={(e) => setBorderStyle(e.target.value)}
                >
                    <option value="solid">Solid</option>
                    <option value="dashed">Dashed</option>
                    <option value="dotted">Dotted</option>
                </select>
                <label>Border Radius (Size):</label>
                <input
                    type="number"
                    value={borderSize}
                    onChange={(e) => setBorderSize(e.target.value)}
                />
            </div>

            <button type="submit">Add Post</button>
        </form>
    
      {/* Preview Section */}
      <div
    style={{
        marginTop: '20px',
        padding: '10px',
        border: `${borderSize}px ${borderStyle} ${borderColor}`, // Use borderSize for width
    
        backgroundImage: `url(${selectedBackground})`,
    }}
>
                <h2 style={{ color: titleFontColor, fontSize: `${titleFontSize}px`, fontFamily: titleFontStyle }}>
                    {title}
                </h2>
                <p style={{ color: contentFontColor, fontSize: `${contentFontSize}px`, fontFamily: contentFontStyle }}>
                    {content}
                </p>
                {imageBlobUrl && <img src={imageBlobUrl} alt="Post Preview" style={{ width: '100px' }} />}
                {articleUrl && ( // Show the article link if it exists
        <a href={articleUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
            Read the full article
        </a>
    )}

{articleImageUrl && ( // Show the article image link if it exists
        <>
            <img src={articleImageUrl} alt="Article Preview" style={{ width: '100px' }} />
            <br />
            <a href={articleImageUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
        
            </a>
        </>
    )}

            </div>
        </div>
           
      
        
    );
};

export default AddPost;
