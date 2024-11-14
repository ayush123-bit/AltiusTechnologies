import React, { useState, useContext } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { EmailContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthFormModal.css";

function AuthFormModal({ isLogin, onClose }) {
  const { setEmail } = useContext(EmailContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "customer" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    if (!isLogin && !formData.name) {
      newErrors.name = "Name is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const userData = { ...formData, role: isLogin ? formData.role : formData.role };

    try {
      const response = await axios.post(isLogin ? "https://altios.onrender.com/login" : "https://altios.onrender.com/signup", userData);
      const { data } = response;
      
      if (data.message === "Login successful") {
        setEmail(data.user.email);
        
        if (data.user.role === "customer") {
          navigate("/customer");
        } else if (data.user.role === "admin") {
          navigate("/admin");
        } else if (data.user.role === "agent") {
          navigate("/agent");
        }

        onClose();
      } else {
        setErrors({ general: data.message || "Authentication failed. Please try again." });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ general: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="modal-title">{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit} className="form">
          {!isLogin && (
            <div className="form-group">
              <FaUser className={`input-icon ${formData.name ? "hidden" : ""}`} />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "input-error" : "input-field"}
              />
              {errors.name && <small className="error-message">{errors.name}</small>}
            </div>
          )}
          <div className="form-group">
            <FaEnvelope className={`input-icon ${formData.email ? "hidden" : ""}`} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : "input-field"}
            />
            {errors.email && <small className="error-message">{errors.email}</small>}
          </div>
          <div className="form-group">
            <FaLock className={`input-icon ${formData.password ? "hidden" : ""}`} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "input-error" : "input-field"}
            />
            {errors.password && <small className="error-message">{errors.password}</small>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input-field"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
                <option value="agent">Agent</option>
              </select>
            </div>
          )}

          <button type="submit" className="submit-btn">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        {errors.general && <small className="error-message">{errors.general}</small>}
      </div>
    </div>
  );
}

export default AuthFormModal;
