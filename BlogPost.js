import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app'; // Adjust as per your Firebase setup
import 'firebase/database'; // Import Firebase Database
import Article from '../components/Article';
import ArticleForm from '../components/ArticleForm'; // Ensure correct casing
import "../styles/BlogPost.css";
const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [articles, setArticles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const snapshot = await firebase.database().ref('posts').once('value');
                const postsData = snapshot.val();
                const postsArray = [];

                for (let id in postsData) {
                    postsArray.push({ id, ...postsData[id] });
                }
                setPosts(postsArray);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    const addArticle = async (newArticle) => {
        // Save to Firebase
        try {
            const newArticleRef = firebase.database().ref('articles').push(); // Adjust the path as needed
            await newArticleRef.set(newArticle);
            setArticles((prevArticles) => [...prevArticles, { id: newArticleRef.key, ...newArticle }]);
        } catch (error) {
            console.error("Error adding article:", error);
        }
    };

    const openModal = (post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedPost(null);
    };

    const getBackgroundPatternStyle = (pattern) => {
        const patterns = {
            yellowdots: 'path/to/yellowdots.jpg',
            stars: 'path/to/stars.jpg',
            // Add other patterns here
        };
        return patterns[pattern] ? `url(${patterns[pattern]})` : 'none';
    };

    return (
        <div>
            <ArticleForm addArticle={addArticle} />
            <div>
                {articles.map((article) => (
                    <Article 
                        key={article.id} 
                        title={article.title} 
                        url={article.url} 
                        image={article.image} 
                    />
                ))}
            </div>
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="blog-post"
                    style={{
                        backgroundImage: getBackgroundPatternStyle(post.backgroundPattern),
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        padding: '20px',
                        margin: '10px',
                        color: '#fff',
                    }}
                >
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    {post.image && <img src={post.image} alt={post.title} />}
                    <button onClick={() => openModal(post)} style={{ marginTop: '10px', cursor: 'pointer' }}>
                        Read More
                    </button>
                </div>
            ))}
            {/* Modal Component Placeholder */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{selectedPost.title}</h2>
                        <p>{selectedPost.content}</p>
                        <button onClick={handleModalClose}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blog;
