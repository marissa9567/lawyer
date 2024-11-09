import React from 'react';
import '../styles/Alert.css'; // Optional: Create a CSS file for styling

const Alert = ({ message, onClose }) => {
    return (
        <div className="alert-overlay">
            <div className="alert-box">
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Alert;
