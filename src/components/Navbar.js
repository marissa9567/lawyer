import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import Logonav from '../components/Logonav';
import { NavLink, useLocation } from 'react-router-dom';


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getActiveClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="nav">
      {/* Hamburger Menu */}
      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Logo */}
      <div className="logo-nav">
        <Logonav />
      </div>

      <Link to="/contactus" className="contactsbuttonmobile">Contact Us</Link>

      {/* Navbar Links */}
      <ul className={isOpen ? 'show' : ''}>
        <Link to="/contactus" className="contactsbut">Contact Us</Link>

        <li>
  <Link to="/" onClick={toggleMenu} className={`links12 ${getActiveClass('/')}`}>home</Link>
</li>
<li>
  <Link to="/ourlawyers" onClick={toggleMenu} className={`links12 ${getActiveClass('/ourlawyers')}`}>Our Lawyers</Link>
</li>
<li>
  <Link to="/Areasoffocus" onClick={toggleMenu} className={`links12 ${getActiveClass('/Areasoffocus')}`}>Areas of Focus</Link>
</li>
<li>
  <Link to="/ourresults" onClick={toggleMenu} className={`links12 ${getActiveClass('/ourresults')}`}>Our Results</Link>
</li>

      </ul>
    </nav>
  );
}

export default Navbar;
