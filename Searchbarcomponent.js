import React from 'react';
import "../styles/Searchbar.css";
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="shopsearchbarcontainer">
      <input
        type="text"
        placeholder="Search by category..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
    </div>
  );
};

export default SearchBar;
