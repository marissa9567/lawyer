import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../components/firebase'; // Adjust the import path for your Firebase configuration
import AddPost from '../components/AddPost'; // Adjust the import path for your AddPost component
import Post from "../components/Post";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
            const postsArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setPosts(postsArray);
        });
        return () => unsubscribe();
    }, []);

    const handleAddPost = (newPost) => {
        setPosts(prevPosts => [...prevPosts, newPost]);
    };

    const handleDeletePost = async (id) => {
        try {
            await deleteDoc(doc(db, 'posts', id));
            setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div>
            <h1>Blog Posts</h1>
            <AddPost posts={posts} addPost={handleAddPost} />
            
            {posts.map(post => (
                <div key={post.id} style={{ borderColor: post.borderColor, borderStyle: post.borderStyle, borderWidth: post.borderWidth, border: '1px solid' }}>
                    <h2 style={{ color: post.titleFontColor, fontSize: post.titleFontSize, fontStyle: post.titleFontStyle }}>
                        {post.title}
                    </h2>
                    <p style={{ color: post.contentFontColor, fontSize: post.contentFontSize, fontStyle: post.contentFontStyle }}>
                        {post.content}
                    </p>
                    {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
                    <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
                </div>
            ))}
        </div>
    );
};

export default Home;
