import React from 'react';
import BlogPost from './BlogPost'; // Adjust import path as needed

const BlogList = ({ posts, deletePost, isLoggedIn }) => {
  return (
    <div className="blog-list">
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map(post => (
          <BlogPost
            key={post.id}
            title={post.title}
            content={post.content}
            image={post.image}
            deletePost={() => deletePost(post.id)}
            isLoggedIn={isLoggedIn}
          />
        ))
      )}
    </div>
  );
};

export default BlogList;
