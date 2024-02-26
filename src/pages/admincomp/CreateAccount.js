import React, { useState, useRef, useEffect } from "react";

import logo from "../static/logo.png";

function createAccount() {
  //todo send email for varification page validation
  const LoginButton = () => {
    //navigate("/adminlogin");
  };
  const [inpval, setInpval] = useState({
    email: "",
    termsCheckbox: "",
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

  const addUserdata = async (e) => {
    e.preventDefault();

    const { email, termsCheckbox } = inpval;
    if (email === "") {
      alert("email is required!", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      alert("includes @ in your email!", {
        position: "top-center",
      });
    } else if (termsCheckbox === "true") {
      alert("termsCheckbox is required!", {
        position: "top-center",
      });
    } else if (!termsCheckbox === "false") {
      alert("termsCheckbox is required!", {
        position: "top-center",
      });
    } else {
      //API ADD?
      alert("Successfully Done", {
        position: "top-center",
      });
    }
  };
  return (
    <>
      <div>
        <div className="header">
          <div className="logo">
            <img src={logo} alt="" />
            <b>Microtech Solutions</b>
          </div>
          <div className="header-info">
            <button className="login-btn" onClick={LoginButton}>
              Login
            </button>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA-bIT8cA6U4J_rVPIp6RXAGuzlO3X5KWSBQ&usqp=CAU" alt="" />
            <h3>EN</h3>
          </div>
        </div>
        <div className="abc">
          <div className="sign-up-form">
            <h2>Sign Up</h2>
            <p className="subtitle">Sign up your firm and start upgrading your workflow</p>
            <br />
            <form>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder="Enter Your Email Address" />
              </div>
              <div className="checkbox-container">
                <label>
                  <input type="checkbox" onChange={setVal} value={inpval.termscheckbox} name="termscheckbox" id="termscheckbox" />
                </label>
                <label htmlFor="termsCheckbox">
                  I agree to the terms and conditions
                  {/* <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>. */}
                </label>
              </div>
              <br />

              <button onClick={addUserdata}>Create Account</button>
              <br />

              <p className="sign-in-link">
                Already have an account? <a href="#">Sign in</a>
              </p>
            </form>
          </div>
          <br />
        </div>
      </div>
    </>
  );
}

export default createAccount;
