import React from "react";
import Sidebar from "../Components/Sidebar/Sidebar.jsx";
import NavbarStudent from "../Components/NavbarStudent/NavbarStudent.jsx";
import { Outlet } from "react-router-dom";

const DashboardStudent = () => {
  return (
    <div>
      {/* <Sidebar />
      <NavbarStudent /> */}
      <Outlet />
    </div>
  );
};

export default DashboardStudent;
