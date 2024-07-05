import React from "react";

const TopNav = ({ toggleSidebar }) => {
  return (
    <nav className="navbar top-navbar navbar-light bg-light px-5">
      <button className="btn border-0" id="menu-btn" onClick={toggleSidebar}>
        <i className="bx bx-menu"></i>
      </button>
    </nav>
  );
};

export default TopNav;
