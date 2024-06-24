import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserProfileAccount from "../../components/UserProfile/UserProfileAccount";
import EditProfilePage from "../../components/EditProfile/EditProfileForm";
import { fetchUserProfile } from "../../redux/slices/profileSlice";
import "./ProfilePage.css";

function ProfilPage() {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const { userProfile, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch]);

  return (
    <div className="app-container">
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {userProfile && `${userProfile.firstName} ${userProfile.lastName}`} !
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

export default ProfilPage;
