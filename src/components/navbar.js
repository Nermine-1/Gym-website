import { useState, useRef, useEffect } from "react";
import "../styles/Navbar.css";
import Login from "./login";
import SignUp from "./signup";
import Register from "./register";

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Added to store logged-in user
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
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLogin, showSignUp, showRegister]);

  const handleSignUp = async (formData) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("SignUp successful:", data);
        setShowSignUp(false);
        // Optionally, prompt user to login or auto-login if token is returned
      } else {
        console.error(
          "SignUp failed:",
          data.message || "Unknown error during sign-up."
        );
        // Optionally, show an error message to the user
      }
    } catch (error) {
      console.error("Error during SignUp:", error);
      // Optionally, show a generic error message
    }
  };

  const handleLogin = async (formData) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);
        setCurrentUser(data.user); // Store user info
        setShowLogin(false);
        // Optionally, store token, redirect, update UI
      } else {
        console.error("Login failed:", data.message || "Invalid credentials.");
        setCurrentUser(null);
        // Optionally, show an error message to the user
      }
    } catch (error) {
      console.error("Error during login:", error);
      setCurrentUser(null);
      // Optionally, show a generic error message
    }
  };

  const handleRegister = async (planFormData) => {
    if (!currentUser || !currentUser.id) {
      console.error("User must be logged in to register for a plan.");
      alert("Please log in first to register for a plan."); // Simple alert, can be improved
      setShowRegister(false); // Close the plan registration modal
      setShowLogin(true); // Open the login modal
      return;
    }

    const registrationData = {
      ...planFormData,
      user_id: currentUser.id, // Add the logged-in user's ID
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Plan registration successful:", data);
        setShowRegister(false);
        // Optionally, show a success message or redirect
      } else {
        console.error(
          "Plan registration failed:",
          data.message || "Unknown error during plan registration."
        );
        // Optionally, show an error message to the user
      }
    } catch (error) {
      console.error("Error during plan registration:", error);
      // Optionally, show a generic error message
    }
  };

  return (
    <>
      <header className="header">
        <a href="#about" className="logo">
          Legends
        </a>
        <nav className="navbar">
          <a href="#why">About</a>
          <a href="#plan">Plan</a>
          <a href="#coaches">Coaches</a>
          <a href="#visit">Visit our Gym</a>

          {/* Update button text if user is logged in, for example */}
          {currentUser ? (
            <>
              <span>
                Welcome, {currentUser.full_name || currentUser.email}!
              </span>
              <button
                onClick={() => {
                  setCurrentUser(null); /* Basic logout */
                  console.log("User logged out");
                  // Potentially call a backend logout endpoint if you have one
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => setShowLogin(true)}>Sign in</button>
          )}
          <button onClick={() => setShowRegister(true)}>
            Register for Plan
          </button>
          {/* Removed the generic "Register" button, assuming "Sign Up" is handled by the link in Login modal
              or you can have a dedicated "Sign Up" button if preferred.
              The "Register for Plan" button now clearly indicates its purpose.
          */}
        </nav>
      </header>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal" ref={modalRef}>
            <Login
              onLogin={handleLogin}
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
              onSignup={handleSignUp} // Updated to use handleSignUp
              onShowLogin={() => {
                setShowSignUp(false);
                setShowLogin(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Register Modal (for plans) */}
      {showRegister && (
        <div className="modal-overlay">
          <div className="modal" ref={modalRef}>
            <Register
              onClose={() => setShowRegister(false)}
              onRegister={handleRegister} // This now sends user_id if logged in
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
