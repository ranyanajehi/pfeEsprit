import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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


const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:4000/api/v1/user/student/me", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated, setIsAuthenticated, setUser]);

  return (
    <Router>
      <Scoller />
      <AppContent isAuthenticated={isAuthenticated} />
      <ToastContainer position="top-center" />
    </Router>
  );
};

const AppContent = ({ isAuthenticated }) => {
  const location = useLocation(); // Utilisez useLocation pour obtenir l'URL actuelle
  const isDashboard =  ["/messageStudent","/dashboard","/giftCourses","/CV", "/register","/giftCourses","/jobOffer"].includes(location.pathname); // Utilisez location.pathname
 

  return (
    <>
      {!isDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<OurProgram />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isAuthenticated ? <DashboardStudent /> : <Navigate to="/login" />} />

        <Route path="/messageStudent" element={isAuthenticated ? <MessageStudentPage /> : <Navigate to="/login" />} />
        <Route path="/CV" element={isAuthenticated ? <CVStudent /> : <Navigate to="/login" />} />
        
        <Route path="/jobOffer" element={isAuthenticated ? <JobOffer /> : <Navigate to="/login" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
