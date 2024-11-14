import React, { useEffect, useState } from "react";
import axios from "axios";
import "./customerAgent.css"; // Add this line if you have custom CSS

const CustomerAgent = ({onClose}) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("https://altios.onrender.com/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tickets-table-modal">
      <div className="tickets-table-content">
        <button className="tickets-table-close-button" onClick={onClose}>
          ×
        </button>
        <h2 className="tickets-table-heading">Customer Details</h2>
        <table className="tickets-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Registration Date</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id} className="tickets-table-row">
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{new Date(customer.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerAgent;
