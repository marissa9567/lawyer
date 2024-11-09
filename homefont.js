import React, { useState, useEffect } from 'react'; 
import Post from '../components/Post';
import AddPost from '../components/AddPost';
import { getDocs, collection, doc, updateDoc, deleteDoc,addDoc } from 'firebase/firestore'; // Import necessary Firebase functions
import { db } from '../components/firebase'; // Adjust the path according to your project structure

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, 'posts'); // Adjust 'posts' to your Firestore collection name
      const postSnapshot = await getDocs(postsCollection);
      const postList = postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postList);
    };

    fetchPosts();
  }, []);

  const handleAddPost = async (newPost) => {
    // Logic to add a new post to Firestore
    // This part assumes you have an addPost function in your firebase module
    const docRef = await addDoc(collection(db, 'posts'), newPost);
    setPosts([...posts, { id: docRef.id, ...newPost }]); // Add the new post to the list with Firestore ID
  };

  const handleDeletePost = async (id) => {
    // Logic to delete a post from Firestore
    await deleteDoc(doc(db, 'posts', id));
    setPosts(posts.filter((post) => post.id !== id)); // Remove post by id
  };

  const handleUpdatePost = async (updatedPost) => {
    const { id, ...dataToUpdate } = updatedPost;

    // Remove undefined fields
    const sanitizedData = Object.fromEntries(
        Object.entries(dataToUpdate).filter(([_, value]) => value !== undefined)
    );

    // Update the post in Firestore
    await updateDoc(doc(db, 'posts', id), sanitizedData);

    // Update the local state
    const updatedPosts = posts.map(post =>
        post.id === id ? { ...post, ...sanitizedData } : post
    );
    setPosts(updatedPosts);  // Update state to reflect changes
};

  
  return (
    <div>
      <h1>My Posts</h1>
      <AddPost onAddPost={handleAddPost} />
      {posts.length === 0 ? (
        <p>No posts available. Please add a post.</p>
      ) : (
        posts.map((post) => (
            <Post key={post.id} post={post} onDeletePost={handleDeletePost} onUpdatePost={handleUpdatePost} />
        ))
      )}
    </div>
  );
};

export default Home;
