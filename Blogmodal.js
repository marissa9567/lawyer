import React from 'react';
import '../styles/BlogModal.css';

const BlogModal = ({ blog, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>×</span>
                <h2>{blog.title}</h2>
                {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className="modal-image" />}
                <p>{blog.content}</p>
                <a href={blog.url} target="_blank" rel="noopener noreferrer">Read Full Article</a>
            </div>
        </div>
    );
};

export default BlogModal;
