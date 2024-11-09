import "../styles/Footer.css";
import Logo from "../components/Logo";
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className="footer">
            <div className="first">
                <div className="logo">
                    <Logo />
                </div>
                <div className="privacy-terms">
                    <p className="privacy">Privacy</p>
                    <p className="termsuse">Terms of Use</p>
                </div>
            </div>
            <div className="second-third">
            <div className="second-about">
                <h5 className="about">About</h5>
               

                <Link to="/ourlawyers" className="about-lawyers">Our Lawyers</Link>

              
                <p className="about-focus">Areas of Focus</p>
                <Link to="/ourresults" className="about-results">Results</Link>
            </div>
            <div className="third-contact">
         
                <Link to="/contactus" className="contacts">Contact Us</Link>


                <p className="contact-email">Email</p>
                <p className="contact-phone">Phone</p>
                <p className="contact-address">Address</p>
            </div>
            </div>
        </div>
    );
}

export default Footer;
