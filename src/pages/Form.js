import React, { useState } from "react";
import { IoIosArrowDropup } from "react-icons/io";
// import { FaCircleChevronLeft } from "react-icons/fa6";
// import { FaCircleChevronRight } from "react-icons/fa6";

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

const Form = () => {
  const [value, setValue] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (value === 0) {
      alert("Please select company size");
    } else {
      console.log("Form submitted");
    }
  };

  return (
    <>
      <div className="container">
        <IoIosArrowDropup className="arrow" />
        <div className="title">
          <h2>Firm details</h2>
        </div>
      </div>
      <h4>Firm size</h4>
      <div className="size">
        <div className="slider-container">
          <RangeSlider value={value} handleChange={handleChange} />
        </div>
      </div>
      <hr className="hr" />
      {value === 0 && (
        <p className="p" style={{ color: "red" }}>
          Please select company size
        </p>
      )}
      <div className="info">
        <p>How did you hear about PMS Solutions? {selectedOption && `From: ${selectedOption}`}</p>
        <div className="options">
          {/* <FaCircleChevronLeft className="icons" /> */}
          <button type="button" className="GoogleSerch" onClick={() => handleOptionClick("Google Search")}>
            Google Search
          </button>
          <button type="button" className="CapterraGetappG2" onClick={() => handleOptionClick("Capterra/Getapp/G2")}>
            Capterra/Getapp/G2
          </button>
          <button type="button" className="Fromfriend" onClick={() => handleOptionClick("From friend")}>
            From friend
          </button>
          <button type="button" className="Offlineevent" onClick={() => handleOptionClick("Offline event")}>
            Offline event
          </button>
          <button type="button" className="Socialmedia" onClick={() => handleOptionClick("Social media")}>
            Social media
          </button>
          {/* <FaCircleChevronRight className="rightarrow" /> */}
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
          <button type="button" onClick={handleSubmit}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Form;
