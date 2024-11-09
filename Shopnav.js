import "../styles/Shopnavbar.css";
import { Link } from "react-router-dom";
import Contactus from "../components/Contactus";

function Shopnavbar() {
  return (
    <nav className="Shop-navbar">
      <div className="Shop-container">
      
        <ul className="Shopnav-links">
          <li><Link to="/">Shop All</Link></li>
     
          <li><Link to="/shophomepage">Contact</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/track">Track Order</Link></li> {/* Corrected link to match your tracking route */}
        </ul>
      </div>
    </nav>
  );
}

export default Shopnavbar;
