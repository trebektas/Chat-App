import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);

  const value = {
    username,
    setUsername,
  };

  useEffect(() => {
    const usernameData = JSON.parse(localStorage.getItem("username"));
    if (usernameData) {
      setUsername(usernameData);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem("username", JSON.stringify(username));
  }, [username]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
