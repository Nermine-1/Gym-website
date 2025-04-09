import '../styles/footer.css';
import { 
    FaYoutube, 
    FaEnvelope,
    FaFacebook,
    FaInstagram,
    FaApple,
    FaGooglePlay 
} from 'react-icons/fa';

function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-brand">
                    <h1 className="footer-title">Legends GYM</h1>
                    <p className="footer-description">
                        Legends, The Fitness Land, is the .....
                    </p>
                    <p className="footer-tagline">Legends Gym, Only for Legends!</p>
                </div>

                <div className="footer-links">
                    <div className="links-column">
                        <h3 className="links-title">USEFUL LINKS</h3>
                        <ul className="links-list">
                            <li>Chat</li>
                            <li>Activities</li>
                            <li>Clubs</li>
                            <li>Nutritionist</li>
                            <li>Bank Payment</li>
                            
                        </ul>
                    </div>

                    <div className="links-column">
                        <h3 className="links-title">INFORMATION</h3>
                        <ul className="links-list">
                            <li>About Us</li>
                            
                            <li>FAQ</li>
                        </ul>
                    </div>

                    <div className="links-column">
                        <h3 className="links-title">FOLLOW US</h3>
                        <ul className="links-list">
                            <li>
                                <FaFacebook className="social-icon" /> Facebook
                            </li>
                            <li>
                                <FaInstagram className="social-icon" /> Instagram
                            </li>
                            <li>
                                <FaYoutube className="social-icon" /> YouTube
                            </li>
                            <li>
                                <FaEnvelope className="social-icon" /> Contact Us
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-apps">
                <div className="app-badge">
                    <FaApple className="app-icon" />
                    <span>App Store</span>
                </div>
                <div className="app-badge">
                    <FaGooglePlay className="app-icon" />
                    <span>Google Play</span>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Legends Gym. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;