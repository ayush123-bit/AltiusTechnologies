// src/components/UserProfileModal.js
import React, { useState, useContext, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa"; 
import { IoMdClose } from "react-icons/io";
import { EmailContext } from "../context/AuthContext"; // Adjust path if necessary
import "./UserProfileModal.css";

function UserProfileModal({ onClose }) {
  const { email } = useContext(EmailContext); // Get email from EmailContext
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
  });
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://altios.onrender.com/user?email=${email}`);
        const data = await response.json();
        if (response.ok) {
          setUserData(data); // Set user data in state
        } else {
          console.error("Failed to fetch user data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://altios.onrender.com/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log("User data updated:", data);
      setIsEditing({
        name: false,
        email: false,
        phone: false,
      });
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="user-profile-modal">
      <div className="user-profile-modal-content">
        <button className="close" onClick={onClose}>
          <IoMdClose />
        </button>
        <h2>User Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <div className="input-with-icon">
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                disabled={!isEditing.name}
              />
              {!isEditing.name && (
                <FaPencilAlt
                  className="edit-icon"
                  onClick={() => handleEditClick("name")}
                />
              )}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                disabled={!isEditing.email}
              />
              {!isEditing.email && (
                <FaPencilAlt
                  className="edit-icon"
                  onClick={() => handleEditClick("email")}
                />
              )}
            </div>
          </div>

         

          {Object.values(isEditing).includes(true) && (
            <button type="submit" className="submit-btn">
              Save Changes
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default UserProfileModal;
