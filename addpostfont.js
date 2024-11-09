// AddPost.js
import React, { useState } from 'react';

const AddPost = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  // Title font settings
  const [titleFontColor, setTitleFontColor] = useState('#000000');
  const [titleFontStyle, setTitleFontStyle] = useState('normal');
  const [titleFontSize, setTitleFontSize] = useState('16px');

  // Content font settings
  const [contentFontColor, setContentFontColor] = useState('#000000');
  const [contentFontStyle, setContentFontStyle] = useState('normal');
  const [contentFontSize, setContentFontSize] = useState('16px');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
      titleFontColor,
      titleFontStyle,
      titleFontSize,
      contentFontColor,
      contentFontStyle,
      contentFontSize,
      id: Date.now(),  // Generate a unique ID
    };
    
    onAddPost(newPost);  // Call the function to add the post
    // Reset form fields
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setTitleFontColor('#000000');
    setTitleFontStyle('normal');
    setTitleFontSize('16px');
    setContentFontColor('#000000');
    setContentFontStyle('normal');
    setContentFontSize('16px');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Post Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      
      {/* Title Font Settings */}
      <h4>Title Font Settings</h4>
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
        <select
          value={titleFontStyle}
          onChange={(e) => setTitleFontStyle(e.target.value)}
        >
          <option value="normal">Normal</option>
          <option value="italic">Italic</option>
          <option value="bold">Bold</option>
        </select>
      </label>
      <label>
        Font Size:
        <input
          type="number"
          value={parseInt(titleFontSize)} // Ensure fontSize is a number
          onChange={(e) => setTitleFontSize(`${e.target.value}px`)}
        />
      </label>

      {/* Content Font Settings */}
      <h4>Content Font Settings</h4>
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
        <select
          value={contentFontStyle}
          onChange={(e) => setContentFontStyle(e.target.value)}
        >
          <option value="normal">Normal</option>
          <option value="italic">Italic</option>
          <option value="bold">Bold</option>
        </select>
      </label>
      <label>
        Font Size:
        <input
          type="number"
          value={parseInt(contentFontSize)} // Ensure fontSize is a number
          onChange={(e) => setContentFontSize(`${e.target.value}px`)}
        />
      </label>
      
      <button type="submit">Add Post</button>
    </form>
  );
};

export default AddPost;
