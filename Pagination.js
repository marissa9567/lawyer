// src/components/Pagination.js

import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const handlePageClick = (pageNumber) => {
        if (pageNumber !== currentPage) {
            onPageChange(pageNumber);
        }
    };

    return (
        <div className="pagination">
            <button 
                className="prev-button" 
                onClick={() => handlePageClick(currentPage - 1)} 
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                    onClick={() => handlePageClick(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
            <button 
                className="next-button" 
                onClick={() => handlePageClick(currentPage + 1)} 
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
