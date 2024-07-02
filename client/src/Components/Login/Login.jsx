import React, { useContext, useState } from 'react';
import "./Login.css";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import { Context } from '../../main';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/api/v1/user/login",
        { email, password,  role: "Student" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/dashboard");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className="centered-component">
      <div className='login-form'>
        <h1>Se connecter</h1>
        <form onSubmit={handleLogin}>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=' Mot De Passe '
          />
     
          <div style={{ gap: "10px", justifyContent: "flex-end", flexDirection: "row" }}>
            <p style={{ marginBottom: 0 }}>
              Non Inscrit?{" "}
              <Link to={"/register"} style={{ textDecoration: "none", alignItems: "center" }}>
                S'inscrire maintenant
              </Link>
            </p>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center", display: "flex", marginTop: "30px" }}>
            <button type='submit'>Connecter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
