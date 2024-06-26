import React, { useState } from "react";
import "./AdminLogin.css";
import { LoginUser } from "../../services/userService";
import { toast } from "react-toastify";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const userData = {
      email,
      password,
      userRole:"Admin",
    };

    await LoginUser(userData)
      .then(({ data }) => {
        localStorage.setItem("token", data);
        toast.success("Login successful")
        // setUser(getCurrentUser())
        setTimeout(() => {
          window.location ="/cxc-admin-dashboard"
        }, 500);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  
  }

  return (
    <div className="login-main-container">
      <div className="login-image">
        <img
          src="https://images.squarespace-cdn.com/content/v1/5fc881f0a8a7305318af122b/1611636539092-3A1YPLWHFOFMHBEQ09M2/YRECentral_Your-admin-simplified.gif"
          alt="Login"
          className="img-login"
        />
      </div>
      <div className="login-inner-container">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>

          <div className="email">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="checkbox-container">
            <input type="checkbox" id="rememberMe" />
            <label className="admin-checkbox" htmlFor="rememberMe">Remember me</label>
          </div>

          <div className="login-button-container">
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
