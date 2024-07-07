import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdAddModerator } from "react-icons/md";
import { FaBriefcase, FaUserGraduate } from "react-icons/fa"; // FaUserGraduate is used instead of PiStudentBold
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";

import "./sideBar.css";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios
      .get("http://127.0.0.1:4000/api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  const gotoHomePage = () => {
    navigateTo("/");
    setCollapsed(!collapsed);
  };
  const gotoDoctorsPage = () => {
    navigateTo("/students");
    setCollapsed(true);
  };
  const gotoMessagesPage = () => {
    navigateTo("/messages");
    setCollapsed(true);
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setCollapsed(true);
  };
  const gotoJobPage = () => {
    navigateTo("/job");
    setCollapsed(true);
  };

  return (
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={`SideBar ${collapsed ? "collapsed" : ""}`}
      >
        <div className="links">
          <div className="link-item">
         {collapsed?<TbLayoutSidebarRightCollapse onClick={() => setCollapsed(!collapsed)} size={30}/>: <TbLayoutSidebarLeftCollapse  onClick={() => setCollapsed(!collapsed)} size={30}/>}

          </div>

          <div className="link-item" onClick={gotoHomePage}>
            <TiHome size={30}/>
            {!collapsed && <span>Home</span>}
          </div>
          <div className="link-item" onClick={gotoDoctorsPage}>
            <FaUserGraduate size={30} />
            {!collapsed && <span>Students</span>}
          </div>
          <div className="link-item" onClick={gotoAddNewAdmin}>
            <MdAddModerator size={30}/>
            {!collapsed && <span>Add Admin</span>}
          </div>
          <div className="link-item" onClick={gotoJobPage}>
            <FaBriefcase size={30}/>
            {!collapsed && <span>Job</span>}
          </div>
          <div className="link-item" onClick={gotoMessagesPage}>
            <AiFillMessage size={30}/>
            {!collapsed && <span>Messages</span>}
          </div>
          <div className="link-item" onClick={handleLogout}>
            <RiLogoutBoxFill size={30}/>
            {!collapsed && <span>Logout</span>}
          </div>
        </div>
      </nav>
      <div className={`wrapper ${collapsed ? "collapsed" : ""}`}>
        <GiHamburgerMenu
          className="hamburger"
          onClick={() => setCollapsed(!collapsed)}
        />
        <div
          className="collapse-icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <>&#x25B6;</> : <>&#x25C0;</>} {/* Unicode symbols for right and left arrows */}
        </div>
      </div>
    </>
  );
};

export default SideBar;
