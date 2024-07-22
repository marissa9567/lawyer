import "../styles/Footer.css";
import Logo from "../components/Logo";

function Footer() {
    return (
        <footer className="footer">
            <div className="first">
                <div className="logo">
                    <Logo />
                </div>
                <div className="privacy-terms">
                    <p style={{ marginRight: "20px" }}>Privacy</p>
                    <p>Terms of Use</p>
                </div>
            </div>
            <div className="second">
                <h5>About</h5>
                <p style={{ fontSize: "10px" }}>Our Lawyers</p>
                <p style={{ fontSize: "10px" }}>Areas of Focus</p>
                <p style={{ fontSize: "10px" }}>Our Results</p>
            </div>
            <div className="third">
                <h5>Contact</h5>
                <p style={{ fontSize: "10px" }}>Email</p>
                <p style={{ fontSize: "10px" }}>Phone</p>
                <p style={{ fontSize: "10px" }}>Address</p>
            </div>
        </footer>
    );
}

export default Footer;
