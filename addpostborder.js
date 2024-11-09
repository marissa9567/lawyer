// AddPost.js
import React, { useState } from 'react';

const AddPost = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [fontColor, setFontColor] = useState('#000000');
  const [fontStyle, setFontStyle] = useState('normal');
  const [fontSize, setFontSize] = useState('16px');
  
  // New state variables for border options
  const [borderColor, setBorderColor] = useState('#000000');
  const [borderWidth, setBorderWidth] = useState('1');
  const [borderStyle, setBorderStyle] = useState('solid');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
      fontColor,
      fontStyle,
      fontSize,
      borderColor,  // Add border color to the new post
      borderWidth,  // Add border width to the new post
      borderStyle,  // Add border style to the new post
    };
    onAddPost(newPost);
    // Reset form fields
    setTitle('');
    setContent('');
    setFontColor('#000000');
    setFontStyle('normal');
    setFontSize('16px');
    setBorderColor('#000000');  // Reset border color
    setBorderWidth('1');         // Reset border width
    setBorderStyle('solid');     // Reset border style
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
      <label>
        Font Color:
        <input
          type="color"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
        />
      </label>
      <label>
        Font Style:
        <select
          value={fontStyle}
          onChange={(e) => setFontStyle(e.target.value)}
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
          value={parseInt(fontSize)} // Ensure fontSize is a number
          onChange={(e) => setFontSize(`${e.target.value}px`)}
        />
      </label>
      
      {/* Border Options */}
      <label>
        Border Color:
        <input
          type="color"
          value={borderColor}
          onChange={(e) => setBorderColor(e.target.value)}
        />
      </label>
      <label>
        Border Width:
        <input
          type="number"
          value={borderWidth}
          onChange={(e) => setBorderWidth(e.target.value)}
        />
      </label>
      <label>
        Border Style:
        <select
          value={borderStyle}
          onChange={(e) => setBorderStyle(e.target.value)}
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
        </select>
      </label>
      
      <button type="submit">Add Post</button>
    </form>
  );
};

export default AddPost;
