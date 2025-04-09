import { useState, useRef, useEffect } from 'react';
import '../styles/Navbar.css';
import Login from './login';
import SignUp from './signup';
import Register from './register';  

function Navbar() {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const modalRef = useRef(null);

    // Close modal when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowLogin(false);
                setShowSignUp(false);
                setShowRegister(false);
            }
        }

        if (showLogin || showSignUp || showRegister) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showLogin, showSignUp, showRegister]);

    const handleRegister = (formData) => {
        // Handle registration logic here
        console.log('Registration data:', formData);
    };

    return (
        <>
            <header className="header">
                <a href="#about" className="logo">Legends</a>
                <nav className="navbar">
                    <a href="#why">About</a>
                    
                    <a href="#plan">Plan</a>
                    <a href="#coaches">Coaches</a>
                    <a href="#visit">Visit our Gym</a>
                    
                    <button onClick={() => setShowRegister(true)}>Register</button>
                    <button onClick={() => setShowLogin(true)}>Sign in</button>
                </nav>
            </header>

            {/* Login Modal */}
            {showLogin && (
                <div className="modal-overlay">
                    <div className="modal" ref={modalRef}>
                        <Login 
                            onLogin={() => setShowLogin(false)} 
                            onShowSignup={() => {
                                setShowLogin(false);
                                setShowSignUp(true);
                            }}
                        />
                    </div>
                </div>
            )}

            {/* SignUp Modal */}
            {showSignUp && (
                <div className="modal-overlay">
                    <div className="modal" ref={modalRef}>
                        <SignUp 
                            onSignup={() => setShowSignUp(false)}
                            onShowLogin={() => {
                                setShowSignUp(false);
                                setShowLogin(true);
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Register Modal */}
            {showRegister && (
                <div className="modal-overlay">
                    <div className="modal" ref={modalRef}>
                        <Register 
                            onClose={() => setShowRegister(false)}
                            onRegister={handleRegister}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;