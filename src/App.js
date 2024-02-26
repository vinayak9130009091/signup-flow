// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import AdminSignin from "./pages/AdminLogin";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Terms from "./pages/Terms";
import AdminSignup from "./pages/AdminSignup";
import AdminLogin from "./pages/AdminLogin";
import ForgotPass from "./pages/ForgotPass";

function App() {
  return (
    <>
      {/* <Form /> */}
      <Routes>
        <Route path="/" element={<AdminSignup />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
      </Routes>
    </>
  );
}

export default App;
