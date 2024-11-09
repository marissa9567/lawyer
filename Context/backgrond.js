import React, { useEffect, useState } from 'react';
import { db } from '../components/firebase'; // Adjust the import path as needed
import { collection, onSnapshot } from 'firebase/firestore';
import AddPost from '../components/AddPost';
import Post from '../components/Post'; // Ensure Post component is imported

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      const postsArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(postsArray);
    });
    return () => unsubscribe();
  }, []);

  const handlePostAdded = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  return (
    <div>
      <AddPost onPostAdded={handlePostAdded} />
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
