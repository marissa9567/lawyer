import "../styles/Articlethumbnail.css";


// ArticleThumbnail.js
import React from 'react';
const ArticleThumbnail = ({ article }) => {
    return (
        <div className="article-thumbnail">
            <img src={article.thumbnail} alt={article.title} className="thumbnail-image" />
            <h3>{article.title}</h3>
            <p>{article.description}</p>
        </div>
    );
};

export default ArticleThumbnail;