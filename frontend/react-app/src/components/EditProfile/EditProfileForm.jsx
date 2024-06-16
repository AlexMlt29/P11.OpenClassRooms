import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../redux/slices/profileSlice";
import "../EditProfile/EditProfileForm.css";

const EditProfileForm = ({ userProfile, setIsEditing }) => {
  const [userName, setUserName] = useState(userProfile.userName);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const handleSave = () => {
    dispatch(updateUserProfile({ token, userName }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="edit-profile-form">
      <h2 className="edit-user-info">Edit user info</h2>
      <div>
        <label>User name:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div>
        <label>First name:</label>
        <input type="text" value={userProfile.firstName} disabled />
      </div>
      <div>
        <label>Last name:</label>
        <input type="text" value={userProfile.lastName} disabled />
      </div>
      <div className="buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditProfileForm;
