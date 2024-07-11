import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home.jsx";
import OurProgram from "./Pages/OurProgram.jsx";
import Appointment from "./Pages/Appointment.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import { Context } from "./main.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import DashboardStudent from "./Pages/DashboardStudent.jsx"; // Ajoutez votre composant de tableau de bord
import axios from "axios";
import Scoller from "./Pages/Scoller.jsx";
import MessageStudentPage from "./Pages/MessageStudentPage.jsx";
import CVStudent from "./Components/CVStudent/GneneateCV.jsx";
import "./App.css";
import JobOffer from "./Pages/JobOffer.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Scroller from "./Pages/Scoller.jsx";
import Dashbord from "./Pages/Dashbord.jsx";
import Chat from "./Pages/chat.jsx";
import "./App.css";
import Cookies from "js-cookie";
import CvGenerator from "./Pages/CvGenerator.jsx";
const App = () => {
  const { token, setToken } = useContext(Context);
  useEffect(() => {
    Cookies.set("studentToken", token, { expires: 365, path: "/" });
  }, [token]);
  return (
    <>
      <Router>
        <Scroller />
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<DashboardStudent />}>
            <Route index element={<MessageStudentPage />} />
            <Route path="/dashboard/chat" element={<Chat />} />
            <Route path="/dashboard/cv" element={<CvGenerator />} />

            <Route path="/dashboard/jobOffer" element={<JobOffer />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<OurProgram />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/CV" element={<CVStudent />} />
        </Routes>
        {/* <Footer />
        <ToastContainer position="top-center" /> */}
      </Router>
    </>
  );
};

export default App;
