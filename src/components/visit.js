import '../styles/visit.css';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

function Visit() {
    return (
        <div id="visit" className="visit-container">
            <h1 className="visit-title">VISIT OUR GYM</h1>
            
            <div className="visit-content">
                <div className="socials-section">
                    <h2 className="socials-title">OUR SOCIALS:</h2>
                    
                    <div className="contact-info">
                        <div className="info-item">
                            <FaMapMarkerAlt className="info-icon" />
                            <div>
                                <p className="info-text">5015 Bouhjar-Monastir</p>
                                <p className="info-text">Bouhjar City</p>
                            </div>
                        </div>
                        
                        <div className="info-item">
                            <FaEnvelope className="info-icon" />
                            <p className="info-text">legendspro@gmail.com</p>
                        </div>
                        
                        <div className="info-item">
                            <FaPhone className="info-icon" />
                            <p className="info-text">24675285</p>
                        </div>
                    </div>
                </div>
                
                <div className="map-section">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3233.6124023251004!2d10.596869576237287!3d35.85850657021468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sisitcom!5e0!3m2!1sfr!2stn!4v1744222953632!5m2!1sfr!2stn" 
                        width="100%" 
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen="" 
                        loading="lazy" 
                        title="Gym Location"
                        className="gym-map"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default Visit;