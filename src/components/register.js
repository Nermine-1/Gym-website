import { useState, useEffect } from 'react';
import '../styles/Register.css';

function Register({ onClose, onRegister }) {
    const plans = {
        '7 Days': '20 DT',
        '1 Month': '70 DT',
        '3 Months': '210 DT',
        '1 Year' : '900 DT'
    };

    const [formData, setFormData] = useState({
        name: '',
        date: '',
        email: '',
        contact: '',
        plan: '',
        price: ''
    });

    useEffect(() => {
        if (formData.plan && plans[formData.plan]) {
            setFormData(prev => ({
                ...prev,
                price: plans[formData.plan]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                price: ''
            }));
        }
    }, [formData.plan]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(formData);
        onClose();
    };

    return (
      <div className="modal-overlay">
        <div className="register-modal">
            <h2 className="register-heading">Become a Member! Register</h2>
            
            <form onSubmit={handleSubmit}>
                {/* Fields with floating labels */}
                <div className="form-group floating-label">
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                    <label>Name of Participant</label>
                </div>
                
                {/* Date field without any placeholder/label effect */}
                <div className="form-group">
                    <label>Date of Join</label>
                    <input 
                        type="date" 
                        name="date" 
                        value={formData.date} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                
                <div className="form-group floating-label">
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                    <label>Email Address</label>
                </div>
                
                <div className="form-group floating-label">
                    <input 
                        type="tel" 
                        name="contact" 
                        value={formData.contact} 
                        onChange={handleChange} 
                        required 
                    />
                    <label>Contact No.</label>
                </div>
                
                {/* Plan field without any placeholder/label effect */}
                <div className="form-group">
                    <label>Plan</label>
                    <select 
                        name="plan" 
                        value={formData.plan} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Select a plan</option>
                        {Object.keys(plans).map(plan => (
                            <option key={plan} value={plan}>{plan}</option>
                        ))}
                    </select>
                </div>
                
                {/* Price field without any placeholder/label effect */}
                <div className="form-group">
                    <label>Price</label>
                    <input 
                        type="text" 
                        name="price" 
                        value={formData.price} 
                        readOnly
                    />
                </div>
                
                <div className="button-group">
                    <button type="submit" className="avail-btn">Avail Membership</button>
                    <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
    );
}

export default Register;