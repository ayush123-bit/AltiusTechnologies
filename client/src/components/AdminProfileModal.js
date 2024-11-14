import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import "./AdminProfileModal.css";

function AdminProfileModal({ onClose }) {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@example.com",
    contact: "+1234567890",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated: ", profileData);
    setEditMode(false);
  };

  return (
    <div className="profile-modal">
      <div className="profile-modal-content">
        {/* Close Button */}
        <button className="close" onClick={onClose}>
          <IoMdClose />
        </button>
        <h2>Admin Profile</h2>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="input-group">
            <label>Name</label>
            <div className="input-container">
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                disabled={!editMode}
                className="input-field"
              />
              {editMode && (
                <FaPen className="edit-icon" onClick={toggleEditMode} />
              )}
            </div>
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              disabled={!editMode}
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label>Contact</label>
            <input
              type="text"
              name="contact"
              value={profileData.contact}
              onChange={handleChange}
              disabled={!editMode}
              className="input-field"
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={!editMode}>
              {editMode ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminProfileModal;
