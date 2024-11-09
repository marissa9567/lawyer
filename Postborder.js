import React, { useState } from 'react';

const Post = ({ post, onDeletePost, onUpdatePost }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingBorder, setIsEditingBorder] = useState(false);

  // Font states
  const [fontColor, setFontColor] = useState(post.fontColor || '#000000');
  const [fontStyle, setFontStyle] = useState(post.fontStyle || 'normal');
  const [fontSize, setFontSize] = useState(post.fontSize || '16px');

  // Title font states
  const [titleFontColor, setTitleFontColor] = useState(post.titleFontColor || '#000000');
  const [titleFontStyle, setTitleFontStyle] = useState(post.titleFontStyle || 'normal');
  const [titleFontSize, setTitleFontSize] = useState(post.titleFontSize || '24px');

  // Content font states
  const [contentFontColor, setContentFontColor] = useState(post.contentFontColor || '#000000');
  const [contentFontStyle, setContentFontStyle] = useState(post.contentFontStyle || 'normal');
  const [contentFontSize, setContentFontSize] = useState(post.contentFontSize || '16px');

  // Border states
  const [borderColor, setBorderColor] = useState(post.borderColor || '#000000');
  const [borderStyle, setBorderStyle] = useState(post.borderStyle || 'solid');
  const [borderWidth, setBorderWidth] = useState(post.borderWidth || '1');

  const handleBorderEditSubmit = (e) => {
    e.preventDefault();
    const updatedPost = {
      ...post,
      borderColor,
      borderStyle,
      borderWidth,
    };
    onUpdatePost(updatedPost);
    setIsEditingBorder(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedPost = {
      ...post,
      fontColor,
      fontStyle,
      fontSize,
      titleFontColor,
      titleFontStyle,
      titleFontSize,
      contentFontColor,
      contentFontStyle,
      contentFontSize,
    };
    onUpdatePost(updatedPost);
    setIsEditing(false);
  };

  return (
    <div style={{ border: `${borderWidth}px ${borderStyle} ${borderColor}` }}>
      <h2 style={{ color: titleFontColor, fontSize: titleFontSize, fontStyle: titleFontStyle }}>
        {post.title}
      </h2>
      <p style={{ color: contentFontColor, fontSize: contentFontSize, fontStyle: contentFontStyle }}>
        {post.content}
      </p>
      <button onClick={() => onDeletePost(post.id)}>Delete</button>
      
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel Font Edit' : 'Edit Font'}
      </button>

      {isEditing && (
        <form onSubmit={handleEditSubmit}>
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
              value={parseInt(titleFontSize)} // Ensure this is a number
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
              value={parseInt(contentFontSize)} // Ensure this is a number
              onChange={(e) => setContentFontSize(`${e.target.value}px`)}
            />
          </label>
          
          <button type="submit">Save Font Changes</button>
        </form>
      )}

      <button onClick={() => setIsEditingBorder(!isEditingBorder)}>
        {isEditingBorder ? 'Cancel Border Edit' : 'Edit Border'}
      </button>

      {isEditingBorder && (
        <form onSubmit={handleBorderEditSubmit}>
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
              value={borderWidth} // Ensure this is a number
              onChange={(e) => setBorderWidth(e.target.value)}
            />
          </label>
          <button type="submit">Save Border Changes</button>
        </form>
      )}
    </div>
  );
};

export default Post;
