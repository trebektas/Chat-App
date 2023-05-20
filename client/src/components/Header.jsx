import "./header.css";
import React from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/userContext";

const Header = () => {
  const { username, setUsername } = useUser();
  const navigate = useNavigate();

  // clear
  const logout = () => {
    setUsername(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <header>
      <ToastContainer />
      <div className="container-header">
        <h1>Chat App</h1>
        {username ? <button onClick={logout}>Logout</button> : <></>}
      </div>
    </header>
  );
};

export default Header;
