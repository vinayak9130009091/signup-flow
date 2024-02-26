import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navigate to="/" replace={true} />

      <Outlet />
    </>
  );
}

export default Layout;
