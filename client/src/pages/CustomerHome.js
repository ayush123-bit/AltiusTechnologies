// src/pages/LandingPage.js
import React from "react";
import NavbarCustomer from "../components/NavbarCustomer";
import { FaTicketAlt, FaHeadset, FaChartLine } from "react-icons/fa";
import "./CustomerHome.css";

function CustomerHome() {
  return (
    <div className="landing-page">
      <NavbarCustomer />
      <header className="hero">
        <h1>Welcome to the Helpdesk Portal</h1>
        <p>Your one-stop solution for managing support requests efficiently.</p>
        <button className="cta-button">Get Started</button>
      </header>
      <section className="features">
        <div className="feature">
          <FaTicketAlt className="feature-icon" />
          <h2>Easy Ticketing</h2>
          <p>Submit, track, and manage your tickets with ease.</p>
        </div>
        <div className="feature">
          <FaHeadset className="feature-icon" />
          <h2>Customer Support</h2>
          <p>Our agents are ready to assist you at any time.</p>
        </div>
        <div className="feature">
          <FaChartLine className="feature-icon" />
          <h2>Admin Insights</h2>
          <p>Admins can view insights and manage the platform effectively.</p>
        </div>
      </section>
    </div>
  );
}

export default CustomerHome;
