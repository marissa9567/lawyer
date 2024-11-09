import React, { createContext, useState } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const editPost = (index, updatedPost) => {
    const updatedPosts = posts.map((post, i) => (i === index ? updatedPost : post));
    setPosts(updatedPosts);
  };

  return (
    <PostContext.Provider value={{ posts, addPost, editPost }}>
      {children}
    </PostContext.Provider>
  );
};
