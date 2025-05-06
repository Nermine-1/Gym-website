import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/admin.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        navigate("/admin/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2 className="admin-login-heading">Admin Login</h2>
        {error && <div className="admin-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-wrapper">
              <input
                type="text"
                id="username"
                className="input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="username" className="input-label">
                Username
              </label>
            </div>
          </div>
          <div className="input-group">
            <div className="input-wrapper">
              <input
                type="password"
                id="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
