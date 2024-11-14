import React, { useEffect, useState, useContext } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EmailContext } from "../context/AuthContext";
import "./TicketsTable.css";

function TicketsTable({ onClose }) {
  const { email } = useContext(EmailContext);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedFeedback, setUpdatedFeedback] = useState("");
  const [updatedSatisfied, setUpdatedSatisfied] = useState("");
  const [updatedLastUpdatedBy, setUpdatedLastUpdatedBy] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await fetch(`https://altios.onrender.com/tickets?email=${email}`);
        const data = await response.json();
        const sortedTickets = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTickets(sortedTickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    }
    fetchTickets();
  }, [email]);

  const openTicketDetails = (ticket) => {
    setSelectedTicket(ticket);
    setUpdatedTitle(ticket.title);
    setUpdatedDescription(ticket.description);
    setUpdatedFeedback(ticket.feedback || "");
    setUpdatedSatisfied(ticket.satisfied || "");
    setUpdatedLastUpdatedBy(ticket.lastUpdatedBy || "");
  };

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
      const response = await fetch(`https://altios.onrender.com/ticketscustomer/${selectedTicket._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updatedTitle,
          email: email,
          description: updatedDescription,
          feedback: updatedFeedback,
          satisfied: updatedSatisfied,
          lastUpdated: new Date(),
          lastUpdatedBy: updatedLastUpdatedBy || "Admin",
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
        <h2 className="tickets-table-heading">Tickets</h2>
        <table className="tickets-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Date Created</th>
              <th>Last Updated</th>
              <th>Last Updated By</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket._id}
                onClick={() => openTicketDetails(ticket)}
                className="tickets-table-row"
              >
                <td>{truncateText(ticket.title, 20)}</td>
                <td>{truncateText(ticket.description, 30)}</td>
                <td>{ticket.status}</td>
                <td>{new Date(ticket.createdAt).toLocaleString()}</td>
                <td>{new Date(ticket.lastUpdated).toLocaleString()}</td>
                <td>{ticket.lastUpdatedBy ? `${ticket.lastUpdatedBy.name} (${ticket.lastUpdatedBy.role})` : "N/A"}</td>
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
                  <label htmlFor="ticketId">Ticket ID</label>
                  <input
                    type="text"
                    id="ticketId"
                    value={selectedTicket._id}
                    disabled
                  />
                </div>
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
                  <input
                    type="text"
                    id="status"
                    value={selectedTicket.status}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="actionTaken">Action Taken</label>
                  <input
                    type="text"
                    id="actionTaken"
                    value={selectedTicket.actionTaken}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="feedback">Feedback</label>
                  <input
                    type="text"
                    id="feedback"
                    value={updatedFeedback}
                    onChange={(e) => setUpdatedFeedback(e.target.value)}
                    disabled={selectedTicket.status === "pending"}
                  />
                </div>
                <div className="form-group">
  <label htmlFor="satisfied">Satisfied</label>
  <select
    id="satisfied"
    value={updatedSatisfied}
    onChange={(e) => setUpdatedSatisfied(e.target.value)}
    disabled={selectedTicket.status === "pending"}
  >
  
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
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

export default TicketsTable;
