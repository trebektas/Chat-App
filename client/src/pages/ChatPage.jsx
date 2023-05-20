import "./chat-page.css";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Messages from "../components/Messages";
import SendMessage from "../components/SendMessage";
import { FaHome } from "react-icons/fa";

const ChatPage = () => {
  const [activeGroupName, setActiveGroupName] = useState(
    localStorage.getItem("activeGroupName")
      ? JSON.parse(localStorage.getItem("activeGroupName"))
      : ""
  );
  return (
    <main className="container-main">
      <Navbar
        setActiveGroupName={setActiveGroupName}
        activeGroupName={activeGroupName}
      />
      <div className="main-chat">
        {activeGroupName.length > 0 ? (
          <>
            <Messages activeGroupName={activeGroupName} />
            <SendMessage activeGroupName={activeGroupName} />
          </>
        ) : (
          <>
            <div className="main-home">
              <div className="home-icon">
                <FaHome />
              </div>
              <h2>Home</h2>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default ChatPage;
