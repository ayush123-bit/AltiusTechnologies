// src/components/NavbarCustomer.js
import React, { useState } from "react";
import { FaBars, FaUserAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import TicketFormModal from "./TicketFormModal"; // Import the ticket form modal if needed elsewhere
import UserProfileModal from "./UserProfileModal"; // Import the UserProfileModal component
import Admintble from "./AdminTble"; // Import the AdminTable modal component
import CustomerTable from "./CustomerTable"; // Import the CustomerTable modal component
import "./NavbarCustomer.css";
import AgentTable from "./AgentTable"
import CustomerAgent from "./CustomerAgent";

function NavbarCustomer() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openTicketModal = () => {
    
    setTicketModalOpen(true);
  };

  const closeTicketModal = () => {
    setTicketModalOpen(false);
  };

  const openCustomerModal = () => {
    setCustomerModalOpen(true);
  };

  const closeCustomerModal = () => {
    setCustomerModalOpen(false);
  };

  const openProfileModal = () => {
    setProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setProfileModalOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Helpdesk</div>
      <div className="navbar-links">
        {/* "See All Tickets" Button */}
        <button className="navbar-button" onClick={openTicketModal}>
          See All Tickets
        </button>
        {/* "See All Customers" Button */}
        <button className="navbar-button" onClick={openCustomerModal}>
          See All Customers
        </button>
        {/* Profile button */}
        <button className="navbar-button" onClick={openProfileModal}>
          <FaUserAlt /> Profile
        </button>
      </div>
      <div className="navbar-mobile">
        <FaBars className="menu-icon" onClick={toggleMenu} />
        {menuOpen && (
          <div className="mobile-menu">
            <button className="navbar-button" onClick={openTicketModal}>
              See All Tickets
            </button>
            <button className="navbar-button" onClick={openCustomerModal}>
              See All Customers
            </button>
            <button className="navbar-button" onClick={openProfileModal}>
              Profile
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {profileModalOpen && <UserProfileModal onClose={closeProfileModal} />}
      {ticketModalOpen && <Admintble onClose={closeTicketModal} />}
      {customerModalOpen && <CustomerAgent onClose={closeCustomerModal} />}
    </nav>
  );
}

export default NavbarCustomer;
