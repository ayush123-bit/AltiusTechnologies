// src/components/TicketFormModal.js
import React, { useState, useContext } from "react";
import { FaExclamationTriangle, FaClipboardList, FaPen } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { EmailContext } from "../context/AuthContext";  // Adjust the path as needed
import "./TicketFormModal.css";

function TicketFormModal({ onClose }) {
  const { email } = useContext(EmailContext);  // Access the email from EmailContext

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",  // Default to "Low" as "Medium" is removed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Data to send to the server
    const ticketData = {
      title: formData.title,
      description: formData.description,
      email,  // Include the user's email
    };

    try {
      const response = await fetch("https://altios.onrender.com/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketData),
      });
      const data = await response.json();
      console.log("Ticket Created: ", data);
      onClose(); // Close modal after submission
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <div className="ticket-modal">
      <div className="ticket-modal-content">
        <button className="close" onClick={onClose}>
          <IoMdClose />
        </button>
        <h2>Create a Ticket</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="title">
              <FaClipboardList className="icon" /> Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter ticket title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="description">
              <FaPen className="icon" /> Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter ticket description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          

          <button type="submit" className="submit-btn">
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
}

export default TicketFormModal;
