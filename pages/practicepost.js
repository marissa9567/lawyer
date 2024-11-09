// components/Post.js
import React from 'react';
import { db } from '../components/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

const Post = ({ id, title, content, titleColor, contentColor, onDelete }) => {
  const handleDelete = async () => {
    try {
      const postRef = doc(db, 'posts', id);
      await deleteDoc(postRef);
      onDelete(id); // Call the parent function to remove the post from state
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  return (
    <div>
      <h2 style={{ color: titleColor }}>{title}</h2>
      <p style={{ color: contentColor }}>{content}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Post;
