import "./login.css";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
import FooterNew from "../../components/Footer/FooterNew";
import video from "../../Assets/loginn.mp4";
import logo from "../../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import { LoginUser, getCurrentUser } from "../../services/userService";

function Login({setUser}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password || !userRole) {
      toast.error("Please fill in all fields.");
      return;
    }

    await LoginUser({
      email,
      password,
      userRole,
    })
      .then(({ data }) => {
        localStorage.setItem("token", data);
        toast.success("Login successful")
        setUser(getCurrentUser())
        setTimeout(() => {
          navigate("/home");
        }, 500);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-video">
          <video src={video} autoPlay muted loop />
        </div>
        <div className="text-login">
          <h2>
            Buy, Sell and Deliver <br />
            Extraordinary Products
          </h2>
        </div>
        <div className="login-inner-container">
          <form onSubmit={handleSubmit}>
            <div className="salutaion">
              <img src={logo} alt="" className="img-logo" />
              <h3 className="sign-in-text">Welcome Back!</h3>
            </div>

            <div className="role">
              <label>Role</label>
              <select
                className="form-control"
                data-testid="role"
                onChange={(e) => setUserRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="Farmer">Farmer</option>
                <option value="Seller">Seller</option>
                <option value="Deliveryman">Deliveryman</option>
              </select>
            </div>

            <div className="email">
              <label>Email address</label>
              <input
                type="email"
                data-testid="Enter email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="password">
              <label>Password</label>
              <input
                type="password"
                data-testid="Enter password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="checkbox-container">
              <input type="checkbox" className="checkbox" id="customCheck1" />
              <label className="text" htmlFor="customCheck1">
                Remember me
              </label>
            </div>

            <div className="login-button-container">
              <button type="submit" className="login-button">
                Submit
              </button>
            </div>
            <br />
            <p>
              Don't have an account?{" "}
              <a style={{ textDecoration: "none" }} href="/register">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
      <FooterNew />
    </div>
  );
}

export default Login;
