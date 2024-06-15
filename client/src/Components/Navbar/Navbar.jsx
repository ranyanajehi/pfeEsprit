import React, { useState ,useContext} from "react";
import "./Navbar.css";
import {Link, useNavigate} from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "/logo.png";



const Navbar = () => {

  const [show, setShow] = useState(false);
  const {isAuthenticated, setIsAuthenticated} = useContext (Context);
  const navigateTo = useNavigate()



  const handleLogout= async()=>{
     await axios.get("http://127.0.0.1:4000/api/v1/user/student/logout", {
      withCredentials:true,
    }).then(res=>{
      toast.success(res.data.message);  
      setIsAuthenticated(false);
    })
    .catch((err)=>{
      toast.error(err.response.data.message)
    })
    }
   

  const goToLogin= async()=>{
    navigateTo("/login")

  }

    
    return (
      <nav  className={"container"}>
        <div  className="logo">
        <img src={logo} alt="logo" className="logo-img" />
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>

          <div className="links">
            <Link to={"/"}  onClick={() => setShow(!show)}>Accueil</Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>Rendez-vous</Link>
            <Link to={"/about"}  onClick={() => setShow(!show)}>Programme</Link>
           

          </div>
          {isAuthenticated ? 
          (
          <button  className="logoutBtn btn" onClick={handleLogout}
          >Déconnexion</button> 
          ):(
          <button className="loginBtn btn" onClick={goToLogin}>Connexion </button>
           )}
        </div>
        <div  className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>

      </nav>
    )
}    
        export default Navbar;


