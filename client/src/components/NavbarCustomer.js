// src/components/NavbarCustomer.js
import React, { useState } from "react";
import { FaBars, FaUserAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import TicketFormModal from "./TicketFormModal";
import UserProfileModal from "./UserProfileModal";
import TicketsTable from "./TicketsTable"; // Import TicketsTable component
import "./NavbarCustomer.css";

function NavbarCustomer() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [ticketsTableOpen, setTicketsTableOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openTicketModal = () => {
    setTicketModalOpen(true);
  };

  const closeTicketModal = () => {
    setTicketModalOpen(false);
  };

  const openProfileModal = () => {
    setProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setProfileModalOpen(false);
  };

  const openTicketsTable = () => {
    setTicketsTableOpen(true);
  };

  const closeTicketsTable = () => {
    setTicketsTableOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Helpdesk</div>
      <div className="navbar-links">
        <button className="navbar-button" onClick={openTicketModal}>
          Create Ticket
        </button>
        <button className="navbar-button" onClick={openTicketsTable}>
          See Your Tickets
        </button>
        <button className="navbar-button" onClick={openProfileModal}>
          <FaUserAlt /> Profile
        </button>
      </div>
      <div className="navbar-mobile">
        <FaBars className="menu-icon" onClick={toggleMenu} />
        {menuOpen && (
          <div className="mobile-menu">
            <button className="navbar-button" onClick={openTicketModal}>
              Create Ticket
            </button>
            <button className="navbar-button" onClick={openTicketsTable}>
              See Your Tickets
            </button>
            <button className="navbar-button" onClick={openProfileModal}>
              Profile
            </button>
          </div>
        )}
      </div>

      {ticketModalOpen && <TicketFormModal onClose={closeTicketModal} />}
      {profileModalOpen && <UserProfileModal onClose={closeProfileModal} />}
      {ticketsTableOpen && <TicketsTable onClose={closeTicketsTable} />}
    </nav>
  );
}

export default NavbarCustomer;
