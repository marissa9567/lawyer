import React, { useEffect, useState } from 'react';
import { db } from '../components/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

const ArticleList = ({ postId }) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'articles'), where('postId', '==', postId)), (snapshot) => {
            const articlesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setArticles(articlesData);
        });

        return () => unsubscribe();
    }, [postId]);

    return (
        <div>
            {articles.length === 0 ? (
                <p>No articles for this post.</p>
            ) : (
                articles.map(article => (
                    <div key={article.id}>
                        <h3>{article.title}</h3>
                        <p>{article.content}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ArticleList;
