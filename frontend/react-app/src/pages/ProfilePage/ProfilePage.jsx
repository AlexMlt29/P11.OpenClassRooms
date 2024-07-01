import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserProfileAccount from "../../components/UserProfile/UserProfileAccount";
import EditProfilePage from "../../components/EditProfile/EditProfileForm";
import "./ProfilePage.css";

function ProfilePage({ userProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const { loading, error } = useSelector((state) => state.profile);

  return (
    <div className="app-container">
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {userProfile && `${userProfile.firstName} ${userProfile.lastName}`}!
          </h1>
          {!isEditing && (
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          )}
          {isEditing && (
            <EditProfilePage userProfile={userProfile} setIsEditing={setIsEditing} />
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        {error && <p className="error-message">{error}</p>}
        {loading ? <p>Loading...</p> : <UserProfileAccount />}
      </main>
    </div>
  );
}

export default ProfilePage;
