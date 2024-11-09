// src/components/HomePage.js
import React from 'react';
import yellowdots from '../images/yellowdots.jpg'; 
// other imports...

const HomePage = ({ posts, deletePost }) => {
  const getBackgroundPatternStyle = (pattern) => {
    switch (pattern) {
      case 'yellowdots':
        return `url(${yellowdots})`;
      // other cases...
      default:
        return 'none';
    }
  };

  return (
    <div>
      <h1>Blog Posts homepage</h1>
      {posts && posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <div
                style={{
                  fontSize: `${post.fontSize || 16}px`,
                  fontFamily: post.fontStyle || 'Arial',
                  color: post.fontColor || '#000000',
                  background: getBackgroundPatternStyle(post.backgroundPattern || 'none'),
                  backgroundSize: 'cover',
           
                  padding: '10px',
                  marginBottom: '10px',
                  border: `${post.borderWidth || 2}px ${post.borderStyle || 'solid'} ${post.borderColor || '#ddd'}`,
                  boxSizing: 'border-box',
                  width: `${post.boxWidth || 300}px`,
                  height: `${post.boxHeight || 200}px`,
                }}
              >
                {/* Title Box */}
                <div style={{
                  fontSize: '1.5em',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  padding: '5px',
                  overflowWrap: 'break-word',
                  wordBreak: 'break-word',
                  whiteSpace: 'normal',
                  borderBottom: `${post.titleBorderWidth || 2}px ${post.titleBorderStyle || 'solid'} ${post.titleBorderColor || '#ddd'}`,
                }}>
                  {post.title}
                </div>
                {/* Content Box */}
                <div>
                  <p>{post.content}</p>
                  {post.imageUrl && <img src={post.imageUrl} alt={post.title} style={{ width: '200px' }} />}
                </div>
              </div>
              <button onClick={() => deletePost(post.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  );
};

export default HomePage;
