import React, { useState } from 'react';
import '../styles/Pppp.css'; // Import CSS for styling
import flag from "../images/flag.jpg";

const App = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
  
    // Toggle the popup visibility
    const togglePopup = () => {
      setIsPopupOpen(!isPopupOpen);
    };
  
    return (
      <div className="App">
        <div className="toggle-div" onClick={togglePopup}>
          Click here to open popup
        </div>
        {isPopupOpen && <Popup onClose={togglePopup} />}
      </div>
    );
  };
  
  const Popup = ({ onClose }) => {
    return (
      <div className="popup-overlay">
        <div className="popup-box">
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
          <h2>Popup Content</h2>
          <p>This is a simple popup box.</p>
        </div>
      </div>
    );
  };
  
  export default App;