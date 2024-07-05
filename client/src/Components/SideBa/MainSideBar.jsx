import React, { useState } from "react";
import Sidebar from "./SideBar.jsx";
import TopNav from "./TopNav.jsx";
import MainContent from "./MainContent.jsx";
import "./side.css"; // For any additional custom CSS

const MainSideBar = () => {
  const [isSidebarActive, setIsSidebarActive] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  return (
    <div className={`app ${isSidebarActive ? "sidebar-active" : ""}`}>
      <Sidebar />
      <div className={`main-content ${isSidebarActive ? "active-cont" : ""}`}>
        <TopNav toggleSidebar={toggleSidebar} />
        <MainContent />
      </div>
    </div>
  );
};

export default MainSideBar;
