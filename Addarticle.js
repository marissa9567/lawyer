import React, { useEffect } from 'react';
import { useArticles } from '../Context/ArticleContext'; // Adjust path as needed

const ArticlesManager = () => {
    const { articles, addArticle, fetchArticles } = useArticles();

    useEffect(() => {
        fetchArticles(); // Fetch articles on component mount
    }, [fetchArticles]);

    const handleAddArticle = () => {
        const newArticle = {
            title: 'New Article',
            content: 'Content of the new article',
            // Add any other fields as necessary
        };
        addArticle(newArticle);
    };

    return (
        <div>
            <h1>Manage Articles</h1>
            <button onClick={handleAddArticle}>Add Article</button>
            <ul>
                {articles.map(article => (
                    <li key={article.id}>{article.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default ArticlesManager;
