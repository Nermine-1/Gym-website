import { useState } from 'react'; // Import useState
import '../styles/signup.css';

function SignUp({ onSignup, onShowLogin }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    const formData = { fullName, email, password }; // Construct formData
    // Add signup logic
    onSignup(formData); // Pass formData
  };

  return (
    <form onSubmit={handleSubmit} className="signup-container" id="signup">
      <h1 className="signup-heading">Sign Up</h1>

      <div className="input-group">
        <div className="input-wrapper">
          <input
            type="text"
            id="name"
            className="input-field"
            value={fullName} // Control component
            onChange={(e) => setFullName(e.target.value)} // Update state
            required
          />
          <label htmlFor="name" className="input-label">Full Name</label>
        </div>
      </div>

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
          <label htmlFor="email" className="input-label">Email</label>
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
          <label htmlFor="password" className="input-label">Password</label>
        </div>
      </div>

      <div className="input-group">
        <div className="input-wrapper">
          <input
            type="password"
            id="confirm-password"
            className="input-field"
            value={confirmPassword} // Control component
            onChange={(e) => setConfirmPassword(e.target.value)} // Update state
            required
          />
          <label htmlFor="confirm-password" className="input-label">Confirm Password</label>
        </div>
      </div>

      <button type="submit" className="signup-button">Create Account</button>

      <div className="login-link">
        <p>Already have an account? 
          <a 
            href="#login" 
            className="login-text"
            onClick={(e) => {
              e.preventDefault();
              onShowLogin();
            }}
          >
            Log In
          </a>
        </p>
      </div>
    </form>
  );
}

export default SignUp;