// src/pages/ArticlePage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../components/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const ArticlePage = () => {
    const { postId } = useParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'articles'), (snapshot) => {
            const articlesData = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(article => article.postId === postId);

            setArticles(articlesData);
            setLoading(false);
        }, (err) => {
            setError(err.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [postId]);

    if (loading) return <p>Loading articles...</p>;
    if (error) return <p>Error fetching articles: {error}</p>;

    return (
        <div>
            <h1>Articles for Post ID: {postId}</h1>
            {articles.length === 0 ? (
                <p>No articles available for this post. Check back later or create a new article!</p>
            ) : (
                articles.map(article => (
                    <div key={article.id}>
                        <h2>{article.title}</h2>
                        <p>{article.content}</p>
                        {article.imageUrl && (
                            <img src={article.imageUrl} alt={article.title} loading="lazy" />
                        )}
                        <a href={article.url} target="_blank" rel="noopener noreferrer">Read Full Article</a>
                    </div>
                ))
            )}
        </div>
    );
};

export default ArticlePage;
