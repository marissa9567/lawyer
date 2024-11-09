import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
 
import backgroundPatterns from '../components/Patterns'; // Import your background patterns

const Post = ({ post, onDeletePost, onUpdatePost, storage, db }) => {
  const [isEditing, setIsEditing] = useState(false);

  // State variables for font and style properties
  const [titleFontColor, setTitleFontColor] = useState(post.titleFontColor);
  const [titleFontStyle, setTitleFontStyle] = useState(post.titleFontStyle);
  const [titleFontSize, setTitleFontSize] = useState(post.titleFontSize);
  const [contentFontColor, setContentFontColor] = useState(post.contentFontColor);
  const [contentFontStyle, setContentFontStyle] = useState(post.contentFontStyle);
  const [contentFontSize, setContentFontSize] = useState(post.contentFontSize);
  const [borderColor, setBorderColor] = useState(post.borderColor || "#000");
  const [borderStyle, setBorderStyle] = useState(post.borderStyle || "solid");
  const [borderWidth, setBorderWidth] = useState(post.borderWidth || "1px");
  const [backgroundPattern, setBackgroundPattern] = useState(post.backgroundPattern);
  
  // File upload state
  const [newImageFile, setNewImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(post.imageUrl || "");

  // Update local state when the `post` prop changes
  useEffect(() => {
    setTitleFontColor(post.titleFontColor);
    setTitleFontStyle(post.titleFontStyle);
    setTitleFontSize(post.titleFontSize);
    setContentFontColor(post.contentFontColor);
    setContentFontStyle(post.contentFontStyle);
    setContentFontSize(post.contentFontSize);
    setBorderColor(post.borderColor || "#000");
    setBorderStyle(post.borderStyle || "solid");
    setBorderWidth(post.borderWidth || "1px");
    setBackgroundPattern(post.backgroundPattern);
    setImagePreviewUrl(post.imageUrl || ""); // Set initial image preview
  }, [post]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file)); // Set preview URL
    }
  };

  const handleSaveImageUpload = async () => {
    if (newImageFile) {
      const imageRef = ref(storage, `images/${newImageFile.name}`);
      try {
        await uploadBytes(imageRef, newImageFile);
        const downloadURL = await getDownloadURL(imageRef);
  
        // Update Firestore and local state
        const updatedPost = {
          ...post,
          imageUrl: downloadURL,
        };
        onUpdatePost(updatedPost); // Update the post with the image URL
        setNewImageFile(null);
        setIsEditing(false);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedPost = {
      ...post,
      titleFontColor,
      titleFontStyle,
      titleFontSize,
      contentFontColor,
      contentFontStyle,
      contentFontSize,
      borderColor,
      borderStyle,
      borderWidth,
      backgroundPattern,
    };

    onUpdatePost(updatedPost);
    setIsEditing(false);
  };

  // Locate URL of the selected background pattern
  const selectedPattern = backgroundPatterns.find((pattern) => pattern.value === backgroundPattern);
  const backgroundUrl = selectedPattern ? selectedPattern.url : 'none';

  return (
    <div
      style={{
        border: `${borderWidth} ${borderStyle} ${borderColor}`,
        background: `url(${backgroundUrl}) no-repeat center center`,
        backgroundSize: 'cover',
      }}
    >
      <h2 style={{ color: titleFontColor, fontSize: titleFontSize, fontStyle: titleFontStyle }}>
        {post.title}
      </h2>
      <p style={{ color: contentFontColor, fontSize: contentFontSize, fontStyle: contentFontStyle }}>
        {post.content}
      </p>
      {imagePreviewUrl && <img src={imagePreviewUrl} alt="Post Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />}
      <button onClick={() => onDeletePost(post.id)}>Delete</button>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel Edit' : 'Edit Post'}
      </button>
      {isEditing && (
        <form onSubmit={handleEditSubmit}>
          {/* Title Font Options */}
          <h3>Title Font Options</h3>
          <label>
            Font Color:
            <input type="color" value={titleFontColor} onChange={(e) => setTitleFontColor(e.target.value)} />
          </label>
          <label>
            Font Style:
            <select value={titleFontStyle} onChange={(e) => setTitleFontStyle(e.target.value)}>
              <option value="normal">Normal</option>
              <option value="italic">Italic</option>
              <option value="bold">Bold</option>
            </select>
          </label>
          <label>
            Font Size:
            <input type="number" value={parseInt(titleFontSize)} onChange={(e) => setTitleFontSize(`${e.target.value}px`)} />
          </label>

          {/* Content Font Options */}
          <h3>Content Font Options</h3>
          <label>
            Font Color:
            <input type="color" value={contentFontColor} onChange={(e) => setContentFontColor(e.target.value)} />
          </label>
          <label>
            Font Style:
            <select value={contentFontStyle} onChange={(e) => setContentFontStyle(e.target.value)}>
              <option value="normal">Normal</option>
              <option value="italic">Italic</option>
              <option value="bold">Bold</option>
            </select>
          </label>
          <label>
            Font Size:
            <input type="number" value={parseInt(contentFontSize)} onChange={(e) => setContentFontSize(`${e.target.value}px`)} />
          </label>

          {/* Border Options */}
          <h3>Border Options</h3>
          <label>
            Border Color:
            <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
          </label>
          <label>
            Border Style:
            <select value={borderStyle} onChange={(e) => setBorderStyle(e.target.value)}>
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
            </select>
          </label>
          <label>
            Border Width:
            <input type="number" value={parseInt(borderWidth)} onChange={(e) => setBorderWidth(`${e.target.value}px`)} />
          </label>

          {/* Background Pattern Selection */}
          <h3>Select Background Pattern</h3>
          <label>
            Background Pattern:
            <select value={backgroundPattern} onChange={(e) => setBackgroundPattern(e.target.value)}>
              {backgroundPatterns.map((pattern) => (
                <option key={pattern.value} value={pattern.value}>
                  {pattern.label}
                </option>
              ))}
            </select>
          </label>

          {/* Image Upload */}
          <h3>Upload Image</h3>
          <label>
            Image:
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>
          {newImageFile && (
            <button type="button" onClick={handleSaveImageUpload}>
              Save Uploaded Image
            </button>
          )}
          
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default Post;
