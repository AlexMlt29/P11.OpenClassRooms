import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../../redux/slices/profileSlice";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile, error, loading } = useSelector((state) => state.profile);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
    } else {
      navigate('/');
    }
  }, [dispatch, navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return {
    userProfile,
    error,
    loading,
    handleLogout,
  };
};

export default UserProfilePage;
