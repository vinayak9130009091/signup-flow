import React, { useState } from "react";
import axios from "axios";
import logo from "./static/logoAdmin.png";
import "./static/adminLogin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";

import Select from "react-select";
import GooglePlayStore from "./static/GooglePlayStore.svg";
import AppStore from "./static/AppStore.png";

import { useNavigate } from "react-router-dom";

import { FaFacebook, FaWeebly, FaInstagramSquare, FaLinkedin, FaTwitter, FaEye, FaEyeSlash } from "react-icons/fa";

export default function SuperAdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const options = [
    { value: "30 minutes", label: "30 minutes" },
    { value: "4 hours", label: "4 hours" },
    { value: "8 hours", label: "8 hours" },
  ];

  const setValbox = (event) => {
    setIsChecked(event.target.checked);
    console.log(event.target.checked);
  };

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const loginuser = async (e) => {
    e.preventDefault();

    const { email, password, terms } = inpval;

    if (email === "") {
      toast.error("email is required!", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("password is required!", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      toast.error("password must be 6 char!", {
        position: "top-center",
      });
    } else if (isChecked === false) {
      toast.error("Accept terms and condtion ", {
        position: "top-center",
      });
    } else {
      e.preventDefault();
      const data = JSON.stringify({
        // email: inpval.email,
        // password: inpval.password,
        email: "vinayak@gmail.com",
        password: "Vinayak@1234",
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://127.0.0.1:8000/admin/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios

        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          alert("You are logged in!");

          // navigate("/superAdminDashboard");
          toast.success("You are sucessfully loged in", { position: "top-right" });

          setInpval({ ...inpval, email: "", password: "" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="responsive-split-screen-container">
      <div className="left-container">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <h2>Welcome Back !</h2>
        <h5>"Welcome to "SNP Tax & Financials", where tax management meets simplicity. Our advanced software streamlines tax processes for individuals, businesses, and professionals, ensuring accuracy and efficiency. Experience a new era of financial ease with SNP Tax & Financials."</h5>

        <p>"Please log in to access your account."</p>

        <div className="social-icons">
          <FaTwitter className="icon" />
          <FaFacebook className="icon" />
          <FaLinkedin className="icon" />
          <FaWeebly className="icon" />
          <FaInstagramSquare className="icon" />
        </div>
      </div>
      <div className="right-container">
        <form className="login-form">
          <h2>Login Account</h2>
          <label>Email Address </label>
          <input type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder="Enter Your Email Address" />

          <div className="form_input">
            <label>Password</label>
            <div className="two">
              <input type={showPassword ? "text" : "password"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder="Enter Your password" />
              <div className="showpass" onClick={() => setShowPassword(!showPassword)}>
                {!showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <div className="Forgotpass">
            <h5 style={{ marginTop: "8px" }}>
              <NavLink to="/forgotpass">Forgot Password</NavLink>
            </h5>
          </div>

          <div style={{ marginTop: "25px" }}>
            <label>Stay signed in for</label>
            <div>
              <Select options={options} />
            </div>
          </div>

          <div className="checkbox-wrapper" style={{ display: "flex", textAlign: "center" }}>
            <label style={{ marginTop: "22px", marginRight: "10px" }}>
              <input type="checkbox" onChange={setValbox} checked={isChecked} />
            </label>
            <div className="terms">
              <h5>
                “Agree to <NavLink to="https://policies.google.com/terms?hl=en-US">Terms </NavLink> and <NavLink to="https://policies.google.com/terms?hl=en-US">Conditions”</NavLink>
              </h5>
            </div>
          </div>

          <button onClick={loginuser} type="submit">
            Login
          </button>

          <p className="sign-in-link">
            Don't have a PMS solutions client portal Account ? <NavLink to="/">Sign Up</NavLink>
          </p>
          <div className="storeBtn" style={{ display: "flex", marginLeft: "-10px" }}>
            <div className="playstore">
              <NavLink to="https://play.google.com/store/apps/details?id=com.linkedin.android&hl=en_IN&gl=US">
                <img style={{ width: "200px" }} src={GooglePlayStore} alt="Logo" />
              </NavLink>
            </div>
            <div className="appstore">
              <div className="storeBtn">
                <NavLink to="https://apps.apple.com/us/app/linkedin-network-job-finder/id288429040">
                  <img style={{ width: "150px", marginTop: "-7px" }} src={AppStore} alt="Logo" />
                </NavLink>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="toast">
        <ToastContainer />
      </div>
    </div>
  );
}
