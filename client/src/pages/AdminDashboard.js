import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  BarController,
  LineController,
} from "chart.js";
import Menus from "../components/Menus";
import "./AdminDashboard.css";

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  BarController,
  LineController
);

function AdminDashboard() {
  const [ticketCounts, setTicketCounts] = useState({ active: 0, pending: 0, closed: 0 });
  const [ticketGrowth, setTicketGrowth] = useState([]);
  const [customerGrowth, setCustomerGrowth] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    axios.get("https://altios.onrender.com/ticket-counts")
      .then((response) => setTicketCounts(response.data))
      .catch((error) => console.error("Error fetching ticket counts:", error));

    axios.get("https://altios.onrender.com/ticket-growth")
      .then((response) => setTicketGrowth(response.data))
      .catch((error) => console.error("Error fetching ticket growth data:", error));

    axios.get("https://altios.onrender.com/customer-growth")
      .then((response) => setCustomerGrowth(response.data))
      .catch((error) => console.error("Error fetching customer growth data:", error));
  }, []);

  const ticketData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Tickets Created",
        data: ticketGrowth,
        backgroundColor: "#4CAF50",
        borderColor: "#4CAF50",
        borderWidth: 1,
      },
    ],
  };

  const customerData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "New Customers",
        data: customerGrowth,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
    <div className="admin-dashboard-container">
      {/* Hamburger icon for mobile view */}
      <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        &#9776;
      </button>

      {/* Sidebar Menu: Always visible on large screens; toggled on mobile */}
      <div className={`menus ${isMenuOpen ? "mobile-menu" : ""}`}>
        <Menus />
      </div>

      <div className="dashboard-content">
        {/* Top Cards */}
        <div className="top-cards">
          <div className="card">Active Tickets: {ticketCounts.active}</div>
          <div className="card">Pending Tickets: {ticketCounts.pending}</div>
          <div className="card">Closed Tickets: {ticketCounts.closed}</div>
        </div>

        {/* Graphs */}
        <div className="graphs">
          <div className="graph full-width">
            <h3 className="graph-heading">Monthly Customer Growth</h3>
            <Chart type="line" data={customerData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
          <div className="graph full-width">
            <h3 className="graph-heading">Monthly Ticket Growth</h3>
            <Chart type="bar" data={ticketData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
