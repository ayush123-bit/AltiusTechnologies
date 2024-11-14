// src/components/Navbar.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import AuthFormModal from "./AuthFormModal"; // Import the AuthFormModal
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Modal state to control visibility
  const [isLogin, setIsLogin] = useState(true); // Default to login form
  const navigate = useNavigate();
  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Open modal for Login or Sign Up
  const openModal = (login = true) => {
    setIsLogin(login); // Set the form type to Login or Sign Up
    setModalOpen(true); // Open the modal
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleLogin = () => {
    navigate('/enter', { state: { message: 'signup' } });
  };

  const handleSignup = () => {
    navigate('/enter', { state: { message: 'login' } });
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Helpdesk</div>
      <div className="navbar-links">
        {/* Buttons for desktop view */}
        <button className="navbar-button"   onClick={handleSignup}>
          Login
        </button>
        <button className="navbar-button"  onClick={handleLogin}>
          Sign Up
        </button>
      </div>

      {/* Mobile menu */}
      <div className="navbar-mobile">
        <FaBars className="menu-icon" onClick={toggleMenu} />
        {menuOpen && (
          <div className="mobile-menu">
            <button className="navbar-button" onClick={handleSignup}>
              Login
            </button>
            <button className="navbar-button" onClick={handleLogin}>
              Sign Up
            </button>
          </div>
        )}
      </div>

      {/* Conditionally render the modal based on modalOpen state */}
      {modalOpen && <AuthFormModal isLogin={isLogin} onClose={closeModal} />}
    </nav>
  );
}

export default Navbar;
