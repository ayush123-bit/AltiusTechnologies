import React, { useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EmailContext } from "../context/AuthContext";
import "./Admintable.css";
import { useNavigate } from 'react-router-dom';


function Admintable() {
  const navigate=useNavigate()
  const { email } = useContext(EmailContext);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [updatedActionTaken, setUpdatedActionTaken] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false); // For controlling message visibility

  // Define a function to set CSS class based on status
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "status-active";
      case "pending":
        return "status-pending";
      case "closed":
        return "status-closed";
      default:
        return "";
    }
  };

  useEffect(() => {
  
    // Fetch tickets data
    async function fetchTickets() {
      try {
        console.log(email)
        
        const response = await fetch("https://altios.onrender.com/ticketsadmin"); // Update this endpoint as needed
        const data = await response.json();
        const sortedTickets = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTickets(sortedTickets);

        // Show the message for 3 seconds when the modal is loaded
        setMessageVisible(true);
        setTimeout(() => {
          setMessageVisible(false);
        }, 3000); // 3 seconds
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    }
    alert("Click on any row to get detailed information and to perform updation.");
    fetchTickets();
  }, []);

  const openTicketDetails = (ticket) => {
    setSelectedTicket(ticket);
    setUpdatedTitle(ticket.title);
    setUpdatedDescription(ticket.description);
    setUpdatedStatus(ticket.status);
    setUpdatedActionTaken(ticket.actionTaken || "");
  };
const onClose=()=>{
  
  navigate('/admin')
}
  const closeTicketDetails = () => {
    setSelectedTicket(null);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`https://altios.onrender.com/ticketstaff/${selectedTicket._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDescription,
          status: updatedStatus,
          actionTaken: updatedActionTaken,
          lastUpdated: new Date(),
          email: email
        }),
      });

      if (response.ok) {
        const updatedTicket = await response.json();
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket._id === updatedTicket._id ? updatedTicket : ticket
          )
        );
        setSelectedTicket(updatedTicket);
        toast.success("Ticket updated successfully!");
        closeTicketDetails();
      } else {
        toast.error("Failed to update ticket");
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      toast.error("Error updating ticket");
    }
    setLoading(false);
  };

  return (
    <div className="tickets-table-modal">
      <div className="tickets-table-content">
        <button className="tickets-table-close-button" onClick={onClose}></button>
        <h2 className="tickets-table-heading"> Tickets </h2>
        
        {/* Message displayed when the modal is loaded */}
        {messageVisible && (
          <div className="info-message">
            Click on any row to get detailed information and to perform updation.
          </div>
        )}

        <table className="tickets-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Date Created</th>
              <th>Updated By</th> {/* New column added here */}
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} onClick={() => openTicketDetails(ticket)} className="tickets-table-row">
                <td>{ticket.userName}</td>
                <td>{ticket.userEmail}</td>
                <td>{truncateText(ticket.title, 20)}</td>
                <td>{truncateText(ticket.description, 30)}</td>
                <td className={getStatusClass(ticket.status)}>{ticket.status}</td>
                <td>{new Date(ticket.createdAt).toLocaleString()}</td>
                <td>{ticket.lastUpdatedBy ? `${ticket.lastUpdatedBy.name} (${ticket.lastUpdatedBy.role})` : "N/A"}</td> {/* Show last updated by */}
              </tr>
            ))}
          </tbody>
        </table>

        {selectedTicket && (
          <div className="tickets-table-details-modal">
            <div className="tickets-table-details-content">
              <button className="tickets-table-close-button" onClick={closeTicketDetails}></button>
              <h2 className="tickets-table-details-heading">{selectedTicket.title}</h2>
              <form onSubmit={handleUpdate}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    value={updatedDescription}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    value={updatedStatus}
                    onChange={(e) => setUpdatedStatus(e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="actionTaken">Action Taken</label>
                  <input
                    type="text"
                    id="actionTaken"
                    value={updatedActionTaken}
                    onChange={(e) => setUpdatedActionTaken(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="feedback">Feedback</label>
                  <input
                    type="text"
                    id="feedback"
                    value={selectedTicket.feedback}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="satisfied">Satisfied</label>
                  <input
                    type="text"
                    id="satisfied"
                    value={selectedTicket.satisfied}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dateCreated">Date Created</label>
                  <input
                    type="text"
                    id="dateCreated"
                    value={new Date(selectedTicket.createdAt).toLocaleString()}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastUpdated">Last Updated</label>
                  <input
                    type="text"
                    id="lastUpdated"
                    value={new Date(selectedTicket.lastUpdated).toLocaleString()}
                    disabled
                  />
                </div>
                <button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Update Ticket"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admintable;
