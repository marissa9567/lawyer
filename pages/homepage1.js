import React, { useEffect, useState } from 'react';
import { db } from '../components/firebase';
import { collection, onSnapshot, deleteDoc, doc, setDoc } from 'firebase/firestore';
import '../styles/Home.css'; 
import Pagination from "../components/Pagination";
import { useAuth } from '../Context/AuthContext';

const HomePage = ({ deletePost }) => {
  const [posts, setPosts] = useState([]);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [categories, setCategories] = useState(new Set());
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editPostId, setEditPostId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '', content: '', category: '', imageUrl: '', url: '',
    titleFontColor: '#000000', contentFontColor: '#000000',
    borderColor: '#000000', borderWidth: '2px', borderStyle: 'solid'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPostIds, setExpandedPostIds] = useState(new Set());
  const [filteredCategories, setFilteredCategories] = useState([]);

  const { currentUser } = useAuth(); // Assuming you have an auth context

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
      const uniqueCategories = new Set(postsData.map(post => post.category));
      setCategories(uniqueCategories);
      setFilteredCategories([...uniqueCategories]);
    });

    // Fetch global settings
    const settingsDocRef = doc(db, 'settings', 'global');
    const settingsUnsubscribe = onSnapshot(settingsDocRef, (doc) => {
      if (doc.exists()) {
        setBgColor(doc.data().backgroundColor || '#ffffff');
      }
    });

    return () => {
      unsubscribe();
      settingsUnsubscribe();
    };
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredPosts(posts.filter(post => post.category === selectedCategory));
    } else {
      setFilteredPosts(posts);
    }
  }, [selectedCategory, posts]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const handleEditPostClick = (post) => {
    setEditPostId(post.id);
    setEditFormData({
      title: post.title,
      content: post.content,
      category: post.category,
      imageUrl: post.imageUrl,
      url: post.url,
      titleFontColor: post.titleFontColor || '#000000',
      contentFontColor: post.contentFontColor || '#000000',
      borderColor: post.borderColor || '#000000',
      borderWidth: post.borderWidth || '2px',
      borderStyle: post.borderStyle || 'solid'
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const postRef = doc(db, 'posts', editPostId);
    await setDoc(postRef, { ...editFormData }, { merge: true });
    setEditPostId(null);
    resetEditForm();
  };

  const resetEditForm = () => {
    setEditFormData({
      title: '', content: '', category: '', imageUrl: '', url: '',
      titleFontColor: '#000000', contentFontColor: '#000000',
      borderColor: '#000000', borderWidth: '2px', borderStyle: 'solid'
    });
  };

  const handleColorChange = async (event) => {
    const newColor = event.target.value;
    setBgColor(newColor);
    const settingsDocRef = doc(db, 'settings', 'global');
    await setDoc(settingsDocRef, { backgroundColor: newColor }, { merge: true });
  };

  const handleDeletePost = async (postId) => {
    await deleteDoc(doc(db, 'posts', postId));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = [...categories].filter(category =>
      category.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const toggleExpandPost = (postId) => {
    setExpandedPostIds(prev => {
      const newSet = new Set(prev);
      newSet.has(postId) ? newSet.delete(postId) : newSet.add(postId);
      return newSet;
    });
  };

  const handleCommentSubmit = async (postId, comment) => {
    const postRef = doc(db, 'posts', postId);
    const post = posts.find(p => p.id === postId);
    await setDoc(postRef, { comments: [...(post.comments || []), { text: comment, replies: [] }] }, { merge: true });
  };

  const handleCommentDelete = async (postId, commentIndex) => {
    const postRef = doc(db, 'posts', postId);
    const post = posts.find(p => p.id === postId);
    const updatedComments = post.comments.filter((_, index) => index !== commentIndex);
    await setDoc(postRef, { comments: updatedComments }, { merge: true });
  };

  const handleDelete = async (postId) => {
    await deletePost(postId);
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  const getBackgroundPatternClass = (pattern) => {
    switch (pattern) {
      case 'stripes':
        return 'stripes-background';
      case 'yellowdots':
        return 'yellowdots-background';
      case 'stars':
        return 'stars-background';
      // Add other patterns as needed
      default:
        return '';
    }
  };

  const handleReplySubmit = async (postId, commentIndex, reply) => {
    const postRef = doc(db, 'posts', postId);
    const post = posts.find(p => p.id === postId);
    const updatedComments = post.comments.map((comment, index) => {
      if (index === commentIndex) {
        return { ...comment, replies: [...(comment.replies || []), reply] };
      }
      return comment;
    });
    await setDoc(postRef, { comments: updatedComments }, { merge: true });
  };

  const handleReplyDelete = async (postId, commentIndex, replyIndex) => {
    const postRef = doc(db, 'posts', postId);
    const post = posts.find(p => p.id === postId);
    const updatedComments = post.comments.map((comment, index) => {
      if (index === commentIndex) {
        return { ...comment, replies: comment.replies.filter((_, idx) => idx !== replyIndex) };
      }
      return comment;
    });
    await setDoc(postRef, { comments: updatedComments }, { merge: true });
  };

  return (
    <div className="home" style={{ backgroundColor: bgColor }}>
      {currentUser && (
        <>
          <label htmlFor="colorPicker">Select Background Color:</label>
          <select id="colorPicker" onChange={handleColorChange} value={bgColor}>
            <option value="#ffffff">White</option>
            <option value="#f0e68c">Khaki</option>
            <option value="#ffcccb">Light Red</option>
            <option value="#add8e6">Light Blue</option>
            <option value="#90ee90">Light Green</option>
            <option value="#ffb6c1">Light Pink</option>
          </select>
        </>
      )}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="posts-container">
        {paginatedPosts.length === 0 ? (
          <p>No posts available for this category.</p>
        ) : (
          paginatedPosts.map((post) => (
            <div
              key={post.id}
              className="post"
              style={{
                border: `${post.borderWidth || '2px'} ${post.borderStyle || 'solid'} ${post.borderColor || '#000'}`,
                padding: '10px',
                margin: '10px 0',
                borderRadius: '5px'
              }}
            >
              <h2 className="post-title" style={{ color: post.titleFontColor }}>{post.title}</h2>
              <p className="post-content" style={{ color: post.contentFontColor }}>
                {expandedPostIds.has(post.id) ? post.content : `${post.content.substring(0, 100)}...`}
                <button onClick={() => toggleExpandPost(post.id)}>
                  {expandedPostIds.has(post.id) ? 'Read Less' : 'Read More'}
                </button>
              </p>
              {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
              <p>Category: {post.category}</p>
              <p>URL: <a href={post.url} target="_blank" rel="noopener noreferrer">{post.url}</a></p>
              <button onClick={() => handleEditPostClick(post)}>Edit</button>
              {currentUser && <button onClick={() => handleDelete(post.id)}>Delete</button>}
            </div>
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
      {editPostId && (
        <form onSubmit={handleEditSubmit}>
          <h2>Edit Post</h2>
          <input
            type="text"
            name="title"
            value={editFormData.title}
            onChange={handleEditChange}
            placeholder="Title"
          />
          <textarea
            name="content"
            value={editFormData.content}
            onChange={handleEditChange}
            placeholder="Content"
          />
          <input
            type="text"
            name="category"
            value={editFormData.category}
            onChange={handleEditChange}
            placeholder="Category"
          />
          <input
            type="text"
            name="imageUrl"
            value={editFormData.imageUrl}
            onChange={handleEditChange}
            placeholder="Image URL"
          />
          <input
            type="text"
            name="url"
            value={editFormData.url}
            onChange={handleEditChange}
            placeholder="Article URL"
          />
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default HomePage;
