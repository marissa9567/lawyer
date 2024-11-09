import React from 'react';
import '../styles/BlogCard.css';

const BlogCard = ({ blog, onOpen }) => {
    return (
        <div className="blog-card">
            <h3>{blog.title}</h3>
            <p>{blog.content.slice(0, 100)}...</p>
            {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} />}
            <a href="#" onClick={(e) => { e.preventDefault(); onOpen(); }}>Read More</a> {/* Link to open the modal */}
        </div>
    );
};

export default BlogCard;
