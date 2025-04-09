import { useState, useRef, useEffect } from 'react';
import '../styles/Navbar.css';
import Login from './login';
import SignUp from './signup';
import Register from './register';  

function Navbar() {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const modalRef = useRef(null);

    // Close modal when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowLogin(false);
                setShowSignUp(false);
            }
        }

        if (showLogin || showSignUp) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showLogin, showSignUp]);

    return (
        <>
            <header className="header">
                <a href="#" className="logo">Legends</a>
                <nav className="navbar">
                    <a href="#about">About</a>
                    <a href="#why">Why join us?</a>
                    <a href="#plan">Plan</a>
                    <a href="#Coaches">Coaches</a>
                    <a href="#Visit">Visit our Gym</a>
                    
                    <button onClick={() => setShowLogin(true)}>Register</button>

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
        </>
    );
}

export default Navbar;