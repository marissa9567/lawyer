import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import AddPost from "../components/AddPost";
import { db } from '../components/firebase'; // Ensure you have Firebase set up
import { collection, onSnapshot } from 'firebase/firestore';
import { doc, deleteDoc } from 'firebase/firestore';
const backgroundPatterns = {
    yellowdots: require('../images/yellowdots.jpg'),
    stars: require('../images/stars.jpg'),
    coloreddots: require('../images/coloreddots.jpg'),
    flag: require('../images/flag.jpg'),
    greenlight: require('../images/greenlight.png'),
    hobbies: require('../images/hobbies.jpg'),
    mountain: require('../images/mountain.jpg'),
    night: require('../images/night.jpg'),
    political: require('../images/political.jpg'),
    political1: require('../images/political1.jpg'),
    redtexture: require('../images/redtexture.png'),
    retro: require('../images/retrobackground.jpg'),
    rights: require('../images/rights.jpg'),
    wisemen: require('../images/wisemen.jpg'),
    wood: require('../images/wood.jpg'),
};

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
            const postsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setPosts(postsData);
        });
        return () => unsubscribe();
    }, []);

    const handleAddPost = (post) => {
        setPosts((prev) => [...prev, post]);
        console.log("Updated posts: ", [...posts, post]);
    };

    const handleDeletePost = async (id) => {
        try {
            await deleteDoc(doc(db, 'posts', id)); // Delete the post from Firestore
            setPosts((prev) => prev.filter(post => post.id !== id)); // Update local state
        } catch (error) {
            console.error("Error deleting post: ", error);
        }
    };
    return (
        <div>
            <h1>Blog Posts</h1>
            <AddPost username="User" onAddPost={handleAddPost} />
            {posts.map((post) => (
                <div key={post.id} style={{
                    width: `${post.boxWidth}px`,
                    height: `${post.boxHeight}px`,
                    padding: '10px',
                    boxSizing: 'border-box',
                    background: post.backgroundPattern && post.backgroundPattern !== 'none'
                        ? `url(${backgroundPatterns[post.backgroundPattern]})`
                        : 'transparent',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    fontSize: `${post.fontSize}px`,
                    fontFamily: post.fontStyle,
                    color: post.fontColor,
                    border: `${post.borderWidth}px ${post.borderStyle} ${post.borderColor}`,
                }}>
                    {post.imageUrl && (
                        <img src={post.imageUrl} alt="Post" style={{
                            maxWidth: '100%',
                            height: 'auto',
                            marginBottom: '10px',
                        }} />
                    )}
                    <h2 style={{
                        fontSize: `${post.titleFontSize}px`,
                        fontFamily: post.titleFontStyle,
                        color: post.titleFontColor,
                    }}>
                        {post.title}
                    </h2>
                    <p style={{
                        fontSize: `${post.fontSize}px`,
                    }}>
                        {post.content}
                    </p>
                    <p style={{ fontSize: '12px', color: '#555' }}>
                        Date: {post.date} | Category: {post.category}
                    </p>
                    <button onClick={() => handleDeletePost(post.id)}>Delete</button> {/* Delete button */}
                </div>
            ))}
        </div>
    );
};

export default Home;
