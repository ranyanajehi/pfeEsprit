import React, { useContext, useState,  } from "react";
import "./Login.css";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../main";

const Login = () => {
  const { token, setToken } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();
  // useBeforeUnload(
  //   useCallback(() => {
  //     console.log("tokennnn", token);
  //     localStorage.setItem("token", token);
  //   }, [token])
  // );
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://127.0.0.1:4000/api/v1/user/login",
          { email, password, role: "Student" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          // console.log("res.data", );

          toast.success(res.data.message);
          console.log("token", res.data.token);
          setToken(res.data.token); // setToken(res.data.token);
          navigateTo("/");
          setEmail("");
          setPassword("");
        
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="centered-component">
        <div className="login-form">
          <h1>Se connecter</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre Mot De Passse SVP"
            ></input>

            <div
              style={{
                gap: "10px",
                justifyContent: "flex-end",
                flexDirection: "row",
              }}
            >
              <p style={{ marginBottom: 0 }}>
                Non Inscrit?
                <Link
                  to={"/register"}
                  style={{ textDecoration: "none", alignItems: "center" }}
                >
                  Inscrire maintenant
                </Link>{" "}
              </p>
            </div>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                marginTop: "30px",
              }}
            >
              <button type="sumbit">Connecter</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
