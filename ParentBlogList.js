import React, { useState, useEffect } from 'react';
import AddPost from '../components/AddPost'; // Adjust the import path as needed
import { db,addDoc, collection, getDocs, deleteDoc, doc } from '../components/firebase'; // Adjust the import path as needed
import BlogList from '../components/BlogList';


const ParentBlogList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, 'posts');
      const snapshot = await getDocs(postsCollection);
      const postsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  const handleAddPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };
  const deletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  return (
   
      
     <BlogList className="blog"posts={posts} deletePost={deletePost} isLoggedIn={isLoggedIn}  />
  
  );
}

export default ParentBlogList;
