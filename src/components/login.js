import { useState } from "react"; // Import useState
import "../styles/login.css";

function Login({ onLogin, onShowSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { email, password }; // Construct formData
    onLogin(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="login-container">
      <h1 className="login-heading">Login</h1>

      <div className="input-group">
        <div className="input-wrapper">
          <input
            type="email"
            id="email"
            className="input-field"
            value={email} // Control component
            onChange={(e) => setEmail(e.target.value)} // Update state
            required
          />
          <label htmlFor="email" className="input-label">
            Email
          </label>
        </div>
      </div>

      <div className="input-group">
        <div className="input-wrapper">
          <input
            type="password"
            id="password"
            className="input-field"
            value={password} // Control component
            onChange={(e) => setPassword(e.target.value)} // Update state
            required
          />
          <label htmlFor="password" className="input-label">
            Password
          </label>
        </div>
      </div>

      <button type="submit" className="login-button">
        Login
      </button>

      <div className="signup-link">
        <p>
          Don't have an account?
          <a
            href="#signup"
            className="signup-text"
            onClick={(e) => {
              e.preventDefault();
              onShowSignup();
            }}
          >
            Sign Up
          </a>
        </p>
      </div>
    </form>
  );
}

export default Login;
