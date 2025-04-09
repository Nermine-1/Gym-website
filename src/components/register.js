import { useState } from "react";
import "../styles/Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    email: "",
    contact: "",
    plan: "",
    price: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration Data:", formData);
    // Add your registration logic here (API call, etc.)
  };

  return (
    <div className="register-page" id="register">
      <form onSubmit={handleSubmit} className="register-container">
        <div className="register-header">
          <h2 className="register-subheading">Become a Member!</h2>
          <h1 className="register-heading">Register</h1>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="name" className="form-label">
              Name of Participant
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="name"
                className="input-field"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="date" className="form-label">
              Date of Join
            </label>
            <div className="input-wrapper">
              <input
                type="date"
                id="date"
                className="input-field date-field"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                className="input-field"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="contact" className="form-label">
              Contact No.
            </label>
            <div className="input-wrapper">
              <input
                type="tel"
                id="contact"
                className="input-field"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="input-group half-width">
            <label htmlFor="plan" className="form-label">
              Plan
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="plan"
                className="input-field"
                value={formData.plan}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group half-width">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <div className="input-wrapper">
              <input
                type="text"
                id="price"
                className="input-field"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="register-button">
          Avail Membership
        </button>
      </form>
    </div>
  );
}

export default Register;