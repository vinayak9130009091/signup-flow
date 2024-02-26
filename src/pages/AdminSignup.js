import React, { useState, useRef, useEffect } from "react";
import logo from "./static/logo.png";
import "./static/adminSignup.css";
import "./static/confirmation.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { AiFillEdit } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import OtpInput from "react-otp-input";
import "../pages/static/firminfo.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import DatePicker from "react-datepicker";
//import "./static/datepicker.css";

import "../pages/static/formslider.css";
import "../pages/static/servicessoffers.css";

import "../pages/static/firmrole.css";
import "../pages/static/firmsetting.css";
import firmsetting from "../pages/static/firm setting.png";

const SignUp = () => {
  //!send all sign up data to backend API

  // let data = JSON.stringify({
  //   firstName: firstname,
  //   lastName: lastName,
  //   phoneNumber: phoneNumber,
  //   email: "email@gmail.com",
  //   password: password,
  //   cpassword: cfpassword,
  //   firmName: firmName,
  //   state: selectedState,
  //   country: selectedCountry,
  //   firmSize: svalue,
  //   referenceFrom: selectedOption,
  //   services: [
  //     {
  //       selectedButtons,
  //     },
  //   ],
  //   role: roleOption,
  //   firmURL: url,
  //   currency: currency,
  //   language: language,
  // });
  // let config = {
  //   method: "post",
  //   maxBodyLength: Infinity,
  //   url: "http://127.0.0.1:6000/admin/",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   data: data,
  // };
  // axios
  //   .request(config)
  //   .then((response) => {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

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

  //todo ========    #page control  logic   No1 =======

  //!chang state for testing
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form");
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  //todo ========    #page control  logic   No1 =======

  //? ========    #navigation control   No2 =======

  const navigate = useNavigate();

  const LoginButton = () => {
    navigate("/adminlogin");
  };
  //? ========    #navigation control   No2 =======

  //todo ========    #send mail to backend for varification code  case 1: =======

  //*checkbox
  const [isChecked, setIsChecked] = useState(false);

  const setValbox = (event) => {
    setIsChecked(event.target.checked);
    console.log(event.target.checked);
  };

  const [inpval, setInpval] = useState({
    email: "",
  });

  const createAccount = async (e) => {
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
    } else if (isChecked === false) {
      toast.error("Accept terms and condtion ", {
        position: "top-center",
      });
    } else {
      e.preventDefault();

      let data = JSON.stringify({
        email: inpval.email,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://127.0.0.1:8000/request-otp",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          //toast.success("Check your email ID for OTP", { position: "top-right" });

          alert("Check your email ID for OTP");

          //   setInpval({ ...inpval, email: "" });
          setIsChecked(false);
          nextStep();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //todo ========    #send mail to backend for varification code  case 2: =======

  //? ========    #otp varification    Page:2 =======

  const [otp, setOtp] = useState("");
  const handleClearOtp = () => {
    console.log(otp);
    setOtp("");
  };
  const sendOtpVerify = async (e) => {
    e.preventDefault();

    const { email } = inpval;

    if (otp === "") {
      toast.error(" OTP required! ", {
        position: "top-center",
      });
    } else {
      e.preventDefault();

      let data = JSON.stringify({
        email: inpval.email,
        otp: otp,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://127.0.0.1:8000/verify-otp",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          // toast.success("Check your email ID for OTP", { position: "top-right" });

          alert("Email verified sucessfully");
          setOtp("");

          nextStep();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //? ========    #otp varification    Page:2 =======
  //! ========    #otp varification    Page:2 =======
  //todo ========    #send mail to backend for varification code  case 3: =======

  const [firstname, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  const [value, setValue] = useState();
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);

    // Log the phone number to the console
    console.log("Entered Phone Number:", value);
  };
  const submitUserinfo = async (e) => {
    e.preventDefault();

    if (firstname === "") {
      toast.error(" First Name Required ! ", {
        position: "top-center",
      });
    } else if (lastName === "") {
      toast.error(" Last Name Required ! ", {
        position: "top-center",
      });
    } else if (lastName === "") {
      toast.error(" Last Name Required ! ", {
        position: "top-center",
      });
    } else if (phoneNumber === "") {
      toast.error(" Phone number required ", {
        position: "top-center",
      });
    } else {
      e.preventDefault();

      let data = JSON.stringify({
        firstname: firstname,
        lastName: lastName,
        phoneNumber: phoneNumber,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://127.0.0.1:8000/adminInfo",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));

          //toast.success("Check your email ID for OTP", { position: "top-right" });

          alert("Info send scuceesfully");
          nextStep();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //todo ========    #send mail to backend for varification code Page:3 =======

  //todo ========    #send mail to backend for varification code  case 4: =======

  //case 4  =======================================================================
  //Country State API

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [firmName, setFirmName] = useState("");
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    const getCountryData = async () => {
      try {
        const response = await axios.get("https://countriesnow.space/api/v0.1/countries/positions");
        setCountries(response.data.data);
        console.log("Country Data Fetched Successfully", { countries });
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    getCountryData();
  }, []);

  useEffect(() => {
    const getStatesData = async () => {
      try {
        const response = await axios.get("https://countriesnow.space/api/v0.1/countries/states");
        setStates(response.data.data);
        console.log("State Data Fetched Successfully", { states });
      } catch (error) {
        console.error("Error fetching state data:", error);
      }
    };

    getStatesData();
  }, []);
  // useEffect to do something when selectedCountry changes
  useEffect(() => {
    console.log("Selected Country:", selectedCountry);
    // You can perform additional actions or API calls here based on the selected country
  }, [selectedCountry]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  //?validation
  const submitFerminfo = async (e) => {
    e.preventDefault();
    console.log("vinayak");

    if (firmName === "") {
      toast.error(" Firm Name Required ! ", {
        position: "top-center",
      });
    } else if (selectedCountry === "") {
      toast.warning(" Select Country ! ", {
        position: "top-center",
      });
    } else if (selectedState === "") {
      toast.warning(" Select state ! ", {
        position: "top-center",
      });
    } else {
      e.preventDefault();

      let data = JSON.stringify({
        firmName: firmName,
        selectedCountry: selectedCountry,
        selectedState: selectedState,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://127.0.0.1:8000/adminInfo",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          // toast.success("Check your email ID for OTP", { position: "top-right" });

          alert("Info send scuceesfully");
          setOtp("");

          nextStep();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //todo ========    #send mail to backend for varification code  case 5: =======
  //slider

  function RangeSlider({ value, handleChange }) {
    return (
      <>
        <div className="value">
          <p>{value}</p>
        </div>
        <div className="range-slider-container">
          <input type="range" min={0} max={250} value={value} onChange={handleChange} step={1} className="slider" />
          <div className="numbering">
            <span>0</span>
            <span>250</span>
          </div>
        </div>
      </>
    );
  }

  const [svalue, setSValue] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  // useEffect to do something when selectedServices changes
  useEffect(() => {
    console.log(svalue);

    // You can perform additional actions or API calls here based on the selected services
  }, [svalue]);
  useEffect(() => {
    // console.log(selectedOption);
    // You can perform additional actions or API calls here based on the selected services
  }, [selectedOption]);

  const handleChange = (event) => {
    setSValue(event.target.value);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  //?validation
  const submitFirmDetail = async (e) => {
    e.preventDefault();

    if (svalue === 0) {
      toast.error(" Select Firm Size  ! ", {
        position: "top-center",
      });
    } else if (selectedOption === "") {
      toast.warning(" Select How did you hear about us ? ", {
        position: "top-center",
      });
    } else {
      e.preventDefault();

      let data = JSON.stringify({
        svalue: svalue,
        selectedOption: selectedOption,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://127.0.0.1:8000/adminInfo",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          // toast.success("Check your email ID for OTP", { position: "top-right" });

          alert("Firm Details send scuceesfully");

          nextStep();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //=============================================================
  //todo  Services offers case 6:

  const [selectedButtons, setSelectedButtons] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleButtonClick = (buttonName) => {
    const index = selectedButtons.indexOf(buttonName);
    if (index === -1) {
      setSelectedButtons([...selectedButtons, buttonName]);
    } else {
      setSelectedButtons(selectedButtons.filter((name) => name !== buttonName));
    }
  };
  // useEffect to do something when selectedServices changes
  useEffect(() => {
    // console.log(selectedButtons);
    // You can perform additional actions or API calls here based on the selected services
  }, [selectedButtons]);

  const handleSelectAllChange = () => {
    setSelectAllChecked(!selectAllChecked);
    if (!selectAllChecked) {
      const allButtonNames = ["TaxPreparation", "planning", "Advisory", "Resolution", "Payroll", "Accounting", "Audit", "Lawfirm", "Bookkeeping", "Other"];
      setSelectedButtons(allButtonNames);
    } else {
      setSelectedButtons([]);
    }
  };
  //?validation
  const submitService = async (e) => {
    e.preventDefault();

    if (selectedButtons === []) {
      toast.error(" Select Service  ! ", {
        position: "top-center",
      });
    } else {
      e.preventDefault();

      let data = JSON.stringify({
        selectedButtons: selectedButtons,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://127.0.0.1:8000/adminInfo",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          // toast.success("Check your email ID for OTP", { position: "top-right" });

          alert("Services submitted scuceesfully");

          nextStep();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //======================================

  //todo role selection case 7

  const [roleOption, setRoleOption] = useState();

  const handleRoleClick = (option) => {
    setRoleOption(option);
  };
  // useEffect to do something when selectedServices changes
  useEffect(() => {
    // console.log(roleOption);
    // You can perform additional actions or API calls here based on the selected services
  }, [roleOption]);
  //?validation
  const submitRole = async (e) => {
    e.preventDefault();

    if (selectedButtons === "") {
      toast.error(" Select Service  ! ", {
        position: "top-center",
      });
    } else {
      e.preventDefault();

      let data = JSON.stringify({
        selectedButtons: selectedButtons,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://127.0.0.1:8000/adminInfo",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          // toast.success("Check your email ID for OTP", { position: "top-right" });

          alert("Services Role scuceesfully");

          nextStep();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //============================

  //case 8 ============================
  const [currency, setCurrency] = useState("");
  const [language, setLanguage] = useState("");
  const [url, setUrl] = useState("");

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmitUrl = (e) => {
    e.preventDefault();
    const label = document.getElementById("domin_lable").textContent;
    const combinedValue = url + label;
    console.log("Combined value:", combinedValue);
  };

  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    setCurrency(selectedCurrency);
    console.log("Selected currency:", selectedCurrency);
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    console.log("Selected language:", selectedLanguage);
  };

  // const handleSendData = () => {
  //   const combinedData = {
  //     url: url,
  //     currency: currency,
  //     language: language,
  //   };
  //   console.log("Combined data:", combinedData);
  //   console.log(url);
  //   // You can send combinedData to backend here
  // };

  //?validation
  const submiturl = async (e) => {
    e.preventDefault();
    console.log("vinayak");

    if (url === "") {
      toast.error(" Choose web URL ! ", {
        position: "top-center",
      });
    } else if (currency === "") {
      toast.warning(" Select Currency ! ", {
        position: "top-center",
      });
    } else if (language === "") {
      toast.warning(" Select language ! ", {
        position: "top-center",
      });
    } else {
      toast.success(" Web url selected  ! ", {
        position: "top-center",
      });
      nextStep();
    }
  };

  //todo password confermation case 9:
  //==============================================================

  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);

  const [inppass, setInppass] = useState({
    password: "",
    cpassword: "",
  });

  //console.log
  const setValP = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInppass(() => {
      return {
        ...inppass,
        [name]: value,
      };
    });
  };

  const submitPassword = async (e) => {
    e.preventDefault();

    const { password, cpassword } = inppass;

    if (password === "") {
      alert("password is required!", {
        position: "top-center",
      });
    } else if (password.length < 8) {
      alert("password must be 6 char!", {
        position: "top-center",
      });
    } else if (cpassword === "") {
      alert("cpassword is required!", {
        position: "top-center",
      });
    } else if (cpassword.length < 8) {
      alert("confirm password must be 6 char!", {
        position: "top-center",
      });
    } else if (password !== cpassword) {
      alert("pass and Cpass are not matching!", {
        position: "top-center",
      });
    } else {
      toast.success(" Account created successfully  ", {
        position: "top-right",
      });
      nextStep();

      //call final
      adminalldata();
    }
  };

  //Console Log Data ConstWise=========
  console.log(inpval.email);
  console.log(firstname);
  console.log(lastName);
  console.log(phoneNumber);

  console.log(firmName);
  console.log(selectedCountry);
  console.log(selectedState);
  console.log(svalue);
  console.log(selectedOption);
  console.log(selectedButtons);
  console.log(roleOption);

  console.log(url);
  console.log(currency);
  console.log(language);

  console.log(inppass.password);
  console.log(inppass.cpassword);

  //=====================

  // const adminalldata = () => {
  //   let data = JSON.stringify({
  //     email: "vinayakkumbhar@hotmail.com",
  //     firstName: firstname,
  //     lastName: lastName,
  //     phoneNumber: phoneNumber,
  //     firmName: firmName,
  //     country: selectedCountry,
  //     state: selectedState,
  //     firmSize: svalue,
  //     referenceFrom: selectedOption,
  //     services: [
  //       {
  //         service: "Tax preparation",
  //       },
  //       {
  //         service: "Tax planning",
  //       },
  //     ],
  //     role: roleOption,
  //     firmURL: url,
  //     currency: currency,
  //     language: language,
  //     password: inppass.password,
  //     cpassword: inppass.cpassword,
  //   });

  //   let config = {
  //     method: "post",
  //     maxBodyLength: Infinity,
  //     url: "http://127.0.0.1:8080/admin/",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  //===================================================
  const adminalldata = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: inpval.email,
      firstName: firstname,
      lastName: lastName,
      phoneNumber: phoneNumber,
      firmName: firmName,
      country: selectedCountry,
      state: selectedState,
      firmSize: svalue,
      referenceFrom: selectedOption,
      services: [
        {
          service: selectedButtons,
        },
      ],
      role: roleOption,
      firmURL: url,
      currency: currency,
      language: language,
      password: inppass.password,
      cpassword: inppass.cpassword,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8080/admin/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  //todo book session for demo  case 10:
  //==============================================================
  const [selectedDate, setSelectedDate] = useState(null);

  const renderFormFields = () => {
    switch (currentStep) {
      //sign up
      case 1:
        return (
          <>
            <div>
              <div className="header">
                <div className="logo">
                  <img src={logo} alt="" />
                  <b>PMS Solutions</b>
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
                      <input type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder="Enter Your Email Address" />
                    </div>
                    <div className="checkbox-container">
                      <label>
                        <input type="checkbox" onChange={setValbox} checked={isChecked} />
                      </label>
                      <label htmlFor="termsCheckbox">I agree to the terms and conditions</label>
                    </div>
                    <br />

                    <button onClick={createAccount}>Create Account</button>

                    <br />

                    <p className="sign-in-link">
                      Already have an account? <NavLink to="/adminlogin">Sign in</NavLink>
                    </p>
                  </form>
                </div>
                <br />
              </div>
            </div>
            <div className="toast">
              <ToastContainer />
            </div>
          </>
        );

      //code confirmation
      case 2:
        return (
          <>
            <div>
              <div className="sectionotp">
                <div className="header">
                  <div className="logo">
                    <img src={logo} alt="" />
                    <b>PMS Solutions</b>
                  </div>
                </div>
                <div className="confirm-code">
                  <h2>Confirmation Code</h2>
                  <p>We sent a confirmation code to your email:</p>
                  <div className="email-edit-container">
                    <b>{inpval.email}</b>
                    <span className="edit-icon">
                      <AiFillEdit />
                    </span>
                  </div>
                  <br />
                  <div className="code">
                    <div style={{ marginLeft: "-10px" }}>
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => (
                          <input
                            {...props}
                            style={{
                              width: "60px", // Adjust as needed
                              height: "100px", // Adjust as needed
                              fontSize: "42px", // Adjust as needed
                              fontFamily: "Arial, sans-serif", // Replace with your desired font
                              // Add any other styling properties as needed
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <h4 style={{ marginTop: "80px" }}>Didn't receive it? Resend code</h4>
                  <div className="buttonOtp" style={{ display: "flex", marginBottom: "50px" }}>
                    <div className="clearOtp">
                      <button style={{ marginTop: "10px", width: "120px", height: "50px" }} onClick={handleClearOtp}>
                        Clear OTP
                      </button>
                    </div>
                    <div className="verify">
                      <button style={{ width: "120px", marginTop: "10px", height: "50px", marginLeft: "260px" }} onClick={sendOtpVerify}>
                        Verify
                      </button>
                    </div>
                  </div>
                </div>

                {/* <button onClick={emailcodersender} className="next"> */}
                {/* <button className="next" onClick={nextStep}>
                  Next
                </button> */}
                {/* <button  className="pre">
                  Previous
                </button> */}
              </div>
              <div className="toast">
                <ToastContainer />
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <div id="phase-3" className="header">
              <div className="logo">
                <img src={logo} alt="" />
                <b>PMS Solutions</b>
              </div>
              <div className="path">
                <p className="number1">1</p>
                <p>Email</p>
                <p className="number2">2</p>
                <p>Information</p>
                <p className="number3">3</p>
                <p>Settings</p>
                <p className="number4">4</p>
                <p>Book a session</p>
              </div>
              <div className="header-info">
                <button className="login-btn" onClick={LoginButton}>
                  Login
                </button>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA-bIT8cA6U4J_rVPIp6RXAGuzlO3X5KWSBQ&usqp=CAU" alt="" />
                <h3>EN</h3>
              </div>
            </div>

            <div className="information">
              <h2>Your Information</h2>
              <form className="info-form">
                <div className="name">
                  <div>
                    <label>First Name</label>
                    <br />
                    <input required className="fname" placeholder="First name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                  </div>

                  <div>
                    <label>Last Name</label>
                    <br />
                    <div>
                      <input required className="lname" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                  </div>
                </div>
                <br />
                <div>
                  <label>
                    <div>
                      <label htmlFor="phone">Phone Number:</label>
                      <PhoneInput
                        placeholder="enter phone number "
                        onChange={(value) => {
                          setPhoneNumber(value);
                        }}
                        countryCodeEditabel={false}
                      />
                    </div>
                  </label>
                  {!valid && <p>Please enter a valid phone number.</p>}
                </div>
              </form>
            </div>
            <br />
            <button onClick={submitUserinfo} className="next">
              Next
            </button>
            {/* <button onClick={prevStep} className="pre">
              Previous
            </button> */}
            <div className="toast">
              <ToastContainer />
            </div>
          </>
        );

      case 4:
        return (
          <>
            <div className="header" id="phase-4">
              <div className="logo">
                <img alt="" />
                <b>Microtech Solutions</b>
              </div>
              <div className="path">
                <p className="number1">1</p>
                <p>Email</p>
                <p className="number2">2</p>
                <p>Information</p>
                <p className="number3">3</p>
                <p>Settings</p>
                <p className="number4">4</p>
                <p>Book a session</p>
              </div>
              <div className="header-info">
                <button className="login-btn">Login</button>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA-bIT8cA6U4J_rVPIp6RXAGuzlO3X5KWSBQ&usqp=CAU" alt="" />
                <h3>EN</h3>
              </div>
            </div>

            <div className="information">
              <h2>Firm Information</h2>
              <form className="info-form">
                <label className="firm-name">Firm Name</label>
                <br />
                <input className="input" type="text" placeholder="Enter firm name" value={value} onChange={(e) => setFirmName(e.target.value)} />
                <br />
                <br />

                <div className="col-12 col-sm-4">
                  <div className="form-group">
                    <select className="form-select" aria-label="Select Country" onChange={handleCountryChange} value={selectedCountry}>
                      <option value="">Choose Country</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-12 col-sm-4">
                  <div className="form-group">
                    <select className="form-select" aria-label="Select State" value={selectedState} onChange={handleStateChange}>
                      <option value="">Choose State</option>
                      {states
                        .filter((country) => country.name === selectedCountry)
                        .map((country) =>
                          country.states.map((state, index) => (
                            <option key={index} value={state.name}>
                              {state.name}
                            </option>
                          ))
                        )}
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <br />
            <button onClick={submitFerminfo} className="next">
              Next
            </button>
            {/* <button onClick={prevStep} className="pre">
              Previous
            </button> */}
            <div className="toast">
              <ToastContainer />
            </div>
          </>
        );

      case 5:
        return (
          <>
            <div className="container">
              <div className="title">
                <h2>Firm details</h2>
              </div>
            </div>
            <h4>Firm size</h4>
            <div className="size">
              <div className="slider-container">
                <RangeSlider value={svalue} handleChange={handleChange} />
              </div>
            </div>
            <hr className="hr" />
            {svalue === 0 && (
              <p className="p" style={{ color: "red" }}>
                Please select company size
              </p>
            )}

            <div className="info">
              <div className="option" style={{ display: "flex", alignItems: "center" }}>
                <p>How did you hear about PMS Solutions? </p>
                <h5 style={{ marginLeft: "40px", color: "blue", marginBottom: "30px" }}>{selectedOption}</h5>
              </div>

              {/* {selectedOption && `From: ${selectedOption}`} */}
              <div className="options">
                {/* <FaCircleChevronLeft className="icons" /> */}
                <button type="button" className="GoogleSerch" onClick={() => handleOptionClick("Google Search")}>
                  Google Search
                </button>
                <button type="button" className="CapterraGetappG2" onClick={() => handleOptionClick("Capterra/Getapp/G2")}>
                  Capterra/Getapp/G2
                </button>
                <button type="button" className="Fromfriend" onClick={() => handleOptionClick("From Friend")}>
                  From friend
                </button>
                <button type="button" className="Offlineevent" onClick={() => handleOptionClick("Offline Event")}>
                  Offline event
                </button>
                <button type="button" className="Socialmedia" onClick={() => handleOptionClick("Social Media")}>
                  Social media
                </button>
              </div>
              <div className="othersoptions">
                <button type="button" className="TaxDomeConsutanrtPartner" onClick={() => handleOptionClick("PMS Solutions Consutanrt/Partner")}>
                  PMS Solutions Consutanrt/Partner
                </button>
                <button type="button" className="Other" onClick={() => handleOptionClick("Other")}>
                  Other
                </button>
              </div>
              <div className="btn">
                <button onClick={submitFirmDetail} type="button">
                  Next
                </button>
              </div>
            </div>
            <div className="toast">
              <ToastContainer />
            </div>
          </>
        );

      case 6:
        return (
          <>
            <div className="containerf">
              <div className="form_container">
                <h1>Services your firm offers</h1>
              </div>
              <div className="options">
                {/* <FaCircleChevronLeft className="icons" /> */}

                <button type="button" className="CapterraGetappG2" onClick={() => handleButtonClick("Tax Preparation")}>
                  Tax Preparation
                </button>

                <button type="button" className="CapterraGetappG2" onClick={() => handleButtonClick("Tax Planning")}>
                  Tax Planning
                </button>
                <button type="button" className="Fromfriend" onClick={() => handleButtonClick("Advisory")}>
                  Advisory
                </button>
                <button type="button" className="Offlineevent" onClick={() => handleButtonClick("Resolution")}>
                  Resolution
                </button>
                <button type="button" className="Socialmedia" onClick={() => handleButtonClick("Payroll")}>
                  Payroll
                </button>
              </div>
              <div className="options">
                {/* <FaCircleChevronLeft className="icons" /> */}
                <button type="button" className="GoogleSerch" onClick={() => handleButtonClick("Accounting")}>
                  Accounting
                </button>
                <button type="button" className="CapterraGetappG2" onClick={() => handleButtonClick("Audit")}>
                  Audit
                </button>
                <button type="button" className="Fromfriend" onClick={() => handleButtonClick("From Friend")}>
                  Law firm
                </button>
                <button type="button" className="Offlineevent" onClick={() => handleButtonClick("Bookkeeping")}>
                  Bookkeeping
                </button>
                <button type="button" className="Socialmedia" onClick={() => handleButtonClick("Other")}>
                  Other
                </button>
              </div>

              <hr />

              <label>
                <input type="checkbox" className="selectall" checked={selectAllChecked} onChange={handleSelectAllChange} />
                Select All
              </label>
              <p>Please select the services you offer</p>
              <div className="buttons">
                <button type="button" className="Next" onClick={submitService}>
                  Next
                </button>
              </div>
            </div>
            <div className="toast">
              <ToastContainer />
            </div>
          </>
        );

      case 7:
        return (
          <div className="containerf">
            <div className="form_container">
              <h1>Your role in the firm</h1>
            </div>
            <div className="options">
              {/* <FaCircleChevronLeft className="icons" /> */}

              <button type="button" className="CapterraGetappG2" onClick={() => handleRoleClick("Owner or Patner")}>
                Owner or Patner
              </button>

              <button type="button" className="CapterraGetappG2" onClick={() => handleRoleClick(" BookKeeper or Accountant")}>
                BookKeeper or Accountant
              </button>
              <button type="button" className="Fromfriend" onClick={() => handleRoleClick("Operations/Office Manager")}>
                Operations/Office Manager
              </button>
              <div className="secodgrup"></div>
              <button type="button" className="Offlineevent" onClick={() => handleRoleClick("Admin")}>
                Admin
              </button>
              <button type="button" className="Socialmedia" onClick={() => handleRoleClick("Assitant")}>
                Assitant
              </button>
              <button type="button" className="Socialmedia" onClick={() => handleRoleClick("Other")}>
                Other
              </button>
            </div>

            <hr />

            <div className="buttons">
              <button type="button" className="Next" onClick={submitRole}>
                Next
              </button>
            </div>
          </div>
        );

      case 8:
        return (
          <>
            <div className="header">
              <div className="logo">
                <img src={logo} alt="" />
                <b>Microtech Solutions</b>
              </div>
              <div className="setting-path">
                <p className="number1">1</p>
                <p>Email</p>
                <p className="number2">2</p>
                <p>Information</p>
                <p className="number3">3</p>
                <p>Settings</p>
                <p className="number4">4</p>
                <p>Book a session</p>
              </div>
              <div className="header-info">
                <button className="login-btn" onClick={LoginButton}>
                  Login
                </button>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA-bIT8cA6U4J_rVPIp6RXAGuzlO3X5KWSBQ&usqp=CAU" alt="" />
                <h3>EN</h3>
              </div>
            </div>
            <div className="setting-container">
              <div className="firm-setting">
                <div className="firm">
                  <h2>Firm Settings</h2>

                  <div className="firm-info">
                    <p>
                      A powerful,integrated platform <br /> to manage teams,clients,projects.
                    </p>
                    <p>
                      <b>from $50/mo per user</b> <br />
                      (with a 3-year subscription plan)
                    </p>
                  </div>

                  <h3>Firm Setting</h3>

                  <p>choose web URL</p>
                  <p>You will be ale to set up a fully custom domain(without.pms.com) later</p>

                  <div className="url_container">
                    <input type="text" id="url_input" value={url} onChange={handleUrlChange} className="url" placeholder="Enter your URL" />
                    <label className="label" id="domin_lable">
                      .pms.com
                    </label>
                  </div>

                  <div className="currency-container">
                    <div className="currency">
                      <label>You cannot Change it later</label>
                      <br />

                      <select className="select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                        <option>Select Currency</option>
                        <option>USD</option>
                        <option>AUD</option>
                        <option>Euro</option>
                        <option>NZD</option>
                        <option>CAD</option>
                        <option>GBP</option>
                        <option>CHF</option>
                        <option>BRL</option>
                        <option>SEK</option>
                        <option>NOK</option>
                        <option>DKK</option>
                        <option>JPY</option>
                      </select>
                    </div>
                    <div className="lang">
                      <label>Default Language</label>
                      <br />
                      <select className="select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option>Select Language</option>
                        <option>English(British)</option>
                        <option>Deutsch</option>
                        <option>Ztaliano</option>
                        <option>Nederlands</option>
                        <option>suomi</option>
                        <option>Dansk</option>
                        <option>Sevenska</option>
                        <option>Norsk</option>
                      </select>
                    </div>
                  </div>
                  {/* submiturl */}
                  <button className="button" onClick={submiturl}>
                    Continue
                  </button>
                </div>
              </div>
              <div className="image">
                <img src={firmsetting} alt="" />
              </div>
            </div>
            <br />
            {/* <button onClick={nextStep} className="next">
              Next
            </button>
            <button onClick={prevStep} className="pre">
              Previous
            </button> */}
            <div className="toast">
              <ToastContainer />
            </div>
          </>
        );
      case 9:
        return (
          <>
            <div className="header">
              <div className="logo">
                <img src={logo} alt="" />
                <b>Microtech Solutions</b>
              </div>
              <div className="setting-path">
                <p className="number1">1</p>
                <p>Email</p>
                <p className="number2">2</p>
                <p>Information</p>
                <p className="number3">3</p>
                <p>Settings</p>
                <p className="number4">4</p>
                <p>Set Password</p>
              </div>
              <div className="header-info">
                <button className="login-btn" onClick={LoginButton}>
                  Login
                </button>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA-bIT8cA6U4J_rVPIp6RXAGuzlO3X5KWSBQ&usqp=CAU" alt="" />
                <h3>EN</h3>
              </div>
            </div>
            <div>
              <div className="pass" style={{ margin: "auto", width: "30%" }}>
                <div className="form_input">
                  <div className="passvalid">
                    <h1 style={{ alignItems: "center", justifyContent: "center", textContent: "center" }}>Set Password</h1>
                  </div>

                  <div className="form_input">
                    <label htmlFor="password">Password</label>
                    <div className="two">
                      <input type={!passShow ? "password" : "text"} onChange={setValP} value={inppass.password} name="password" id="password" placeholder="Enter Your password" />
                      <div className="showpass" onClick={() => setPassShow(!passShow)}>
                        {!passShow ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>
                  </div>

                  <div className="form_input">
                    <label htmlFor="password">Confirm Password</label>
                    <div className="two">
                      <input type={!cpassShow ? "password" : "text"} onChange={setValP} value={inppass.cpassword} name="cpassword" id="cpassword" placeholder="Confirm password" />
                      <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                        {!cpassShow ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={submitPassword} style={{ justifyContent: "center", marginLeft: "200px", marginRight: "150px", marginTop: "50px" }} className="next">
                  Continue
                </button>
              </div>
            </div>
            <div className="toast">
              <ToastContainer />
            </div>
          </>
        );

      // //book session
      case 10:
        return (
          <>
            <div className="header">
              <div className="logo">
                <img src={logo} alt="" />
                <b>Microtech Solutions</b>
              </div>
              <div className="setting-path">
                <p className="number1">1</p>
                <p>Email</p>
                <p className="number2">2</p>
                <p>Information</p>
                <p className="number3">3</p>
                <p>Settings</p>
                <p className="number4">4</p>
                <p>Set Password</p>
              </div>
              <div className="header-info">
                <button className="login-btn" onClick={LoginButton}>
                  Login
                </button>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA-bIT8cA6U4J_rVPIp6RXAGuzlO3X5KWSBQ&usqp=CAU" alt="" />
                <h3>EN</h3>
              </div>
            </div>

            <div className="message" style={{ justifyContent: "center" }}>
              <h2>Your Information</h2>
              <p style={{ color: "green", width: "500PX" }}>"SNP TaxConsultant, welcome to the pinnacle of tax excellence with PMS Solutions. Together, let's redefine financial success and deliver unparalleled solutions. Your journey to seamless tax management starts here!"</p>
            </div>

            <div className="toast">
              <ToastContainer />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return <form onSubmit={handleSubmit}>{renderFormFields()}</form>;
};

export default SignUp;
