import React, { useState } from 'react';
import './Menus.css';
import AdminProfileModal from './AdminProfileModal';
import Admintable from './Admintable';
import CustomerTable from './CustomerTable';
import AgentTable from './AgentTable';
import { FaTicketAlt, FaUsers, FaUserTie, FaUserCircle } from 'react-icons/fa'; // Importing icons
import { useNavigate } from 'react-router-dom';

const Menus = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();

  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);
  const openAdminTable = () => navigate('/admintable');
  const openCustomerTable = () => navigate('/customertable');
  const openAgentTable = () => navigate('/agenttable');
  const openAgentModal = () => navigate('/agentform', { state: { message: 'signup' } });

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-heading" onClick={openProfileModal}>
          <h2 style={{ color: 'Yellow' }}>Help Desk</h2>
        </div>

        <div className="nav-items">
          <div className="nav-item">
            <button className="nav-link" onClick={openAdminTable}>
              <FaTicketAlt className="nav-icon" /> See All Tickets
            </button>
          </div>
          <div className="nav-item">
            <button className="nav-link" onClick={openCustomerTable}>
              <FaUsers className="nav-icon" /> See All Customers
            </button>
          </div>
          <div className="nav-item">
            <button className="nav-link" onClick={openAgentTable}>
              <FaUserTie className="nav-icon" /> See All Agents
            </button>
          </div>
          <div className="nav-item">
            <button className="nav-link" onClick={openAgentModal}>
              <FaUserCircle className="nav-icon" /> Register an agent
            </button>
          </div>
          <div className="nav-item">
            <button className="nav-link" onClick={openProfileModal}>
              <FaUserCircle className="nav-icon" /> Profile
            </button>
          </div>
        </div>
      </div>

      {isProfileModalOpen && <AdminProfileModal onClose={closeProfileModal} />}
    </>
  );
};

export default Menus;
