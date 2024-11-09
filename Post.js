import React, { useState, useEffect } from 'react';
import backgroundPatterns from '../components/Patterns';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../components/firebase';
import "../styles/Post.css";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../components/firebase';
import { useAuth } from '../Context/AuthContext';

const Post = ({ post, onDeletePost, onUpdatePost }) => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || '');
  const [articleUrl, setArticleUrl] = useState(post?.articleUrl || '');
  const [category, setCategory] = useState(post?.category || '');
  const [date, setDate] = useState(post?.date || '');
  const [content, setContent] = useState(post?.content || '');
  const [title, setTitle] = useState(post?.title || '');
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => setIsExpanded(prev => !prev);
  
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'posts', post.id));
      alert('Post deleted successfully!');
      onDeletePost(post.id);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  useEffect(() => {
    if (post) {
      setImageUrl(post.imageUrl || '');
      setArticleUrl(post.articleUrl || '');
      setCategory(post.category || '');
      setDate(post.date || '');
      setContent(post.content || '');
      setTitle(post.title || '');
    }
  }, [post]);

  const truncateContent = (text) => {
    const MAX_WORDS = 50;
    return text.split(' ').length > MAX_WORDS
      ? text.split(' ').slice(0, MAX_WORDS).join(' ') + '...'
      : text;
  };

  const dynamicStyles = {

    backgroundImage: `url(${backgroundPatterns.find(pattern => pattern.value === post.backgroundPattern)?.url || ''})`,
    border: `${post.borderWidth || '1px'} ${post.borderStyle || 'solid'} ${post.borderColor || '#000'}`,
  };

  return (
    <div className='post-container' style={dynamicStyles}>
      {imageUrl && <img className='post-image' src={imageUrl} alt="Post" />}
      <h2 className='post-title'>{title}</h2>
      <p className='post-content'>
        {isExpanded ? content : truncateContent(content)}
      </p>
      <button className='toggle-content-button' onClick={toggleContent}>
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
      {currentUser && (
        <div className="post-button-group">
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel Edit' : 'Edit Post'}
          </button>
        </div>
      )}
      <div>
        {articleUrl && (
          <p>
            <a href={articleUrl} target="_blank" rel="noopener noreferrer">
              Read the article
            </a>
          </p>
        )}
        <p>Date: {date ? new Date(date).toLocaleDateString() : 'N/A'}</p>
        <p>Category: {category}</p>
      </div>
    </div>
  );
};

export default Post;
