import "./messages.css";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const Messages = ({ activeGroupName }) => {
  const [messageList, setMessageList] = useState([]);
  const { userId } = useParams();
  const bottomRef = useRef(null);

  useEffect(() => {
    // scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView();
  }, [messageList]);

  // add periodically refresh for new messages
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // fetch all messages data for active group
    const messagesDataFetch = async () => {
      try {
        const response = await fetch("http://localhost:3001/messages", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            groupName: activeGroupName,
          }),
        });

        const result = await response.json();

        // set state when the data received
        setMessageList(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    messagesDataFetch();
  }, [activeGroupName]);

  return (
    <section>
      <div className="header-messages">
        <h2>{activeGroupName}</h2>
      </div>
      <ul className="container-message-list">
        {messageList.map((message, index) => {
          let formattedDate = "";
          if (message) {
            const date = new Date(message.createdAt);
            formattedDate = format(date, "MMMM do, yyyy - H:mma");
          }
          return (
            <li
              className={
                userId === message.userId._id
                  ? "container-message user-message"
                  : "container-message"
              }
              key={index}
            >
              <h5>{message.userId.username}</h5>
              <br />
              <p className="text-message">{message.message}</p>
              <br />
              <p className="text-create-date">{formattedDate}</p>
            </li>
          );
        })}
        <div ref={bottomRef} />
      </ul>
    </section>
  );
};

export default Messages;
