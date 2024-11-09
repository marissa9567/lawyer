import React, { useState, useEffect } from 'react';
import backgroundPatterns from '../components/Patterns'; // Import your background patterns
import { deleteDoc, doc,updateDoc } from 'firebase/firestore';
import { db } from '../components/firebase'; // Adjust the path according to your project structure
import "../styles/Post.css";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../components/firebase'; // Ensure this path is correct
import  { useContext } from 'react';

import { useAuth } from '../Context/AuthContext';

const Post = ({ post, onDeletePost, onUpdatePost}) => {
  const [isEditing, setIsEditing] = useState(false);

  // State for image upload
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || '');
  const { currentUser } = useAuth();

  // State variables for font and style properties
  const [newImageFile, setNewImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(post.imageUrl || "");
  const [articleLink, setArticleLink] = useState(post.articleLink || '');
  const [articleImageUrl, setArticleImageUrl] = useState(post.articleImageUrl || '');
  const [category, setCategory] = useState(post.category || ''); 
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
  const [date, setDate] = useState(post.date || '');
  const [posts, setPosts] = useState([]);
  const [file, setFile] = useState(null); // Define the file state
  const [isExpanded, setIsExpanded] = useState(false);
   const [content, setContent] = useState('');
   const postStyle = {
    backgroundImage: `url(${backgroundPatterns.find(pattern => pattern.value === backgroundPattern)?.url || 'none'})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderColor: isEditing ? borderColor : post.borderColor || '#000',
    borderStyle: isEditing ? borderStyle : post.borderStyle || 'solid',
    borderWidth: isEditing ? borderWidth : post.borderWidth || '1px',
  };

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
    setImageUrl(post.imageUrl || ''); // Update the image URL when post changes
    setDate(post.date || ''); // Update the date when post changes
    setCategory(post.category || '');
    setArticleLink(post.articleLink || ''); // Initialize article link state
    setArticleImageUrl(post.articleImageUrl || '');
    setImagePreviewUrl(post.imageUrl || ""); // Set initial image preview
  }, [post]);
  const MAX_WORDS = 50; // 

  const truncateContent = (content) => {
    const words = content.split(' ');
    return words.length > MAX_WORDS ? words.slice(0, MAX_WORDS).join(' ') + '...' : content;
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'posts', id));
      alert('Post deleted successfully!');
      onDeletePost(id); // Ensure the parent component is notified
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', { 
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
      date, 
      imageUrl ,
      category ,
      articleLink, // Include article link in the submitted data
      articleImageUrl
    });
    
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
        date,
        imageUrl,
        category,
        articleLink, // Include article link in the updated post
      articleImageUrl 
    };

    console.log('Updated Post:', updatedPost); // Debugging log
    onUpdatePost(updatedPost);
    setIsEditing(false);
};

  const toggleContent = () => {
    setIsExpanded((prev) => !prev);
  };
  // Locate URL of the selected background pattern
  const selectedPattern = backgroundPatterns.find((pattern) => pattern.value === backgroundPattern);
  const backgroundUrl = selectedPattern ? selectedPattern.url : 'none';
  const handleUpdatePost = (updatedPost) => {
    // Assuming you are using Firestore or another database
    const postRef = doc(db, 'posts', updatedPost.id);
    updateDoc(postRef, updatedPost)
      .then(() => {
        // Update the local state to reflect the changes
        setPosts((prevPosts) => 
          prevPosts.map((post) => 
            post.id === updatedPost.id ? updatedPost : post
          )
        );
      })
      .catch((error) => {
        console.error('Error updating post:', error);
      });
};
const handleImageDelete = () => {
  setImageUrl(""); // Clear the image URL state
};


const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Check if the file size is less than 10 MB (10 * 1024 * 1024 bytes)
    const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB
    if (file.size > maxSizeInBytes) {
      alert("File size must be less than 10 MB."); // Notify the user
      return; // Exit the function if the file is too large
    }

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

const handleEditToggle = () => {
  setIsEditing((prev) => {
    if (!prev) {
      // Reset state only when entering edit mode
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
      setImageUrl(post.imageUrl || '');
      setCategory(post.category || '');
      setDate(post.date || '');
      setArticleLink(post.articleLink || ''); // Reset article link when entering edit mode
        setArticleImageUrl(post.articleImageUrl || ''); 
      
    }
    return !prev;
  });
};

  return (
    <div className='post-container'
    
      style={{
        borderColor: isEditing ? borderColor : post.borderColor || '#000',
        borderStyle: isEditing ? borderStyle : post.borderStyle || 'solid',
        borderWidth: isEditing ? borderWidth : post.borderWidth || '1px',
          backgroundImage: backgroundPattern ? `url(${backgroundPattern})` : 'none', // Apply background pattern
        background: `url(${backgroundPatterns.find(pattern => pattern.value === backgroundPattern)?.url || 'none'})`,
      }}
    >
      {post.imageUrl && (
        <img className='post-image' src={post.imageUrl} alt="Post Image" />
      )}
      <h2 style={{ color: titleFontColor, fontSize: titleFontSize, fontFamily: titleFontStyle }}>
        {post.title}
      </h2>
      <p style={{ color: contentFontColor, fontSize: contentFontSize, fontFamily: contentFontStyle }}>
        {isExpanded ? post.content : truncateContent(post.content)}
        <button className="post-toggle-content" onClick={toggleContent}>
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </p>

      {articleImageUrl && (
        <img src={articleImageUrl} alt="Article" className='post-article-image' />
      )}
      <a href={articleLink} target="_blank" rel="noopener noreferrer">Read the article here</a>

      <div>
        {currentUser && ( 
        <button className="post-delete-button"onClick={() => handleDelete(post.id)}>Delete</button>)}
       {currentUser && ( 
        <button className="post-edit-button"onClick={handleEditToggle}>
          {isEditing ? 'Cancel Edit' : 'Edit Post'}
        </button>)}
      </div>

      <p>Date: {post.date ? new Date(post.date).toLocaleDateString() : 'N/A'}</p>
      <p className='post-category-dropdown'>Category: {post.category}</p>
      {isEditing && (
        <form onSubmit={handleEditSubmit}>
           

          <button type="submit">Update Post</button>
          <h3>Title Font Options</h3>
          <label>
            Font Color:
            <input
              type="color"
              value={titleFontColor}
              onChange={(e) => setTitleFontColor(e.target.value)}
            />
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
            <input
              type="number"
              value={parseInt(titleFontSize)}
              onChange={(e) => setTitleFontSize(`${e.target.value}px`)}
            />
          </label>

          <h3>Content Font Options</h3>
          <label>
            Font Color:
            <input
              type="color"
              value={contentFontColor}
              onChange={(e) => setContentFontColor(e.target.value)}
            />
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
            <input
              type="number"
              value={parseInt(contentFontSize)}
              onChange={(e) => setContentFontSize(`${e.target.value}px`)}
            />
          </label>

          <h3>Border Options</h3>
          <label>
            Border Color:
            <input
              type="color"
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
            />
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
            <input
              type="number"
              value={parseInt(borderWidth)}
              onChange={(e) => setBorderWidth(`${e.target.value}px`)}
            />
          </label>

          <h3>Select Background Pattern</h3>
          <label>
            Background Pattern:
            <select value={backgroundPattern} onChange={(e) => setBackgroundPattern(e.target.value)}>
              {backgroundPatterns.map((pattern, index) => (
                <option key={`${pattern.value}-${index}`} value={pattern.value}>
                  {pattern.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Article Link:
            <input
              type="text"
              value={articleLink}
              onChange={(e) => setArticleLink(e.target.value)}
            />
          </label>
          <label>
            Article Image URL:
            <input
              type="text"
              value={articleImageUrl}
              onChange={(e) => setArticleImageUrl(e.target.value)}
            />
          </label>
          <h3>Image Upload</h3>
          <button onClick={handleImageDelete}>Delete Image</button>
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
          
          {/* Date Input Field */}
          <label>
            Date:
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="YYYY-MM-DD" // Optional: Help users with the expected format
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
          <button className="post-save-button"type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default Post;
