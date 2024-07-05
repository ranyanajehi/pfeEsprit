import React from "react";

const Sidebar = ({ isActive }) => {
  return (
    <div className={`side-navbar ${isActive ? "active-nav" : ""}`} id="sidebar">
      <ul className="nav flex-column text-white w-100">
        <a href="#" className="nav-link h3 text-white my-2">
          Responsive <br />
          SideBar Nav
        </a>
        <li className="nav-link">
          <i className="bx bxs-dashboard"></i>
          <span className="mx-2">Home</span>
        </li>
        <li className="nav-link">
          <i className="bx bx-user-check"></i>
          <span className="mx-2">Profile</span>
        </li>
        <li className="nav-link">
          <i className="bx bx-conversation"></i>
          <span className="mx-2">Contact</span>
        </li>
      </ul>

      <span className="nav-link h4 w-100 mb-5">
        <a href="#">
          <i className="bx bxl-instagram-alt text-white"></i>
        </a>
        <a href="#">
          <i className="bx bxl-twitter px-2 text-white"></i>
        </a>
        <a href="#">
          <i className="bx bxl-facebook text-white"></i>
        </a>
      </span>
    </div>
  );
};

export default Sidebar;
