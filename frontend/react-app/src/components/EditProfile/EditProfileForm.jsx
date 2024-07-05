import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../redux/slices/profileSlice";
import "../EditProfile/EditProfileForm.css";

const EditProfileForm = ({ userProfile, setIsEditing }) => {
  const [userName, setUserName] = useState(userProfile.userName);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");

  if (!token) {
    token = sessionStorage.getItem("token");
  };

  const handleSave = () => {
    let validationErrors = {};

    if (!userName) {
      validationErrors.userName = "Veuillez renseigner ce champ.";
    }
    
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(updateUserProfile({ token, userName }));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="edit-profile-form">
      <h2 className="edit-user-info">Edit user info</h2>
      <div>
        <label htmlFor="username" className="edit-user-info">Username :</label>
        <input id="username" type="username" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        {errors.userName && <div className="error">{errors.userName}</div>}
      </div>
      <div>
        <label className="edit-user-info">First name :</label>
        <input type="text" value={userProfile.firstName} disabled />
      </div>
      <div>
        <label className="edit-user-info">Last name :</label>
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
