// RightDrawer.js
import React, { useEffect, useState } from 'react';
import { db } from '../components/firebase'; // Ensure the path is correct
import { collection, getDocs } from 'firebase/firestore';

const RightDrawer = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const articlesCollection = collection(db, 'articles');
      const articlesSnapshot = await getDocs(articlesCollection);
      const articlesList = articlesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articlesList);
      console.log("Fetched Articles:", articlesList); // Debugging output
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []); // Only runs once when the component mounts

  return (
    <div>
      <h2>Articles</h2>
      {articles.length > 0 ? (
        articles.map(article => (
          <div key={article.id}>
            <h3>{article.articleLink}</h3>
            <img src={article.imageLink} alt="Article" style={{ width: '100%', height: 'auto' }} />
          </div>
        ))
      ) : (
        <p>No articles available.</p>
      )}
    </div>
  );
};

export default RightDrawer;
