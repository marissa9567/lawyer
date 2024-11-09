import React, { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../Context/AuthContext';
import { db } from '../components/firebase'; // Import your Firebase config
import { doc, setDoc, getDoc } from 'firebase/firestore';

function Navbar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [showShopLink, setShowShopLink] = useState(true); // State for showing shop link
  const [showTrackerLink, setShowTrackerLink] = useState(true); // State for showing tracker link

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const toggleShopLinkVisibility = async () => {
    const newValue = !showShopLink;
    setShowShopLink(newValue);
    
    // Save to Firestore (for shop link visibility)
    await setDoc(doc(db, 'shopPreferences', 'visibility'), { showShopLink: newValue }, { merge: true });
  };

  const toggleTrackerLinkVisibility = async () => {
    const newValue = !showTrackerLink;
    setShowTrackerLink(newValue);

    // Save to Firestore (for tracker link visibility)
    await setDoc(doc(db, 'trackerPreferences', 'visibility'), { showTrackerLink: newValue }, { merge: true });
  };

  // Load preferences from Firestore on mount
  useEffect(() => {
    const fetchPreferences = async () => {
      const shopVisibilityDocRef = doc(db, 'shopPreferences', 'visibility');
      const shopVisibilityDoc = await getDoc(shopVisibilityDocRef);
      if (shopVisibilityDoc.exists()) {
        const data = shopVisibilityDoc.data();
        setShowShopLink(data.showShopLink !== undefined ? data.showShopLink : true); // Default to true if not set
      }

      const trackerVisibilityDocRef = doc(db, 'trackerPreferences', 'visibility');
      const trackerVisibilityDoc = await getDoc(trackerVisibilityDocRef);
      if (trackerVisibilityDoc.exists()) {
        const data = trackerVisibilityDoc.data();
        setShowTrackerLink(data.showTrackerLink !== undefined ? data.showTrackerLink : true); // Default to true if not set
      }
    };

    fetchPreferences();
  }, []);

  return (
    <nav className="nav">
      <ul className="nav-links">
        <li className="navbarlink"><Link className="home" to="/">Blog</Link></li>


        {showShopLink && <li className="navbarlink"><Link className="navbar-shophomepage" to="/shophomepage">Shop</Link></li>}
        <li className="navbarlink"><Link className="about" to="/about">About</Link></li>
         <li className="Navbarlink"><Link className="about" to="/Fff">fff</Link></li>
        {showTrackerLink && <li className="navbarlink"><Link className="track-navbar" to="/track">Tracker</Link></li>}
        <li className="navbarlink"><Link className="navbar-cart" to="/cart">Cart</Link></li>



        <li className="navbarlink"><Link className="navbar-cart" to="/contactus">Contact</Link></li>
        <li className="logged">
          {currentUser && <span className="logged-on">Logged On</span>}
        </li>
        
        <li className="navloginbutton">
          {currentUser ? (
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          ) : (
            <Link className="loginlink" to="/login">Login</Link>
          )}
        </li>

        {currentUser && (
          <><li className="Faq-button"><Link className="faq" to="/faq">Help</Link></li>
               <li className="contact-button"><Link className="contact-nav-link" to="/contactus">Contact messages</Link></li>
            <li className="addpost-button"><Link className="addpostnav" to="/addpost">Add Post</Link></li>
            <li className="edit-shop-button"><Link className="edit-link-nav" to="/edit">Edit Shop</Link></li>
          </>
        )}
      </ul>
      
      {/* Button to toggle shop link visibility */}
      {currentUser && (
        <div>
          <button onClick={toggleShopLinkVisibility} className="toggle-shop-button" >
            {showShopLink ? "Hide Shop Link" : "Show Shop Link"}
          </button>
          <button className="toggle-tracker-button"onClick={toggleTrackerLinkVisibility} >
            {showTrackerLink ? "Hide Tracker Link" : "Show Tracker Link"}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
