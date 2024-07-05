import React from "react";
import { Outlet } from "react-router-dom";

const MainContent = () => {
  return (
    <div className="p-1 my-container active-cont">
      <Outlet />
    </div>
  );
};

export default MainContent;
