import '../styles/signup.css';

function SignUp({ onSignup, onShowLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add signup logic
    onSignup();
  };

  return (
    <form onSubmit={handleSubmit} className="signup-container" id="signup">
      <h1 className="signup-heading">Sign Up</h1>
      
      <div className="input-group">
        <div className="input-wrapper">
          <input type="text" id="name" className="input-field" required />
          <label htmlFor="name" className="input-label">Full Name</label>
        </div>
      </div>

      <div className="input-group">
        <div className="input-wrapper">
          <input type="email" id="email" className="input-field" required />
          <label htmlFor="email" className="input-label">Email</label>
        </div>
      </div>

      <div className="input-group">
        <div className="input-wrapper">
          <input type="password" id="password" className="input-field" required />
          <label htmlFor="password" className="input-label">Password</label>
        </div>
      </div>

      <div className="input-group">
        <div className="input-wrapper">
          <input type="password" id="confirm-password" className="input-field" required />
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