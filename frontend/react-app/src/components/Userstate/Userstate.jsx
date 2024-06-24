import React, { createContext, useState, useContext } from "react";

const UserState = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  const login = (user) => {
    setUserProfile(user);
  };

  const logout = () => {
    setUserProfile(null);
  };

  return (
    <UserState.Provider value={{ userProfile, login, logout }}>
      {children}
    </UserState.Provider>
  );
};

export const useUser = () => useContext(UserState);
