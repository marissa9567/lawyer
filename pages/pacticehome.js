import React, { useState, useEffect, useMemo } from 'react';
import AddPost from '../components/AddPost';
import Post from '../components/Post';
import { db } from '../components/firebase';
import { collection, onSnapshot, getDocs, deleteDoc, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { useColor } from '../Context/ColorContext'; 
import "../styles/Home.css";
import Pagination from "../components/Pagination";
import Comments from '../components/Comments';
import { useAuth } from '../Context/AuthContext';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { shopBgColor, setShopBgColor } = useColor();
  const [newColor, setNewColor] = useState('#ffffff');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const collectionRef = collection(db, 'posts');
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const { currentUser } = useAuth();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
      updateCategories(postsData);
    });

    return () => unsubscribe();
  }, [collectionRef]);

  const updateCategories = (postsData) => {
    const allCategories = new Set(postsData.map(post => post.category).filter(Boolean));
    setCategories(Array.from(allCategories));
  };

  // Fetch background color setting
  useEffect(() => {
    const fetchBackgroundColor = async () => {
      const docRef = doc(db, 'settings', 'backgroundColor');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setShopBgColor(docSnap.data().color);
        setNewColor(docSnap.data().color);
      } else {
        const defaultColor = '#ffffff';
        setShopBgColor(defaultColor);
        setNewColor(defaultColor);
        await setDoc(docRef, { color: defaultColor });
      }
    };

    fetchBackgroundColor();
  }, []);

  // Handle color changes
  const handleColorChange = (e) => {
    setNewColor(e.target.value);
  };

  // Save new color to Firestore
  const handleSaveColor = async () => {
    console.log('Saving new color:', newColor); // Debugging line
    await setDoc(doc(db, 'settings', 'backgroundColor'), { color: newColor });
    setShopBgColor(newColor);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const isMatchingTitle = post.title.toLowerCase().includes(searchTerm.toLowerCase());
      const isMatchingCategory = selectedCategory ? post.category === selectedCategory : true;
      return isMatchingTitle && isMatchingCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  const handleDeletePost = async (id) => {
    await deleteDoc(doc(db, 'posts', id));
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const handleUpdatePost = async (updatedPost) => {
    try {
      const postRef = doc(db, 'posts', updatedPost.id);
      await updateDoc(postRef, updatedPost);
      setPosts((prevPosts) => prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post)));
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div style={{ backgroundColor: shopBgColor }}>
      <div className='searchbarcontainer'>
        <input 
          className='searchbarinput'
          type="text"
          placeholder="Search titles..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='category-dropdown'>
        <select onChange={e => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className='color-input-background-container'>
        {currentUser && (
          <button className='post-backgroundcolor-button' onClick={handleSaveColor}>
            Change Background Color
            <input 
              className='color-background-input'
              type="color"
              value={newColor}
              onChange={handleColorChange}
            />
          </button>
        )}
      </div>

      <div className='posts-grid'>
        {filteredPosts.map(post => (
          <div key={post.id} className="post-container">
            <Post
              post={post}
              onDeletePost={handleDeletePost}
              onUpdatePost={handleUpdatePost}
            />
            <Comments postId={post.id} />
          </div>
        ))}
      </div>
      
      <Pagination
        totalPages={Math.ceil(posts.length / postsPerPage)}
        currentPage={currentPage}
        onPageChange={paginate}
      />
    </div>
  );
};

export default Home;
