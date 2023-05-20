import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import ChatPage from "./pages/ChatPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Header from "./components/Header.jsx";
import { UserProvider } from "./context/userContext.js";

function App() {
  return (
    <Router>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/:userId" element={<ChatPage />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
