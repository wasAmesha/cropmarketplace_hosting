import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "./RegisterPage.css";
import Navbar from "../../components/Navbar/Navbar";
import video from "../../Assets/loginn.mp4";
import logo from "../../Assets/logo.png";
import { RegisterUser } from "../../services/userService";

export default function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const user = {
      userRole: data.userRole,
      firstName: data.fname,
      lastName: data.lname,
      email: data.email,
      district: data.district,
      password: data.password,
    };

    await RegisterUser(user)
      .then(({ data }) => {
        toast.success(data);
        setTimeout(() => {
          navigate("/login");
        }, 500);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });

    // let url = "";

    // switch (data.userRole) {
    //   case "Farmer":
    //     url = "http://localhost:8070/farmer/register";
    //     break;
    //   case "Seller":
    //     url = "http://localhost:8070/seller/register";
    //     break;
    //   case "Deliveryman":
    //     url = "http://localhost:8070/deliveryman/register";
    //     break;
    //   default:
    //     break;
    // }

    // try {
    //   const response = await fetch(url, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   if (response.ok) {
    //     toast.success("Registration Successful, Please Login ");
    //     setTimeout(() => {
    //       navigate("/login");
    //     }, 2000);
    //   } else {
    //     const errorData = await response.json();
    //     toast.error(errorData.error || "Registration failed");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Registration failed");
    // }
  };

  return (
    <div>
      <div className="signup-container">
        <div className="signup-inner-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="salutaion">
              <img src={logo} alt="" className="img-logo-reg" />
              <h3 className="sign-in-text">Let Us Know You!</h3>
            </div>
            <div className="select-role">
              <select
                data-testid="user-role"
                {...register("userRole", { required: true })}
                required
              >
                <option value="">Select Role</option>
                <option value="Farmer">Farmer</option>
                <option value="Seller">Seller</option>
                <option value="Deliveryman">Deliveryman</option>
              </select>
              {errors.userRole && (
                <span className="error">Role is required</span>
              )}
            </div>

            <div className="first-name">
              <label>First name</label>
              <input
                data-testid="First name"
                type="text"
                placeholder="First name"
                {...register("fname", { required: true })}
              />

              {errors.fname && (
                <span className="error">First name is required</span>
              )}
            </div>

            <div className="last-name">
              <label>Last name</label>
              <input
                type="text"
                data-testid="Last name"
                placeholder="Last name"
                {...register("lname", { required: true })}
              />
              {errors.lname && (
                <span className="error">Last name is required</span>
              )}
            </div>

            <div className="email">
              <label>Email address</label>
              <input
                type="email"
                data-testid="Enter email"
                placeholder="Enter email"
                {...register("email", { required: true })}
              />
              {errors.email && <span className="error">Email is required</span>}
            </div>

            <div className="password">
              <label>Password</label>
              <input
                type="password"
                data-testid="Enter password"
                placeholder="Enter password"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password && (
                <span className="error">
                  Password is required and must be at least 6 characters long
                </span>
              )}
            </div>
            <div className="district">
              <label>District</label>
              <select
                data-testid="district-select"
                {...register("district", { required: true })}
              >
                <option value="">Select District</option>
                <option value="ampara">Ampara</option>
                <option value="anuradhapura">Anuradhapura</option>
                <option value="badulla">Badulla</option>
                <option value="batticaloa">Batticaloa</option>
                <option value="colombo">Colombo</option>
                <option value="galle">Galle</option>
                <option value="gampaha">Gampaha</option>
                <option value="hambantota">Hambantota</option>
                <option value="jaffna">Jaffna</option>
                <option value="kalutara">Kalutara</option>
                <option value="kandy">Kandy</option>
                <option value="kegalle">Kegalle</option>
                <option value="kilinochchi">Kilinochchi</option>
                <option value="kurunegala">Kurunegala</option>
                <option value="mannar">Mannar</option>
                <option value="matale">Matale</option>
                <option value="matara">Matara</option>
                <option value="moneragala">Moneragala</option>
                <option value="mullaitivu">Mullaitivu</option>
                <option value="nuwara-eliya">Nuwara Eliya</option>
                <option value="polonnaruwa">Polonnaruwa</option>
                <option value="puttalam">Puttalam</option>
                <option value="ratnapura">Ratnapura</option>
                <option value="trincomalee">Trincomalee</option>
                <option value="vavuniya">Vavuniya</option>
              </select>
              {errors.district && (
                <span className="error">District is required</span>
              )}
            </div>

            <div className="sign-up">
              <button
                type="submit"
                data-testid="submit"
                className="sign-up-button"
              >
                Sign Up
              </button>
            </div>
            <br />
            <p>
              Already a CropXchange user?{" "}
              <Link style={{ textDecoration: "none" }} to="/login">
                {" "}
                Sign In
              </Link>
            </p>
          </form>
        </div>
        <div className="signup-video">
          <video src={video} muted loop autoPlay />
        </div>
      </div>
      <div className="text-signup">
        <h2>
          Buy, Sell and Deliver <br />
          Extraordinary Products
        </h2>
      </div>
    </div>
  );
}
