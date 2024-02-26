import React from "react";
import { Link } from "react-router-dom"; // If using React Router for navigation

const TermsAndConditions = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div>
      <h1>Terms and Conditions</h1>

      <div id="terms">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...</p>
        {/* Add your terms and conditions content here */}
      </div>

      <Link to="/" id="backButton">
        Back
      </Link>
    </div>
  );
};

export default TermsAndConditions;
