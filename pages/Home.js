import React, { useState, useEffect, useMemo } from 'react'; 
import Post from '../components/Post';
import AddPost from '../components/AddPost';
import { getDocs, getDoc, setDoc, collection, doc, updateDoc, deleteDoc, addDoc, onSnapshot } from 'firebase/firestore';
import "../styles/Home.css";
import { db } from '../components/firebase'; 
import { useAuth } from '../Context/AuthContext';
import { useColor } from '../Context/ColorContext'; 
import Pagination from '../components/Pagination';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { shopBgColor, setShopBgColor } = useColor();
  const [newColor, setNewColor] = useState('#ffffff');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Number of posts per page
  const collectionRef = collection(db, 'posts');
  const { currentUser } = useAuth();
  const [post, setPost] = useState({});
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'posts')); // Adjust 'posts' to your collection name
        const postsArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postsArray);
    } catch (error) {
        setError("Error fetching posts: " + error.message);
    }
};

useEffect(() => {
    fetchPosts();
}, []);

  // Background color setup
  useEffect(() => {
    const fetchBackgroundColor = async () => {
      const docRef = doc(db, 'settings', 'backgroundColor');
      const docSnap = await getDoc(docRef);
      const color = docSnap.exists() ? docSnap.data().color : '#ffffff';
      setShopBgColor(color);
      setNewColor(color);
      if (!docSnap.exists()) {
        await setDoc(docRef, { color });
      }
    };
    fetchBackgroundColor();
  }, []);

  // Consolidating fetching posts and listening for real-time updates
useEffect(() => {
  const fetchPosts = async () => {
    try {
      const postSnapshot = await getDocs(collectionRef);
      const postList = postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postList); // Set the posts
      updateCategories(postList); // Update the categories
    } catch (error) {
      setError("Error fetching posts: " + error.message);
    }
  };

  // Set up real-time listener
  const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
    const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(postsData); // Set posts in real-time
    updateCategories(postsData); // Update categories
  });

  fetchPosts(); // Initial fetch for posts
  return () => unsubscribe(); // Cleanup real-time listener on unmount
}, []); // Empty dependency array to run on mount

  // Update categories based on posts
  const updateCategories = (postsData) => {
    const allCategories = new Set(postsData.map(post => post.category).filter(Boolean));
    setCategories(Array.from(allCategories));
  };

  // Color change handlers
  const handleColorChange = (e) => setNewColor(e.target.value);
  const handleSaveColor = async () => {
    await setDoc(doc(db, 'settings', 'backgroundColor'), { color: newColor });
    setShopBgColor(newColor);
  };

  // Add, delete, and update post handlers
  const handleAddPost = async (newPost) => {
    const docRef = await addDoc(collection(db, 'posts'), newPost);
    setPosts([...posts, { id: docRef.id, ...newPost }]); 
  };

  const handleDeletePost = async (id) => {
    await deleteDoc(doc(db, 'posts', id));
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleUpdatePost = async (updatedPost) => {
    const { id, ...dataToUpdate } = updatedPost;
    const sanitizedData = Object.fromEntries(Object.entries(dataToUpdate).filter(([_, value]) => value !== undefined));
    await updateDoc(doc(db, 'posts', id), sanitizedData);
    setPosts(posts.map(post => post.id === id ? { ...post, ...sanitizedData } : post));
  };

  // Filtered posts based on search and category
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesTitle = post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
      return matchesTitle && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);
  
  // Pagination logic for filtered posts
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className='home-container' style={{ backgroundColor: shopBgColor }}>
      {/* Search and category filter */}
      <div className='searchbarcontainer'>
        <input 
          className='searchbarinput'
          type="text"
          placeholder="Search titles..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='category-container'>
        <select className="category-dropdown"onChange={e => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option className="category-option-all"value="category-option">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        {currentUser && (
          <div className='color-input-background-container'>
            <button className='post-backgroundcolor-button' onClick={handleSaveColor}>
              Change Background Color
              <input
                className='color-background-input'
                type="color"
                value={newColor}
                onChange={handleColorChange}
              />
            </button>
          </div>
        )}
      </div>

      {/* Post list */}
      <h1 className='blog-post-title'>My Posts</h1>
      <div className='posts-grid'>
        {currentPosts.length === 0 ? (
          <p>No posts available. Please add a post.</p>
        ) : (
          currentPosts.map((post) => (
            <div key={post.id} className="post-container">
              <Post 
                setPost={setPost}
                post={post} 
                onDeletePost={handleDeletePost} 
                onUpdatePost={handleUpdatePost} 
              />
            </div>
          ))
        )}
      </div>

      {/* Pagination component */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;
