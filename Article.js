import React from 'react';

const Article = ({ title, url, image }) => {
  return (
    <div className="article">
      <h2>{title}</h2>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={image} alt={title} />
      </a>
    </div>
  );
};

export default Article;
