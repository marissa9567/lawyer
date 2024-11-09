// Post.js
import React, { useState } from 'react';

const Post = ({ post, onDeletePost, onUpdatePost }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const [fontColor, setFontColor] = useState(post.fontColor);
  const [fontStyle, setFontStyle] = useState(post.fontStyle);
  const [fontSize, setFontSize] = useState(post.fontSize);
  
  // New states for editing title and content fonts
  const [titleFontColor, setTitleFontColor] = useState(post.titleFontColor);
  const [titleFontStyle, setTitleFontStyle] = useState(post.titleFontStyle);
  const [titleFontSize, setTitleFontSize] = useState(post.titleFontSize);
  
  const [contentFontColor, setContentFontColor] = useState(post.contentFontColor);
  const [contentFontStyle, setContentFontStyle] = useState(post.contentFontStyle);
  const [contentFontSize, setContentFontSize] = useState(post.contentFontSize);

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
    <div
      style={{
        border: `${post.borderWidth}px ${post.borderStyle} ${post.borderColor}`,
        padding: '10px',
        margin: '10px 0',
      }}
    >
      <h2 style={{ color: titleFontColor, fontSize: titleFontSize, fontStyle: titleFontStyle }}>
        {post.title}
      </h2>
      <p style={{ color: contentFontColor, fontSize: contentFontSize, fontStyle: contentFontStyle }}>
        {post.content}
      </p>
      <button onClick={() => onDeletePost(post.id)}>Delete</button>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Edit Font'}
      </button>

      {isEditing && (
        <form onSubmit={handleEditSubmit}>
          {/* Title Font Options */}
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
              value={parseInt(titleFontSize)}
              onChange={(e) => setTitleFontSize(`${e.target.value}px`)}
            />
          </label>

          {/* Content Font Options */}
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
              value={parseInt(contentFontSize)}
              onChange={(e) => setContentFontSize(`${e.target.value}px`)}
            />
          </label>
          
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default Post;
