import "./navbar.css";
import React, { useState, useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import CreateGroupForm from "./CreateGroupForm";

const Navbar = ({ setActiveGroupName, activeGroupName }) => {
  const [groupList, setGroupList] = useState([]);
  const [isCreateGroupFormOpen, setIsCreateGroupFormOpen] = useState(false);

  useEffect(() => {
    // fetch all groups data
    const dataFetch = async () => {
      try {
        const response = await fetch("http://localhost:3001/groups");
        const result = await response.json();
        // set state when the data received
        setGroupList(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    dataFetch();
  }, []);

  const createGroup = () => {
    setIsCreateGroupFormOpen(true);
  };

  return (
    <nav>
      {isCreateGroupFormOpen ? (
        <CreateGroupForm
          isCreateGroupFormOpen={isCreateGroupFormOpen}
          setIsCreateGroupFormOpen={setIsCreateGroupFormOpen}
        />
      ) : null}

      <div className="nav-header">
        <h2>Chat Rooms</h2>
        <div className="create-group-icon" onClick={createGroup}>
          <AiOutlinePlusCircle />
        </div>
      </div>

      {groupList.length > 0 ? (
        <ul>
          {groupList.map((group) => {
            return (
              <li
                key={group.name}
                className={activeGroupName === group.name ? "active" : null}
                onClick={() => {
                  setActiveGroupName(group.name);
                  localStorage.setItem(
                    "activeGroupName",
                    JSON.stringify(group.name)
                  );
                }}
              >
                {group.name}
              </li>
            );
          })}
        </ul>
      ) : null}
    </nav>
  );
};

export default Navbar;
