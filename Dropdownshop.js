import React, { useState } from 'react';
import "../styles/Shopdropdown.css";




const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the dropdown open or closed
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-toggle">
        Select an option
      </button>
      
      {isOpen && (
        <ul className="dropdown-menu">
          <li className="dropdown-item">Popular</li>
          <li className="dropdown-item">New</li>
   
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
