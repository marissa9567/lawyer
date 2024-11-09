import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../Context/AuthContext';

function Navbar() {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();

    const goToLogin = () => {
        navigate('/loginpage');
    };

    const goToBlog = () => {
        navigate('/'); 
    };

    return (
        <nav className="navbar">
            {isLoggedIn ? (
                <button onClick={logout}>Logout</button>
            ) : (
                <button onClick={goToLogin}>Login</button>
            )}
            <div className="container">
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/shophomepage">Shop</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/checkoutform">Checkout</Link></li>
             
                    
                        <li><Link to="/edit">Edit</Link></li>
                    
                </ul>
                <button className="blog-button" onClick={goToBlog}>Blog</button>
            </div>
        </nav>
    );
}

export default Navbar;
