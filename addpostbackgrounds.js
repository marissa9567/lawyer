// AddPost.js
import React, { useState } from 'react';
import backgroundPatterns from '../components/Patterns'; // Import your background patterns

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
  
  const [borderColor, setBorderColor] = useState('#000000');
  const [borderStyle, setBorderStyle] = useState('solid');
  const [borderWidth, setBorderWidth] = useState(1);
  
  // New state for background pattern
  const [backgroundPattern, setBackgroundPattern] = useState('');

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
        id: Date.now(),
      borderColor,
      borderStyle,
      borderWidth,
      backgroundPattern, // Include background pattern
    };
    onAddPost(newPost);
    // Reset form
    setTitle('');
    setContent('');
    setTitleFontColor('#000000');
    setTitleFontStyle('normal');
    setTitleFontSize('16px');
    setContentFontColor('#000000');
    setContentFontStyle('normal');
    setContentFontSize('16px');
    setBorderColor('#000000');
    setBorderStyle('solid');
    setBorderWidth(1);
    setBackgroundPattern(''); // Reset background pattern
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
        <select
          value={borderStyle}
          onChange={(e) => setBorderStyle(e.target.value)}
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
        </select>
      </label>
      <label>
        Border Width (px):
        <input
          type="number"
          value={borderWidth}
          onChange={(e) => setBorderWidth(e.target.value)}
        />
      </label>
      
      {/* Background Pattern Selector */}
      <label>
        Background Pattern:
        <select
          value={backgroundPattern}
          onChange={(e) => setBackgroundPattern(e.target.value)}
        >
          <option value="">Select a Background</option>
          {backgroundPatterns.map((pattern) => (
            <option key={pattern.value} value={pattern.value}>
              {pattern.label}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Add Post</button>
    </form>
  );
};

export default AddPost;
