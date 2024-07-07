import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import { FaFilePdf } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, user, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios
      .get("http://127.0.0.1:4000/api/v1/user/student/logout", {
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

  const gotoHomePage = () => {
    navigate("/dashboard");
    setShow(false);
  };

  const gitfCourses = () => {
    navigate("/giftCourses");
    setShow(false);
  };

  const gotoMessagesPage = () => {
    navigate("/dashboard/chat");
    setShow(false);
  };

  const gotTojobOffer = () => {
    navigate("/dashboard/jobOffer");
    setShow(false);
  };

  return (
    <>
      <nav
        // style={ ? { display: "none" } : { display: "flex" }}
        className={show ? "show SibeBar" : "SibeBar"}
      >
        <div className="profile">
          <img src={user?.avatar || "/default-avatar.png"} alt="avatar" />
          <div className="profile-details">
            <h4>{user && `${user.firstName} ${user.lastName}`}</h4>
            <button onClick={() => navigate(`/updateProfile/${user._id}`)}>
              Edit Profile
            </button>
          </div>
        </div>
        <div className="links">
          <TiHome onClick={gotoHomePage} />
          <PiStudentBold onClick={gitfCourses} />
          <AiFillMessage onClick={gotoMessagesPage} />
          <FaFilePdf onClick={gotTojobOffer} />
          {/* <RiLogoutBoxFill onClick={handleLogout} /> */}
        </div>
      </nav>
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
