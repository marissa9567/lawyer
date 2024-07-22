import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import Logo from '../components/Logo';

function Navbar() {
  return (
    <nav className="nav">
      <Logo />
      <ul>
        <li>
          <Link to="/ourlawyers">Our Lawyers</Link>
        </li>
        <li>
          <Link to="/Areasoffocus">Areas of Focus</Link>
        </li>
        <li>
          <Link to="/ourresults">Our Results</Link>
        </li>
        <li>
          <Link to="/contactus">Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
