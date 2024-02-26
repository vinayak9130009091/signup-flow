import React from "react";
import { NavLink } from "react-router-dom";
import "./static/forgotPass.css";

const ForgotPass = () => {
  return (
    <div className="main_container">
      <div className="Form_container">
        <div className="form" style={styles.form}>
          <h2 style={styles.h2}>Reset your Password</h2>
          <p style={styles.p}>To reset your Password, enter the email address you use to sign in</p>

          <input type="text" placeholder="Email Address" style={styles.input} />
          <div style={{ display: "flex", padding: "20px" }}>
            <button type="btn" className="reset" style={styles.reset}>
              Get Reset Link
            </button>

            <NavLink to="/adminlogin">
              <button type="btn" className="login" style={styles.login}>
                Back To Login
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  form: {
    backgroundColor: "#fff",
    border: "1px solid whitesmoke",
    boxShadow: "2px",
    height: "300px",
    margin: "0px",
    padding: "0px",
    marginLeft: "40px",
    marginTop: "100px",
    width: "50%",
  },
  h2: {
    marginLeft: "80px",
    fontWeight: "bold",
    fontSize: "30px",
  },
  p: {
    marginLeft: "80px",
    color: "black",
  },
  email: {
    color: "rgb(173, 159, 159)",
  },
  input: {
    marginLeft: "80px",
    width: "60%",
    height: "30px",
    border: "1px solid rgb(173, 159, 159)",
    borderRadius: "8px",
  },
  reset: {
    marginTop: "20px",
    color: "white",
    backgroundColor: "blue",
    border: "none",
    margin: "10px",
    padding: "10px",
    borderRadius: "5px",
    width: "20%",
    height: "2%",
    marginLeft: "80px",
    marginTop: "15px",
  },
  resetHover: {
    backgroundColor: "rgb(42, 78, 196)",
  },
  login: {
    color: "rgb(7, 110, 179)",
    backgroundColor: "#fff",
    border: "1px solid rgb(7, 110, 179)",
    fontWeight: "bold",
    marginTop: "12px",
    marginLeft: "150px",
    borderRadius: "5px",
    width: "50%",
    height: "60%",
    textAlign: "center",
    paddingTop: "10px",
  },
};

export default ForgotPass;
