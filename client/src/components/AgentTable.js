import React, { useEffect, useState } from "react";
import axios from "axios";

const AgentTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("https://altios.onrender.com/agent");
        setCustomers(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tickets-table-page">
      <div className="tickets-table-content">
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

export default AgentTable;
