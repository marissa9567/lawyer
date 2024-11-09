// src/Context/ArticleContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, addDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../components/firebase'; // Adjust path as needed

const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);

    // Fetch articles on mount
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articlesCollectionRef = collection(db, 'articles');
                const snapshot = await getDocs(articlesCollectionRef);
                const articlesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setArticles(articlesData);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []); // Empty dependency array ensures this runs only once on mount

    const addArticle = async (newArticle) => {
        try {
            const articlesCollectionRef = collection(db, 'articles');
            const docRef = await addDoc(articlesCollectionRef, newArticle);
            setArticles(prevArticles => [...prevArticles, { id: docRef.id, ...newArticle }]);
        } catch (error) {
            console.error('Error adding article:', error);
        }
    };

    const addPostToArticle = async (articleId, newPost) => {
        try {
            const postsCollectionRef = collection(db, `articles/${articleId}/posts`);
            await addDoc(postsCollectionRef, newPost);
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    return (
        <ArticleContext.Provider value={{ articles, addArticle, addPostToArticle }}>
            {children}
        </ArticleContext.Provider>
    );
};

export const useArticles = () => {
    const context = useContext(ArticleContext);
    if (!context) {
        throw new Error('useArticles must be used within an ArticleProvider');
    }
    return context;
};
