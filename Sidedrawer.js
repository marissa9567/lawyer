
import '../styles/Sidedrawer.css';
import Drawercontent from "../components/Drawercontent";
// RightDrawer.js
import React, { useEffect, useState } from 'react';
import { db } from '../components/firebase'; // Ensure the path is correct
import { collection, getDocs } from 'firebase/firestore';
const SideDrawer = ({ isOpen, onClose }) => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Set items per page to 5

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

    const indexOfLastArticle = currentPage * itemsPerPage;
    const indexOfFirstArticle = indexOfLastArticle - itemsPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(articles.length / itemsPerPage);
    return (
        <div className={`side-drawer ${isOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={onClose}>Close</button>
        <div>
            <Drawercontent />
            <h2>Articles</h2>
            {articles.length > 0 ? (
                articles.map(article => (
                    <div className="sidedrawer-article-container"key={article.id}>
                            <img src={article.imageLink} alt="Article" className='article-image-sidedrawer' />
                    <a href={article.articleLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h3>{article.articleLink}</h3>
                    
                    </a>
                </div>
                ))
            ) : (
                <p>No articles available.</p>
            )}

              {/* Pagination Controls */}
              <div>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            disabled={index + 1 === currentPage}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
        </div>
    </div>
    );
};

export default SideDrawer;
